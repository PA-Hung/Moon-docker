import quizService from '../service/quizService'

const handleGetQuizController = async (req, res) => {
    //console.log('>>>>>> req.user >>>>>>', req.user);
    try {
        if (!req.user) {
            return res.status(400).json({
                DT: '',
                EM: 'Not authenticated the user. Invalid JWT Token',
                EC: -1
            })
        }
        let userId = req.user.id
        let data = await quizService.getQuizService(userId);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    } catch (error) {
        console.log('>>>>> error from handleGetQuizController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })

    }
}

const handleGetQuizQuestionController = async (req, res) => {
    try {
        let id = req.query.quizId
        //console.log('check param id', id);
        let data = await quizService.getQuizQuestionService(id);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    } catch (error) {
        console.log('>>>>> error from handleGetQuizQuestionController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })

    }
}

const handleCreateNewQuizByAdminController = async (req, res) => {
    try {
        let name = req.body.name;
        let description = req.body.description;
        let difficulty = req.body.difficulty;
        if (req.files == null) {
            return res.status(200).json({
                EM: 'No image file were uploaded !', // Error Message
                EC: -1, // Error Code
                DT: [], // Data
            })
        } else {
            let image = req.files.quizImage.data
            let data = await quizService.createQuizService(name, description, image, difficulty);
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT, // Data
            })
        }
    } catch (error) {
        console.log('>>>>> error from handleCreateNewQuizController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

const handleGetQuizWithPaginByAdminController = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page
            let limit = req.query.limit
            let data = await quizService.getQuizByAdminWithPaginService(+page, +limit);
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT, // Data
            })
        }
    } catch (error) {
        console.log('>>>>> error from handleGetQuizWithPaginByAdminController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

const handleGetQuizByAdminController = async (req, res) => {
    try {
        let data = await quizService.getQuizByAdminService();
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    } catch (error) {
        console.log('>>>>> error from handleGetQuizByAdminController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

const handleDeleteQuizByAdminController = async (req, res) => {
    try {
        let id = req.body.id;
        let data = await quizService.deleteQuizByAdminService(id);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    } catch (error) {
        console.log('>>>>> error from handleDeleteQuizByAdminController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

const handleUpdateQuizByAdminController = async (req, res) => {
    try {
        let id = req.body.id
        let name = req.body.name;
        let description = req.body.description;
        let difficulty = req.body.difficulty;
        let image = req?.files?.quizImage?.data
        let data = await quizService.updateQuizByAdminService(id, name, description, image, difficulty);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    } catch (error) {
        console.log('>>>>> error from handleUpdateQuizByAdminController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

const handleQuizAssignController = async (req, res) => {
    try {
        let quizId = req.body.quizId;
        let userId = req.body.userId;
        let data = await quizService.postQuizAssginService(quizId, userId);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    } catch (error) {
        console.log('>>>>> error from handleQuizAssignController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

const handleGetQuizQAController = async (req, res) => {
    try {
        let quizId = req.params.quizId;
        //console.log('check quizid', quizId);
        let data = await quizService.getQuizQAService(quizId);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    } catch (error) {
        console.log('>>>>> error from handleGetQuizQAController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

module.exports = {
    handleGetQuizController,
    handleGetQuizQuestionController,
    handleCreateNewQuizByAdminController,
    handleGetQuizByAdminController,
    handleDeleteQuizByAdminController,
    handleUpdateQuizByAdminController,
    handleGetQuizWithPaginByAdminController,
    handleQuizAssignController,
    handleGetQuizQAController
}