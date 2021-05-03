const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
      return res.status(401).send("Access token expired");
    }
    else {
      res.clearCookie('refresh_token');
      res.status(200).send('Succesfully logged out!');
    }
  }
}
