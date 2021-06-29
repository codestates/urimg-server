const { Users, Images } = require('../../models');

module.exports = {
  get: (req, res) => {
    Images.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ['UserId'] }
    })
    .then((imageData) => {
      Users.findOne({
        where: { id: imageData.dataValues.user_id },
        attributes: ['id', 'user_name', 'profile_image']
      }).then((userData) => {
        delete imageData.dataValues.user_id;
        return res.status(200).send({ data: {
          ...imageData.dataValues,
          user: { ...userData.dataValues }
        }});
      })
    }).catch((err) => {
      console.log(err);
      return res.status(500).send('err');
    })
  }
}
