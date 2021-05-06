const { Users } = require('../../models');

module.exports = {
  post: (req, res) => {
    const { password, user_name, email } = req.body;
    Users.findOne({ where: { email } })
    .then((data) => {
      if(!data) {
        Users.create({
          user_name: user_name,
          email: email,
          password: password
        })
        .then((created) => {
          return res.status(201).send('User Created');
        })
      }
      else{
        return res.status(409).send('User already exist');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('err');
    });
  }
}
