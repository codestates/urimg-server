require("dotenv").config();
const AWS = require('aws-sdk');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

module.exports = {
  imageUpload: async (base64, userId) => {
    AWS.config.update({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: 'us-east-2'
    });

    const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const type = base64.split(';')[0].split('/')[1];
    const date = Date.now();

    const s3Bucket = new AWS.S3({
      params: {
        Bucket: 'urimg-image-bucket',
        Key: `${userId}-${date}.${type}`,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`
      }
    });

    let location = '';
    try {
      const { Location } = await s3Bucket.upload().promise();
      location = Location;
    } catch(err) {
      console.log(err);
      return null;
    }

    return location;
  }
}
