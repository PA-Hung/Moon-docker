"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controller/userController"));
var _JWTAction = require("../middleware/JWTAction");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initUserRoutes = function initUserRoutes(app) {
  router.all('*', _JWTAction.checkUserJWT, _JWTAction.checkUserPermission);
  // user 
  router.get("/profile", _userController["default"].handleGetUserProfileController);
  router.get("/history", _userController["default"].handleGetHistoryController);
  router.post("/quiz-submit", _userController["default"].handleQuizSubmitController);
  router.put("/profile", _userController["default"].handleUpdateProfileController);
  return app.use("/api/v1/", router);
};
var _default = initUserRoutes;
exports["default"] = _default;