const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const allRoutes = require("./controllers/submissions");

const app = express();
const PORT = process.env.PORT || 8080;

// Defining middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serving static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(async () => {
      console.log("Connected to DB");
  });

// CORS
app.use(
  cors({
    origin: [ "https://nwlife-connect.herokuapp.com","http://localhost:3000", "https://nwlife-connect-server.herokuapp.com" ],
    credentials: true
  })
);

//SESSION
// for heroku deploy uncomment proxy, samesite and secure
app.use(
  session({
    secret: "tacokat",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    }
  })
);

// API routes
app.use("/", allRoutes);

app.listen(PORT, () => {
  console.log(
    `🌎 ==> API server now listening on port ${PORT}! http://localhost:${PORT}`
  );
});