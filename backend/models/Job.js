
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobId: String,
  processed: Number,
  total: Number,
  status: String
});

module.exports = mongoose.model('Job', JobSchema);
