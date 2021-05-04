const { Users, Images } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const images = [];
    const data = await Images.findAll({ attributes: { exclude: ['UserId']} })
    if(!data) {
      return res.status(500).send('err');
    }
    for(let key of data) {
      let { user_id } = key.dataValues;
      delete key.dataValues.user_id;
      let userData = await Users.findOne({
        where: { id: user_id },
        attributes: {
          exclude: ['password', 'email', 'createdAt', 'updatedAt']
        }
      });
      images.push({
        ...key.dataValues,
        user: {
          ...userData.dataValues
        }
      });
    }
    return res.status(200).send({ data: { images: [...images]} });
  }
}
