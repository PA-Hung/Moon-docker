"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = _interopRequireDefault(require("../controller/authController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initAuthRoutes = function initAuthRoutes(app) {
  // authentication routes
  router.post("/login", _authController["default"].handleLoginController);
  router.post("/refresh-token", _authController["default"].handleRefreshTokenController);
  router.post("/logout", _authController["default"].handleLogoutController);
  return app.use("/api/v1/", router);
};
var _default = initAuthRoutes;
exports["default"] = _default;