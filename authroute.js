const express = require("express");
const { loginUser } = require("../controller/userlogin");
const router = express.Router();
const { createReport } = require ("../controller/reportcontroller");
const {getReports} = require ("../controller/reportcontroller");

router.post('/CreateReport',createReport);
router.post('/login', loginUser);
router.get('/Reports', getReports );
module.exports = router;
