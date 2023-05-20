import express from "express";
import quizController from '../controller/quizController'
import questionController from '../controller/questionController'
import answerController from '../controller/answerController'
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction';

const router = express.Router();
const initQuizRoutes = (app) => {

    router.all('*', checkUserJWT, checkUserPermission)
    // quiz by participant
    router.get("/quiz-by-participant", quizController.handleGetQuizController);
    router.get("/questions-by-quiz", quizController.handleGetQuizQuestionController);
    // quiz by admin
    router.post("/quiz-by-admin", quizController.handleCreateNewQuizByAdminController);
    router.get("/quiz-by-admin", quizController.handleGetQuizWithPaginByAdminController);
    router.delete("/quiz-by-admin", quizController.handleDeleteQuizByAdminController);
    router.put("/quiz-by-admin", quizController.handleUpdateQuizByAdminController);
    router.get("/quiz-by-admin/all", quizController.handleGetQuizByAdminController);
    // question by admin
    router.post("/question", questionController.handlePostQuestionByAdminController);
    // answer by admin
    router.post("/answer", answerController.handlePostAnswerByAdminController);
    // quiz assign to user by admin
    router.post("/quiz-assign-to-user", quizController.handleQuizAssignController);
    // get quiz - question - answer by admin
    router.get("/quiz-with-qa/:quizId", quizController.handleGetQuizQAController);
    router.post("/quiz-upsert-qa", questionController.handleQuizUpsertQAController);

    return app.use("/api/v1/", router)
}

export default initQuizRoutes;