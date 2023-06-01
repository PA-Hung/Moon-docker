import express from "express";
import adminController from '../controller/adminController'
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction';

const router = express.Router();
const initAdminRoutes = (app) => {
    router.all('*', checkUserJWT, checkUserPermission)
    // user CRUD routers by admin
    router.get("/participant", adminController.handleGetUserController);
    router.post("/participant", adminController.handleCreateNewUserController);
    router.put("/participant", adminController.handleUpdateUserController);
    router.delete("/participant", adminController.handleDeleteUserController);
    router.get("/history-ByID", adminController.handleGetHistoryByIdController);

    // dashboard by admin
    router.get("/dashboard", adminController.handleGetDashboarController);

    return app.use("/api/v1/", router)
}

export default initAdminRoutes;