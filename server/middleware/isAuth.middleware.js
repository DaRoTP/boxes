const jwt = require('jsonwebtoken');
const ENV = require('../conf/env.conf');

const isAuth = (req, _, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, ENV.JWT_SECRET);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken._id;
  next();
};

const isAuthThrow = (req, res, next) => {
  if(!req.isAuth) {
    return res.status(401).json({ message: 'unauthorized'});
  }
  next();
};

module.exports = { isAuth, isAuthThrow }
