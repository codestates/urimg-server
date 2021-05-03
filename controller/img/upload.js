const { Users, Images } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { imageUpload } = require('../s3Functions');

module.exports = {
  post: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
      return res.status(401).send("Access token expired");
    }

    const { id } = accessTokenData;
    const { filepath, description } = req.body;
    const url = await imageUpload(filepath, id);
    if(!url) {
      return res.status(500).send('err');
    }
    console.log("url: " + url + "\nid: " + id);

    // try{
    //   await Images.create({
    //     user_id: id,
    //     description: description,
    //     image: url
    //   });
    //   return res.status(201).send('Image uploaded');
    // } catch(err) {
    //   console.log(err);
    //   return res.status(500).send('Database err');
    // }

    Images.create({
      user_id: id,
      description: description,
      image: url
    }).then(() => {
      return res.status(201).send('Image uploaded');
    }).catch((err) => {
      console.log(err);
      return res.status(500).send('Database err');
    })
  }
}
