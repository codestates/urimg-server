const { Users, Images } = require('../../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = {
  post: async (req, res) => {
    const { query } = req.body;
    const images = [];

    const data = await Images.findAndCountAll({
      where: {
        description: {
          [Op.like]: '%' + query + '%'
        }
      },
      attributes: {
        exclude: ['UserId']
      }
    })

    if(data.count === 0) {
      return res.status(404).send('Not found');
    }

    for(let key of data.rows) {
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
    return res.status(200).send({
      data: {
        total: data.count,
        images: [
          ...images
        ]
      }
    });
  }
}
