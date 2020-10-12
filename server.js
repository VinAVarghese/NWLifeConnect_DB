let express = require("express");
let db = require ("./models");

let PORT = process.env.PORT || 8080;
let app = express();

db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log(`Listening on port: ${PORT}`);
    });
});