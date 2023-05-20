"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _adminController = _interopRequireDefault(require("../controller/adminController"));
var _JWTAction = require("../middleware/JWTAction");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initAdminRoutes = function initAdminRoutes(app) {
  router.all('*', _JWTAction.checkUserJWT, _JWTAction.checkUserPermission);
  // user CRUD routers by admin
  router.get("/participant", _adminController["default"].handleGetUserController);
  router.post("/participant", _adminController["default"].handleCreateNewUserController);
  router.put("/participant", _adminController["default"].handleUpdateUserController);
  router["delete"]("/participant", _adminController["default"].handleDeleteUserController);

  // dashboard by admin
  router.get("/dashboard", _adminController["default"].handleGetDashboarController);
  return app.use("/api/v1/", router);
};
var _default = initAdminRoutes;
exports["default"] = _default;