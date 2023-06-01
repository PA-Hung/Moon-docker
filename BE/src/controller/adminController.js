import adminService from '../service/adminService'
import userService from '../service/userService'

const handleCreateNewUserController = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let username = req.body.username;
        let role = req.body.role;
        if (req.files == null) {
            let data = await adminService.createNewUserService(email, password, username, role);
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT, // Data
            })
        } else {
            let image = req.files.userImage.data
            let data = await adminService.createNewUserService(email, password, username, role, image);
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT, // Data
            })
        }
    } catch (error) {
        console.log('>>>>> error from handleCreateNewUserController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

const handleGetUserController = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page
            let limit = req.query.limit
            //console.log('page>>> ', page)
            //console.log('limit>>> ', limit)

            let data = await adminService.getUserWithPaginService(+page, +limit);
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT, // Data
            })
        } else {
            let data = await adminService.getUserService();
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT, // Data
            })
        }
    } catch (error) {
        console.log('>>>>> error from handleGetUserController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }

}

const handleUpdateUserController = async (req, res) => {
    try {
        let id = req.body.id
        let email = req.body.email;
        let password = req.body.password;
        let username = req.body.username;
        let role = req.body.role;
        let image = req?.files?.userImage?.data ? req?.files?.userImage?.data : ''

        if (req.files !== null) {
            let data = await adminService.updateUserService(id, email, password, username, role, image);
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT, // Data
            })
        } else {
            let data = await adminService.updateUserService(id, email, password, username, role);
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT, // Data
            })
        }

    } catch (error) {
        console.log('>>>>> error from handleUpdateUserController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

const handleDeleteUserController = async (req, res) => {
    try {
        let id = req.body.id;
        console.log('req.body.id', id);
        let data = await adminService.deleteUserService(id);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    } catch (error) {
        console.log('>>>>> error from handleDeleteUserController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

const handleGetDashboarController = async (req, res) => {
    try {
        let data = await adminService.getDashBoardService();
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    } catch (error) {
        console.log('>>>>> error from handleGetDashboarController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

const handleGetHistoryByIdController = async (req, res) => {
    try {
        let id = req.query.userID
        let data = await userService.getHistoryService(id);
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

module.exports = {
    handleCreateNewUserController,
    handleGetUserController,
    handleUpdateUserController,
    handleDeleteUserController,
    handleGetDashboarController,
    handleGetHistoryByIdController
}