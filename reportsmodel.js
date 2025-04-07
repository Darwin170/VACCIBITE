const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  reportType: { type: String, required: true }, // Example: "Incident", "System Issue", etc.
  authorId: { type: String, required: true }, // User who created the report
  authorName: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }, // Auto-set to current date/time
  status: { type: String, enum: ["Pending", "In Progress", "Resolved"], default: "Pending" },
  location: {
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false }
  },
  content: { type: String, required: true },
  attachments: [
    {
      url: { type: String },
      type: { type: String, enum: ["image", "video", "document"] }
    }
  ]
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
