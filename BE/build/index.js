"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _cors = _interopRequireDefault(require("./config/cors"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _adminAPI = _interopRequireDefault(require("./routes/adminAPI"));
var _authAPI = _interopRequireDefault(require("./routes/authAPI"));
var _quizAPI = _interopRequireDefault(require("./routes/quizAPI"));
var _userAPI = _interopRequireDefault(require("./routes/userAPI"));
var _Home = _interopRequireDefault(require("./routes/Home"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require('dotenv').config();
var app = (0, _express["default"])();

// config CORS
(0, _cors["default"])(app);

// config bordyParser 
var jsonParser = _bodyParser["default"].json({
  limit: 1024 * 1024 * 20,
  type: 'application/json'
});
var urlencodedParser = _bodyParser["default"].urlencoded({
  extended: true,
  limit: 1024 * 1024 * 20,
  type: 'application/x-www-form-urlencoded'
});
app.use(jsonParser);
app.use(urlencodedParser);

// config express 
app.use(_express["default"]["static"]('public'));
app.use(_express["default"].json({
  limit: '50mb'
}));
app.use(_express["default"].urlencoded({
  limit: '50mb',
  extended: true
}));

// config view engine
(0, _viewEngine["default"])(app);

// config cookieParser
app.use((0, _cookieParser["default"])());

// config uploadFile
app.use((0, _expressFileupload["default"])());

// init web routes
(0, _Home["default"])(app);
(0, _authAPI["default"])(app);
(0, _adminAPI["default"])(app);
(0, _quizAPI["default"])(app);
(0, _userAPI["default"])(app);
var PORT = process.env.PORT || 6969;
// port === undefined => port = 6969

app.use(function (req, res) {
  return res.send('404 not found');
});
app.listen(PORT, function () {
  console.log("JWT Backend Nodejs is runing on the port:" + PORT);
});