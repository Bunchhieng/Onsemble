// Database connection handler
require('../models/db');
var UserSchema = require('../models/User');
/**
 * Helper function to send response, status code and content
 * @param {String} res
 * @param {Number} status - status code
 * @param {String} content
 */
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
