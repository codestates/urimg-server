const { Users } = require('../../models');
const {
  generateAccessToken,
  checkRefeshToken,
  sendAccessToken,
} = require('../tokenFunctions');

module.exports = {
  get: (req, res) => {
    const refreshToken = checkRefeshToken(req);
    if(!refreshToken) {
      return res.status(401).send("Refresh token expired");
    }
    const { email } = refreshToken;
    Users.findOne({ where: { email } })
    .then((data) => {
      if(!data) {
        return res.status(401).send('Invalid user or Wrong password');
      }
      delete data.dataValues.password;
      const access_token = generateAccessToken(data.dataValues);
      return sendAccessToken(res, access_token);
    })
    .catch((err) => {
      console.log(err);
    });
  }
};
