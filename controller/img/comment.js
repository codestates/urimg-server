const { Users, Comments } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: async (req, res) => {
    const { image_id } = req.query;
    const comments = [];

    const data = await Comments.findAll({
      where: { image_id },
      attributes: ['comment', 'createdAt', 'user_id']
    });
    if(data.length === 0) {
      return res.status(404).send('no comment');
    }

    for(let key of data) {
      let { user_id } = key.dataValues;
      delete key.dataValues.user_id;
      let userData = await Users.findOne({
        where: { id: user_id },
        attributes: ['user_name']
      });
      comments.push({
        ...key.dataValues,
        ...userData.dataValues
      });
    }
    res.status(200).send({ comments: [ ...comments ] });
  },

  post: (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
      return res.status(401).send("Access token expired");
    }

    const { image_id, comment } = req.body;
    const { id } = accessTokenData;

    Comments.create({
      comment: comment,
      user_id: id,
      image_id: image_id
    }).then(() => {
      return res.status(201).send('Successfully added a comment');
    }).catch((err) => {
      console.log(err);
      return res.status(500).send('err');
    })
  }
}
