const db = require("../models");
const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//Save user to database
exports.signup = (req, res) => {

  const client = require("../config/db.config");

  var query = 'INSERT INTO users (username, password, fname, lname, email, active) VALUES ' +
              '(\''+req.body.username+'\', \''+bcrypt.hashSync(req.body.password, 8)+'\', \''+req.body.fname+'\', \''+req.body.lname+'\', \''+req.body.email+'\' , \'true\'); ';
   client.query(query)
   .then(response => {

   })
   .catch(error => {
     return res.status(500).send({ message: error.message });
   })
  query = 'SELECT userid from users ' +
          'where username = \'' + req.body.username + '\' AND ' +
          'email = \'' + req.body.email + '\'; ';
  var userid;
  client.query(query)
   .then(response => {
     userid = response.rows[0].userid;
     query = 'INSERT INTO usersinfo (userid, roleuser, rolemod, roleadmin) VALUES ' +
              '('+userid+', \''+true+'\', \''+true+'\', \''+true+'\'); ';
     client.query(query)
       .then(response => {
         return res.status(200).send("Success");
       })
       .catch(error => {
         return res.status(500).send({ message: error.message });
       })
   })
   .catch(error => {
     return res.status(500).send({ message: error.message });
   })

};

exports.signin = (req, res) => {

  const client = require("../config/db.config");

  var query = 'SELECT * from users ' +
              'where username = \''+ req.body.username +'\'';
  client.query(query)
    .then(user => {
      if (user.rowCount === 0) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.rows[0].password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.rows[0].userid }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      authorities.push("ROLE_USER");
      authorities.push("ROLE_MOD");
      authorities.push("ROLE_ADMIN");

      return res.status(200).send({
      id: user.rows[0].userid,
      username: user.rows[0].username,
      email: user.rows[0].email,
      roles: authorities,
      accessToken: token
      });

    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    })
};
