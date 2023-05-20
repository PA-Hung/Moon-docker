import userService from '../service/userService'

const handleGetUserProfileController = async (req, res) => {
    //console.log('req.user.id', req.user.id);
    try {
        let data = await userService.getUserProfileService(req.user.id);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    } catch (error) {
        console.log('>>>>> error from handleGetUserProfileController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }

}

const handleGetHistoryController = async (req, res) => {
    //console.log('req.user.id', req.user.id);
    try {
        let data = await userService.getHistoryService(req.user.id);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    } catch (error) {
        console.log('>>>>> error from handleGetHistoryController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

const handleQuizSubmitController = async (req, res) => {
    try {
        let userId = req.user.id
        let { quizId, answers } = req.body;
        let data = await userService.postQuizSubmitService(userId, quizId, answers);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    } catch (error) {
        console.log('>>>>> error from handleQuizSubmitController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

const handleUpdateProfileController = async (req, res) => {
    try {
        let id = req.user.id
        let email = req.body.email;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;
        let username = req.body.username;
        let image = req?.files?.userImage?.data ? req?.files?.userImage?.data : ''

        if (req.files !== null) {
            let data = await userService.updateProfileService(id, username, email, oldPassword, newPassword, image);
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT, // Data
            })
        } else {
            let data = await userService.updateProfileService(id, username, email, oldPassword, newPassword);
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT, // Data
            })
        }

    } catch (error) {
        console.log('>>>>> error from handleUpdateProfileController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

module.exports = {
    handleGetUserProfileController,
    handleGetHistoryController,
    handleQuizSubmitController,
    handleUpdateProfileController
}