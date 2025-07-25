const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler');

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error('Authentication required');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    errorHandler(res, 401, 'Please authenticate');
  }
};