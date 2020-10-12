const express = require("express");
const router = express.Router();
const db = require("../models");

// Get all Submissions in the database
router.get("/", (req, res) => {
    if (!req.session.admin) {
        res.status(401).send("login required")
    } else {
        db.Submission.find({})
            .then((allSubmissions) => {
                res.json(allSubmissions);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).end();
            });
    }
});

// Post a form Submission in the database
router.post("/new", (req, res) => {
    db.Submission.create({
        name: req.body.name,
        address: req.body.address,
        apt: req.body.apt,
        city: req.body.city,
        zip: req.body.zip,
        email: req.body.email,
        phone: req.body.phone,
        birthday: req.body.birthday,
        occupation: req.body.occupation,
        age: req.body.age,
        invitedBy: req.body.invitedBy,
        attendance: req.body.attendance,
        nextStepsFreshStart: req.body.nextStepsFreshStart,
        nextStepLordsPrayer: req.body.nextStepLordsPrayer,
        readyToServe: req.body.readyToServe,
        prayerPraise: req.body.prayerPraise,
        confidential: req.body.confidential
    }).then((newSubmission) => {
        res.json(newSubmission);
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    });
});