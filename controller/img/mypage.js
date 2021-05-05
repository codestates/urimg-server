const { Users, Images, Users_Likes } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: async(req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
      return res.status(401).send("Access token expired");
    }

    const { id } = accessTokenData;
    const { type } = req.body;
    const images = [];

    if(type === 'upload') {
      const data = await Images.findAll({
        where: { user_id: id },
        attributes: { exclude: ['UserId'] }
      });
      if(!data) {
        return res.status(500).send('err');
      }

      for(let key of data) {
        let { user_id } = key.dataValues;
        delete key.dataValues.user_id;
        let userData = await Users.findOne({
          where: { id: user_id },
          attributes: ['id', 'user_name', 'profile_image']
        });
        images.push({
          ...key.dataValues,
          user: {
            ...userData.dataValues
          }
        });
      }
    }
    else if(type === 'like') {
      const imageId = await Users_Likes.findAll({
        attributes: ['image_id'],
        where: { user_id: id}
      });
      const userData = await Users.findOne({
        where: { id: id },
        attributes: ['id', 'user_name', 'profile_image']
      });
      if(!imageId) {
        return res.status(500).send('err');
      }

      for(let key of imageId) {
        console.log(key.dataValues);
        let { image_id } = key.dataValues;
        let imageData = await Images.findOne({
          where: { id: image_id},
          attributes: { exclude: ['UserId', 'user_id'] }
        });
        images.push({
          ...imageData.dataValues,
          user: {
            ...userData.dataValues
          }
        });
      }
    }
    return res.status(200).send({ data: { images: [...images] } });
  }
}
