const Report = require("../model/reportsmodel");

// 🔹 CREATE REPORT
const createReport = async (req, res) => {
    try {
        const newReport = new Report(req.body);
        await newReport.save();
        res.status(201).json({ msg: "Report created successfully", report: newReport });
    } catch (error) {
        res.status(500).json({ msg: "Error creating report", error });
    }
};

// 🔹 GET REPORTS (with filters, sorting, and pagination)
const getReports = async (req, res) => {
    try {
        const { reportType, status, authorId, sortBy, page = 1, limit = 10, ...filters } = req.query;

        let query = {};
        if (reportType) query.reportType = reportType;
        if (status) query.status = status;
        if (authorId) query.authorId = authorId;
        if (Object.keys(filters).length) query.dynamicFields = filters;

        const options = {
            skip: (page - 1) * limit,
            limit: parseInt(limit),
            sort: sortBy ? { [sortBy]: 1 } : { timestamp: -1 }
        };

        const reports = await Report.find(query, null, options);
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching reports", error });
    }
};

// 🔹 GET REPORT BY ID
const getReportByIncidents = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ msg: "Report not found" });
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching report", error });
    }
};

// 🔹 UPDATE REPORT
const updateReport = async (req, res) => {
    try {
        const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReport) return res.status(404).json({ msg: "Report not found" });
        res.status(200).json({ msg: "Report updated successfully", report: updatedReport });
    } catch (error) {
        res.status(500).json({ msg: "Error updating report", error });
    }
};

// 🔹 DELETE REPORT
const deleteReport = async (req, res) => {
    try {
        const deletedReport = await Report.findByIdAndDelete(req.params.id);
        if (!deletedReport) return res.status(404).json({ msg: "Report not found" });
        res.status(200).json({ msg: "Report deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting report", error });
    }
};

module.exports = {
    createReport,
    getReports,
    getReportByIncidents,
    updateReport,
    deleteReport
};
