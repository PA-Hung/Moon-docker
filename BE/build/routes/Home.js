"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var handleHomePage = function handleHomePage(req, res) {
  return res.render("home.ejs");
};
var initHomeRoutes = function initHomeRoutes(app) {
  router.get('/', handleHomePage);
  return app.use("/", router);
};
var _default = initHomeRoutes;
exports["default"] = _default;