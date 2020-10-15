const express = require("express");
const db = require("./models");
const Sequelize = require("sequelize");
const session = require("express-session");
const cors = require("cors");
require('dotenv').config();

// initalize sequelize with session store
let SequelizeStore = require("connect-session-sequelize")(session.Store);

// create database, ensure 'sqlite3' in your package.json
var sequelize = new Sequelize("database", "username", "password", {
    dialect: "sqlite",
    storage: "./session.sqlite",
});

const allRoutes = require("./controllers");

let PORT = process.env.PORT || 8080;
let app = express();

// Defining middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log(`Listening on port: ${PORT}`);
    });
});

// CORS
app.use(
    cors({
        origin: ["https://nwlife-connect.herokuapp.com"],
        credentials: true
    })
);

let myStore = new SequelizeStore({
  db: sequelize,
});

//SESSION
// for heroku deploy uncomment proxy, samesite and secure
  app.use(
    session({
      secret: process.env.SESSIONSECRET,
      resave: false,
      saveUninitialized: false,
      proxy: true,
      store: myStore,
      cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
      }
    })
  );

myStore.sync();

// API routes
app.use("/", allRoutes);