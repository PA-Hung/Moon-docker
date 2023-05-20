import express from "express";
import authController from '../controller/authController'

const router = express.Router();
const initAuthRoutes = (app) => {

    // authentication routes
    router.post("/login", authController.handleLoginController);
    router.post("/refresh-token", authController.handleRefreshTokenController);
    router.post("/logout", authController.handleLogoutController);

    return app.use("/api/v1/", router)
}

export default initAuthRoutes;