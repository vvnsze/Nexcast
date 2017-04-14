const User = require('../user/user.model');
const bcrypt = require('bcrypt')

module.exports = {
  create: (req, res)=>{
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        })
        .then((user)=>res.status(200).send({user: user}))
        .catch((err)=>res.status(401).send(err));
      });
    });
  },
  delete: (req,res)=>{

  },
  show: (req,res)=>{

  }
};
