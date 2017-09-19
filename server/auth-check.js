const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');

// config

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode token using secret phrase
  return jwt.verify(token, 'secretphrase', (err, decoded) => {

    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if user exists
    return User.findById(userId, (err, user) => {
      if (err || !user) {
        return res.status(401).end();
      }
    });

    return next();
  });
}