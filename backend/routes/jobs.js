const express = require('express');
const {getAllJobs, createJob, getJob, editJob, deleteJob} = require("../controllers/jobs");
const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).patch(editJob).delete(deleteJob);

module.exports = router;