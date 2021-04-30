require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "20s" });
  },

  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "30d" });
  },

  sendRefreshToken: (res, refresh_token) => {
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
    });
  },

  sendAccessToken: (res, access_token) => {
    return res.status(200).send({ data: { access_token } });
  },

  resendAccessToken: (res, access_token, data) => {
    res.json({ data: { access_token, userInfo: data } });
  },

  isAuthorized: (req) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return null;
    }
    const token = authorization.split(" ")[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  checkRefeshToken: (refresh_token) => {
    try {
      return verify(refresh_token, process.env.REFRESH_SECRET);
    } catch (err) {
      return null;
    }
  },
};
