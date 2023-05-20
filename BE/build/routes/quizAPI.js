"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _quizController = _interopRequireDefault(require("../controller/quizController"));
var _questionController = _interopRequireDefault(require("../controller/questionController"));
var _answerController = _interopRequireDefault(require("../controller/answerController"));
var _JWTAction = require("../middleware/JWTAction");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initQuizRoutes = function initQuizRoutes(app) {
  router.all('*', _JWTAction.checkUserJWT, _JWTAction.checkUserPermission);
  // quiz by participant
  router.get("/quiz-by-participant", _quizController["default"].handleGetQuizController);
  router.get("/questions-by-quiz", _quizController["default"].handleGetQuizQuestionController);
  // quiz by admin
  router.post("/quiz-by-admin", _quizController["default"].handleCreateNewQuizByAdminController);
  router.get("/quiz-by-admin", _quizController["default"].handleGetQuizWithPaginByAdminController);
  router["delete"]("/quiz-by-admin", _quizController["default"].handleDeleteQuizByAdminController);
  router.put("/quiz-by-admin", _quizController["default"].handleUpdateQuizByAdminController);
  router.get("/quiz-by-admin/all", _quizController["default"].handleGetQuizByAdminController);
  // question by admin
  router.post("/question", _questionController["default"].handlePostQuestionByAdminController);
  // answer by admin
  router.post("/answer", _answerController["default"].handlePostAnswerByAdminController);
  // quiz assign to user by admin
  router.post("/quiz-assign-to-user", _quizController["default"].handleQuizAssignController);
  // get quiz - question - answer by admin
  router.get("/quiz-with-qa/:quizId", _quizController["default"].handleGetQuizQAController);
  router.post("/quiz-upsert-qa", _questionController["default"].handleQuizUpsertQAController);
  return app.use("/api/v1/", router);
};
var _default = initQuizRoutes;
exports["default"] = _default;