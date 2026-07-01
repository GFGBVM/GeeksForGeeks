const express = require("express");
const router = express.Router();

const {
    wakeUp,
    submitRecruitmentForm
} = require("../controllers/recruitmentController");

router.get("/wake-up", wakeUp);

router.post("/apply", submitRecruitmentForm);

module.exports = router;