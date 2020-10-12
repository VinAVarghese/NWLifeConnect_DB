const express = require("express");
const db = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");

//LOGIN
router.post("/login", (req, res) => {
    db.Admin.findOne({
        name: req.body.name,
    })
        .then((admin) => {
            if (!admin) {
                return res.status(404).send("no such admin");
            } else {
                console.log("Admin (auth.js)", admin)
                if (bcrypt.compareSync(req.body.password, admin.password)) {
                    req.session.admin = {
                        id: admin._id,
                        name: admin.name,
                        email: admin.email
                    };
                    console.log("req.session.admin (auth.js)", req.session.admin);
                    res.send(req.session);
                } else {
                    res.status(401).send("wrong password");
                }
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).end();
        });
});

//LOG OUT
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("You have been logged out!");
});

//READ SESSIONS
router.get("/readsession", (req, res) => {
    res.json(req.session);
});

module.exports = router;