const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
      return res.status(401).send('Bad request');
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
  }
}
