const { Users } = require('../../models');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('../tokenFunctions');

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
    Users.findOne({
      where: { email, password },
    })
    .then((data) => {
      if (!data) {
        return res.status(401).send('Invalid user or Wrong password');
      }
      delete data.dataValues.password;
      const access_token = generateAccessToken(data.dataValues);
      const refresh_token = generateRefreshToken(data.dataValues);

      sendRefreshToken(res, refresh_token);
      return sendAccessToken(res, access_token);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('err');
    });
  }
};
