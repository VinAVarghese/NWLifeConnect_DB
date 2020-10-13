const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");

//SIGN UP
router.post("/signup", (req, res) => {
    const { name, password, } = req.body;
    db.Admin.create({
        name: name,
        password: password
    })
        .then(async function (newAdmin) {
            req.session.admin = {
                id: newAdmin.id,
                name: newAdmin.name
            };
            res.json(newAdmin);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json(err);
        });
});

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
                console.log("reqbody", req.body.password)
                console.log("admin", admin.password)

                if (bcrypt.compareSync(req.body.password, admin.password)) {
                    req.session.admin = {
                        id: admin.id,
                        name: admin.name
                    };
                    console.log(req.session);
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
    console.log(req.session);
    res.json(req.session);
});

module.exports = router;