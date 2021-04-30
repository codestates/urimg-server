const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
      return res.status(400).send("You're currently not logged in");
    }
    else {
      res.clearCookie('refresh_token');
      res.status(200).send('Succesfully logged out!');
    }
  }
}
