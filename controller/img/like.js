const { Images, Users_Likes } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
      return res.status(401).send("Access token expired");
    }

    const { id } = accessTokenData;
    const { image_id } = req.body;

    Users_Likes.findOne({ where: {
      user_id: id,
      image_id: image_id
    }}).then((data) => {
      if(!data) {
        Users_Likes.create({
          user_id: id,
          image_id: image_id
        }).then(() => {
          Images.increment('likes', { where: { id: image_id } });
          res.status(201).send('Liked a image');
        })
      }
      else {
        res.status(400).send('Image already liked');
      }
    }).catch((err) => {
      console.log(err);
      res.status(500).send('err');
    });
  },
  delete: (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
      return res.status(401).send("Access token expired");
    }

    const { id } = accessTokenData;
    const { image_id } = req.body;

    Users_Likes.destroy({ where: {
      user_id: id,
      image_id: image_id
    }}).then(() => {
      Images.decrement('likes', { where: { id: image_id } });
      res.status(200).send('Unliked a image');
    }).catch((err) => {
      console.log(err);
      res.status(500).send('err');
    })
  }
}
