const User = require('../user/user.model');
// const bcrypt = require('bcryptjs')

module.exports = {
  userById: (req, res) => {
    User.findAll({
      where: { id: parseInt(req.headers.userid, 10) },
    })
    .then((user) => res.status(200).json(user[0]))
    .catch((err) => res.status(401).send(err));
  },
};
