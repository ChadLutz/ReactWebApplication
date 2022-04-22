const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username

  const client = require("../config/db.config");

  var query = 'SELECT * from users ' +
              'where username = \''+ req.body.username +'\'';
  client.query(query)
    .then(user => {
      if (user.rowCount > 0) {
        res.status(400).send({
          message: "Failed! Username is already in use!"
        });
        return;
      }
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });

    // Email
    var query = 'SELECT * from users ' +
                'where email = \''+ req.body.email +'\'';
    client.query(query)
      .then(user => {
        if (user.rowCount > 0) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }
      })
      .catch(err => {
        return res.status(500).send({ message: err.message });
      })
      next();
};

checkRolesExisted = (req, res, next) => {
  //NOT IMPLEMENTED YET
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
