const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
      return res.status(401).send("Access token expired");
    }
    const { email } = accessTokenData;
    Users.findOne({ where: { email } })
    .then((data) => {
      if(!data) {
        return res.status(404).send("User doesn't exist");
      }
      delete data.dataValues.password;
      const { id, user_name, email, profile_image, createdAt, updatedAt } = data.dataValues;
      return res.status(200).send({
        id: id,
        user_name: user_name,
        email: email,
        profile_image: profile_image,
        created_at: createdAt,
        updated_at: updatedAt
      });
    })
    .catch((err) => {
      console.log(err);
    })
  },

  delete: (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
      return res.status(401).send("Access token expired");
    }
    const { email } = accessTokenData;
    Users.findOne({ where: { email } })
    .then((data) => {
      if(!data) {
        res.status(404).send('User is not found');
      }
      else {
        Users.destroy({ where: { email } })
        .then(() => {
          res.clearCookie('refresh_token');
          res.status(200).send('User successfully deleted');
        })
      }
    })
    .catch((err) => {
      console.log(err);
    });
  },

  patch: (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
      return res.status(401).send("Access token expired");
    }
    const { email } = accessTokenData;
    const { password, user_name, profile_image } = req.body;
    Users.update(
      { password, user_name, profile_image },
      { where: { email } }
    )
    .then(() => {
      res.status(200).send('Userinfo successfully updated');
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
