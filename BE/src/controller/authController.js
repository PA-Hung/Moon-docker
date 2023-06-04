import authService from '../service/authService'

const handleLoginController = async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let delay = req.body.delay
    try {
        setTimeout(async () => {
            let data = await authService.loginUserService(username, password)
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT, // Data
            })
        }, delay ? delay : 0)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

const handleRefreshTokenController = async (req, res) => {
    let username = req.body.username
    let refresh_token = req.body.refresh_token
    try {
        let data = await authService.checkRefreshTokenService(username, refresh_token)
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

const handleLogoutController = async (req, res) => {
    let username = req.body.username
    let refresh_token = req.body.refresh_token
    try {
        let data = await authService.logoutUserService(username, refresh_token)
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

const handleRegisterController = async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    try {
        let data = await authService.registerUserService(username, email, password)
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

module.exports = {
    handleLoginController,
    handleRefreshTokenController,
    handleLogoutController,
    handleRegisterController
}