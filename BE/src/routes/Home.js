import express from "express";
const router = express.Router();

const handleHomePage = (req, res) => {
    return res.render("home.ejs")
}

const initHomeRoutes = (app) => {
    router.get('/', handleHomePage);
    return app.use("/", router)
}

export default initHomeRoutes;