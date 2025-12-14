
const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const Report = require('../models/Report');
const Job = require('../models/Job');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/report', async (req, res) => {
  try {
    await Report.updateOne(
      { ngoId: req.body.ngoId, month: req.body.month },
      req.body,
      { upsert: true }
    );
    res.json({ message: 'Report saved' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/reports/upload', upload.single('file'), async (req, res) => {
  const jobId = uuidv4();
  const job = await Job.create({ jobId, processed: 0, total: 0, status: 'processing' });

  const rows = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => rows.push(data))
    .on('end', async () => {
      job.total = rows.length;
      for (const row of rows) {
        try {
          await Report.updateOne(
            { ngoId: row.ngoId, month: row.month },
            row,
            { upsert: true }
          );
        } catch {}
        job.processed++;
        await job.save();
      }
      job.status = 'completed';
      await job.save();
    });

  res.json({ jobId });
});

router.get('/job-status/:id', async (req, res) => {
  const job = await Job.findOne({ jobId: req.params.id });
  res.json(job);
});

router.get('/dashboard', async (req, res) => {
  const month = req.query.month;
  const data = await Report.aggregate([
    { $match: { month } },
    {
      $group: {
        _id: null,
        ngos: { $addToSet: "$ngoId" },
        people: { $sum: "$peopleHelped" },
        events: { $sum: "$eventsConducted" },
        funds: { $sum: "$fundsUtilized" }
      }
    }
  ]);

  if (!data.length) return res.json({});

  res.json({
    totalNGOs: data[0].ngos.length,
    totalPeopleHelped: data[0].people,
    totalEventsConducted: data[0].events,
    totalFundsUtilized: data[0].funds
  });
});

module.exports = router;
