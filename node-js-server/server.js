const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = __dirname + '/app/views/';
const app = express();
app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const client = require("./app/config/db.config");

client.connect().then(serv => {

  /*var query = 'DROP TABLE users;'*/
  //var query = 'TRUNCATE TABLE users RESTART IDENTITY;'
  var query = `
  CREATE TABLE IF NOT EXISTS users (
    userId bigserial,
    username varchar,
    password varchar,
    fName varchar,
    lName varchar,
    email varchar,
    active boolean
  );
  CREATE TABLE IF NOT EXISTS usersInfo (
    userInfoId bigserial,
    userId bigint,
    roleUser boolean,
    roleMod boolean,
    roleAdmin boolean
  )
  `;
  client.query(query).then(res => {
      console.log(`Tables exist!`);
    }).catch(err => {
      console.error(err);
    }).finally(() => {

    });

    // simple route
    app.get("/", (req, res) => {
      res.sendFile(path + "index.html");
    });
    app.get("/profile", (req, res) => {
      res.sendFile(path + "index.html");
    });
    app.get("/login", (req, res) => {
      res.sendFile(path + "index.html");
    });
    // routes
    require('./app/routes/auth.routes')(app);
    require('./app/routes/user.routes')(app);

    // set port, listen for requests
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
}).catch(servErr => {
  console.log(servErr);
}).finally(() => {

})
