const Recruitment = require("../models/RecruitmentModel");

// -----------------------------
// Wake Up Controller
// -----------------------------
const wakeUp = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Backend is awake 🚀"
    });
};

// -----------------------------
// Submit Recruitment Form
// -----------------------------
const submitRecruitmentForm = async (req, res) => {
    try {

        let {
            fullName,
            email,
            phoneNumber,
            IdNumber,
            department,
            resumelink , 
            year,
            cpi,
            preferences,
            responses
        } = req.body;

        // ----------------------------
        // Trim String Inputs
        // ----------------------------
        fullName = fullName?.trim();
        email = email?.trim().toLowerCase();
        phoneNumber = phoneNumber?.trim();
        IdNumber = IdNumber?.trim();

        // ----------------------------
        // Required Fields
        // ----------------------------
        if (
            !fullName ||
            !email ||
            !phoneNumber ||
            !IdNumber ||
            !department || !resumelink ||
            !year ||
            cpi === undefined ||
            !preferences ||
            !responses
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        // ----------------------------
        // Email Validation
        // ----------------------------
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address."
            });
        }

        // ----------------------------
        // Phone Validation
        // ----------------------------
        if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
            return res.status(400).json({
                success: false,
                message: "Invalid phone number."
            });
        }

        // ----------------------------
        // CPI Validation
        // ----------------------------
        if (isNaN(cpi) || cpi < 0 || cpi > 10) {
            return res.status(400).json({
                success: false,
                message: "CPI must be between 0 and 10."
            });
        }

        // ----------------------------
        // Preferences Validation
        // ----------------------------
        if (
            !Array.isArray(preferences) ||
            preferences.length !== 3
        ) {
            return res.status(400).json({
                success: false,
                message: "Exactly 3 preferences are required."
            });
        }

        if (new Set(preferences).size !== 3) {
            return res.status(400).json({
                success: false,
                message: "Preferences must be unique."
            });
        }

        // ----------------------------
        // Responses Validation
        // ----------------------------
        if (!Array.isArray(responses)) {
            return res.status(400).json({
                success: false,
                message: "Responses must be an array."
            });
        }

        // ----------------------------
        // Duplicate Enrollment Number
        // ----------------------------
        const existingEnrollment = await Recruitment.findOne({
            IdNumber
        });

        if (existingEnrollment) {
            return res.status(409).json({
                success: false,
                message: "An application with this Id Number already exists."
            });
        }

        // ----------------------------
        // Duplicate Email
        // ----------------------------
        const existingEmail = await Recruitment.findOne({
            email
        });

        if (existingEmail) {
            return res.status(409).json({
                success: false,
                message: "An application with this Email already exists."
            });
        }

        // ----------------------------
        // Save Application
        // ----------------------------
        const recruitment = await Recruitment.create({
            fullName,
            email,
            phoneNumber,
            IdNumber,
            department,
            resumelink , 
            year,
            cpi,
            preferences,
            responses
        });

        return res.status(201).json({
            success: true,
            message: "Application submitted successfully.",
            data: recruitment
        });

    } catch (err) {

        console.error(err);

        // Mongo Duplicate Key
        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Application already exists."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
};

module.exports = {
    submitRecruitmentForm
};

module.exports = {
    wakeUp,
    submitRecruitmentForm
};