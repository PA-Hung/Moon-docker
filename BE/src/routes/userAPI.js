import express from "express";
import userController from '../controller/userController'
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction';

const router = express.Router();
const initUserRoutes = (app) => {
    router.all('*', checkUserJWT, checkUserPermission)
    // user 
    router.get("/profile", userController.handleGetUserProfileController);
    router.get("/history", userController.handleGetHistoryController);
    router.post("/quiz-submit", userController.handleQuizSubmitController);
    router.put("/profile", userController.handleUpdateProfileController);


    return app.use("/api/v1/", router)
}

export default initUserRoutes;