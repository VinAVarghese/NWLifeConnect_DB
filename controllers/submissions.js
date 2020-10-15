const express = require("express");
const router = express.Router();
const Submission = require("../models/submission");

// Post new form submission
router.post("/new", (req, res) => {
    Submission.create({
        updating: req.body.updating,
        name: req.body.name ,
        address: req.body.address ,
        apt: req.body.apt ,
        city: req.body.city ,
        zip: req.body.zip ,
        email: req.body.email ,
        phone: req.body.phone ,
        birthday: req.body.birthday ,
        occupation: req.body.occupation ,
        age: req.body.age ,
        invitedBy: req.body.invitedBy ,
        attendance: req.body.attendance ,
        nextStepRelationship: req.body.nextStepRelationship ,
        readyToServe: req.body.readyToServe ,
        nextStepOther: req.body.nextStepOther ,
        otherContent: req.body.otherContent ,
        prayerPraise: req.body.prayerPraise ,
        confidential: req.body.confidential 
    }).then((newSubmission) => {
        res.json(newSubmission);
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    });
});

module.exports = router;