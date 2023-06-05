import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);
import { createAccess_tokenJWT, createRefresh_token } from '../middleware/JWTAction'

const hashRefreshToken = (refreshToken) => {
    return bcrypt.hashSync(refreshToken, salt);
}

const checkRefreshToken = (inputRT, hashRT) => {
    return bcrypt.compareSync(inputRT, hashRT); // true
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // true
}

const isRefreshTokenExpired = (refreshTokenExpirationTime) => {
    const currentDate = new Date();
    const expirationDate = new Date(refreshTokenExpirationTime);
    return currentDate.getTime() >= expirationDate.getTime();
}

const update_refresh_token_to_DB = async (username, refresh_token) => {
    try {
        const hashToken = hashRefreshToken(refresh_token)
        const currentDate = new Date();
        const refreshTokenExpirationTime = currentDate.setDate(currentDate.getDate() + 1);
        await db.Participants.update(
            {
                refresh_token: hashToken,
                refresh_expired: refreshTokenExpirationTime
            },
            {
                where: { username: username }
            }
        )
        return {
            EM: 'Update update_refresh_token_to_DB success !',
            EC: 0,
            DT: [],
        }
    } catch (error) {
        console.log('Error from update_refresh_token_to_DB', error);
        return {
            EM: 'Error from update_refresh_token_to_DB',
            EC: 1,
            DT: [],
        }
    }
}

const loginUserService = async (username, password) => {
    try {
        let userData = await db.Participants.findOne({
            where: { username: username }
        })
        if (userData) {
            let isCorrectPassword = checkPassword(password, userData.password)
            if (isCorrectPassword === true) {
                // tạo access_token
                let payload = {
                    id: userData.id,
                    username: userData.username,
                    role: userData.role
                }
                let access_token = createAccess_tokenJWT(payload)
                // tạo refresh_token
                let refresh_token = createRefresh_token()
                // lưu refresh_token vào database
                let res = await update_refresh_token_to_DB(username, refresh_token)
                if (res.EC === 0) {
                    return {
                        EM: 'User login success !', // Error Message
                        EC: 0, // error code
                        DT: {
                            access_token: access_token,
                            refresh_token: refresh_token,
                            email: userData.email,
                            username: userData.username,
                            role: userData.role,
                            image: userData.image
                        },
                    }
                }
            }
        }
        console.log('Không tìm thấy người dùng có User:', username, '/Password:', password)
        return {
            EM: 'Username hoặc password không đúng', // Error Message
            EC: 1, // error code
            DT: '',
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Error from loginUserService', // Error Message
            EC: -2, // error code
            DT: '',
        }
    }
}

const checkRefreshTokenService = async (username, refresh_token) => {
    try {
        let userData = await db.Participants.findOne({
            where: { username: username }
        })
        if (userData) {
            let isCorrectRT = checkRefreshToken(refresh_token, userData.refresh_token)
            let checkTimeRT = isRefreshTokenExpired(userData.refresh_expired)

            if (isCorrectRT === true) {
                if (checkTimeRT === false) {
                    let payload = {
                        id: userData.id,
                        username: userData.username,
                        role: userData.role
                    }
                    let access_token = createAccess_tokenJWT(payload)
                    let new_refresh_token = createRefresh_token()
                    update_refresh_token_to_DB(username, new_refresh_token)
                    return {
                        EM: 'Get Refresh Token success !', // Error Message
                        EC: 0, // error code
                        DT: {
                            access_token: access_token,
                            refresh_token: new_refresh_token,
                        },
                    }
                }
                return {
                    EM: 'Refresh_token is expired !', // Error Message
                    EC: -999, // error code
                    DT: {
                        username: username,
                        refresh_token: refresh_token,
                    },
                }
            }
            return {
                EM: 'Invalid Refresh_token !', // Error Message
                EC: -2, // error code
                DT: {
                    username: username,
                    refresh_token: refresh_token,
                },
            }
        }
        return {
            EM: 'Invalid username !', // Error Message
            EC: -1, // error code
            DT: {
                username: username,
                refresh_token: refresh_token,
            },
        }
    } catch (error) {
        return {
            EM: 'Error checkRefreshTokenService !', // Error Message
            EC: -4, // error code
            DT: []
        }
    }
}

const logoutUserService = async (username, refresh_token) => {
    try {
        let userData = await db.Participants.findOne({
            where: { username: username }
        })
        if (userData) {
            let isCorrectRT = checkRefreshToken(refresh_token, userData.refresh_token)
            if (isCorrectRT === true) {
                await db.Participants.update(
                    {
                        refresh_token: null,
                        refresh_expired: null
                    },
                    {
                        where: { username: username }
                    }
                )
                return {
                    EM: 'Logout user success !', // Error Message
                    EC: 0, // error code
                    DT: []
                }
            }
            return {
                EM: 'Invalid Refresh_token !', // Error Message
                EC: -888, // error code
                DT: {
                    username: username,
                    refresh_token: refresh_token,
                },
            }
        }
        return {
            EM: 'Invalid username !', // Error Message
            EC: -1, // error code
            DT: {
                username: username,
                refresh_token: refresh_token,
            },
        }
    } catch (error) {
        return {
            EM: 'Error logoutUserService !', // Error Message
            EC: -4, // error code
            DT: []
        }
    }
}

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const registerUserService = async (username, email, password) => {
    try {
        let hashpass = hashUserPassword(password)
        let check = await db.Participants.count()
        if (check === 0) {
            await db.Participants.create({
                username: username,
                email: email,
                password: hashpass,
                role: "Admin"
            })
            return {
                EM: 'Register user success !', // Error Message
                EC: 0, // error code
                DT: []
            }
        } else {
            await db.Participants.create({
                username: username,
                email: email,
                password: hashpass,
                role: "User"
            })
            return {
                EM: 'Register user success !', // Error Message
                EC: 0, // error code
                DT: []
            }
        }
    } catch (error) {
        return {
            EM: 'Error loginRegisterService !', // Error Message
            EC: -4, // error code
            DT: []
        }
    }
}

module.exports = {
    loginUserService,
    checkRefreshTokenService,
    logoutUserService,
    registerUserService
}