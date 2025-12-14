
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  ngoId: String,
  month: String,
  peopleHelped: Number,
  eventsConducted: Number,
  fundsUtilized: Number
});

ReportSchema.index({ ngoId: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('Report', ReportSchema);
