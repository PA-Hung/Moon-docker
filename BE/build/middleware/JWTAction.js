"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require('dotenv').config();
var uuid = require('uuid');
var nonSercurePaths = ['/', '/register', '/login', '/logout'];
// route không cần check
var nonSercurePathsForUser = ['/', '/register', '/login', '/logout'];
var createAccess_tokenJWT = function createAccess_tokenJWT(payload) {
  var key = process.env.JWT_SECRET;
  var token = null;
  try {
    token = _jsonwebtoken["default"].sign(payload, key, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  } catch (e) {
    console.log('createJWT Error', e);
  }
  return token;
};
var createRefresh_token = function createRefresh_token() {
  var refreshToken = uuid.v4();
  return refreshToken;
};
var verifyToken = function verifyToken(token) {
  var key = process.env.JWT_SECRET;
  var decoded = null;
  try {
    decoded = _jsonwebtoken["default"].verify(token, key);
  } catch (e) {
    console.log('Vui lòng đăng nhập !');
  }
  return decoded;
};
var extractToken = function extractToken(req) {
  //console.log('headers', req.headers.authorization.split(' ')[1]);
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};
var checkUserJWT = function checkUserJWT(req, res, next) {
  if (nonSercurePaths.includes(req.path)) {
    return next();
  }
  var tokenFromHeader = extractToken(req);
  if (tokenFromHeader) {
    var token = tokenFromHeader;
    //console.log('tokenFromHeader', token);
    var decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: '',
        EM: 'Access token not verify !'
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: '',
      EM: 'Not authenticated the user !'
    });
  }
};
var checkUserPermission = function checkUserPermission(req, res, next) {
  if (nonSercurePaths.includes(req.path) || req.path === '/account') {
    return next();
  }
  if (req.user) {
    var role = req.user.role;
    if (!role || role.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: '',
        EM: 'Bạn không có quyền truy cập trang admin !'
      });
    }
    if (role === 'User') {
      if (req.path === '/quiz-by-participant' || req.path === '/questions-by-quiz' || req.path === '/profile' || req.path === '/history' || req.path === '/quiz-submit') {
        return next();
      } else {
        return res.status(403).json({
          EC: -1,
          DT: '',
          EM: 'Bạn không có quyền truy cập trang này!'
        });
      }
    }
    if (role === 'Admin') {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: '',
        EM: 'Bạn không có quyền truy cập trang admin !'
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: '',
      EM: 'Not authenticated the user !'
    });
  }
};
module.exports = {
  createAccess_tokenJWT: createAccess_tokenJWT,
  createRefresh_token: createRefresh_token,
  verifyToken: verifyToken,
  checkUserJWT: checkUserJWT,
  checkUserPermission: checkUserPermission
};