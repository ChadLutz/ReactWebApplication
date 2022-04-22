const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {

  const client = require("../config/db.config");

  var query = 'SELECT roleadmin from usersinfo ' +
              'where userid = ' + req.userId + ' ';
  client.query(query)
  .then(roles => {
    if (roles.rows[0].roleadmin === true) {
      next();
      return;
    }
    res.status(403).send({
      message: "Require Admin Role!"
    });
    return;
  })
  .catch(error => {
    console.log(error);
  });

};

isModerator = (req, res, next) => {

  const client = require("../config/db.config");

  var query = 'SELECT rolemod from usersinfo ' +
              'where userid = ' + req.userId + ' ';
  client.query(query)
  .then(roles => {
    if (roles.rows[0].rolemod === true) {
      next();
      return;
    }

    res.status(403).send({
      message: "Require Moderator Role!"
    });
    return;
  })
  .catch(error => {
    console.log(error);
  });
};

isModeratorOrAdmin = (req, res, next) => {

  const client = require("../config/db.config");

  var query = 'SELECT rolemod, roleadmin from usersinfo ' +
              'where userid = ' + req.userId + ' ';
  client.query(query)
  .then(roles => {
    if (roles.rows[0].rolemod === true) {
      next();
      return;
    }
    if (roles.rows[0].roleadmin === true) {
      next();
      return;
    }

    res.status(403).send({
      message: "Require Moderator or Admin Role!"
    });
    return;
  })
  .catch(error => {
    console.log(error);
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;
