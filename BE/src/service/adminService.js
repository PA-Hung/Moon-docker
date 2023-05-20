import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUserService = async (email, password, username, role, image) => {
    let hashPass = hashUserPassword(password);
    try {
        await db.Participants.create({
            username: username,
            email: email,
            password: hashPass,
            role: role,
            image: image
        })
        return {
            EM: 'Create User success !',
            EC: 0,
            DT: [],
        }
    } catch (error) {
        console.log(">>> check error: ", error)
        return {
            EM: 'Error from create user service',
            EC: 1,
            DT: [],
        }
    }
}

const getUserService = async () => {
    try {
        let users = await db.Participants.findAll();
        if (users) {
            return {
                EM: 'Get data success !',
                EC: 0,
                DT: users,
            }
        } else {
            return {
                EM: 'Data empty',
                EC: 0,
                DT: [],
            }
        }
    } catch (error) {
        console.log('error from getUserService:', error)
        return {
            EM: 'Get data error',
            EC: 1,
            DT: [],
        }
    }
}

const getUserWithPaginService = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const count = await db.Participants.count()
        const rows = await db.Participants.findAll({
            attributes: ["id", "email", "username", "image", "refresh_expired", "refresh_token", "role"],
            offset: offset,
            limit: limit,
            nest: true,
            order: [
                [db.sequelize.literal('CASE WHEN `Participants`.`updatedAt` > `Participants`.`createdAt` THEN `Participants`.`updatedAt` ELSE `Participants`.`createdAt` END DESC')]
            ],
        },)

        let totalPages = Math.ceil(count / limit)
        //console.log('totalRows - count : ', count)
        //console.log('totalPages', totalPages)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        return {
            EM: 'Get All User With Pagination success !',
            EC: 0,
            DT: data,
        }
    } catch (error) {
        console.log('error from getUserWithPaginService :', error)
        return {
            EM: 'Get user with pagination error !',
            EC: 1,
            DT: [],
        }
    }
}

const updateUserService = async (id, email, password, username, role, image) => {
    try {
        if (password) {
            //console.log('>>>>có pass');
            let hashPass = hashUserPassword(password);
            await db.Participants.update({
                username: username,
                email: email,
                password: hashPass,
                role: role,
                image: image
            }, { where: { id: id } })
            return {
                EM: 'Update User success !',
                EC: 0,
                DT: [],
            }
        } else {
            //console.log('Không có pass');
            await db.Participants.update({
                username: username,
                email: email,
                role: role,
                image: image
            }, { where: { id: id } })
            return {
                EM: 'Update User success !',
                EC: 0,
                DT: [],
            }
        }
    } catch (error) {
        console.log(">>> check error: ", error)
        return {
            EM: 'Error from Update User service',
            EC: 1,
            DT: [],
        }
    }
}

const deleteUserService = async (userID) => {
    try {
        await db.Participants.destroy({
            where: { id: userID }
        });
        return {
            EM: 'Delete User success !',
            EC: 0,
            DT: [],
        }
    } catch (error) {
        console.log('error from deleteUserService:', error)
        return {
            EM: 'Delete User error !',
            EC: 1,
            DT: [],
        }
    }
}

const getDashBoardService = async () => {
    try {
        let userCount = await db.Participants.count();
        let quizCount = await db.Quizs.count();
        let questionCount = await db.QuizQuestions.count();
        let answerCount = await db.QuizAnswers.count();

        let data = {
            userCount: userCount,
            quizCount: quizCount,
            questionCount: questionCount,
            answerCount: answerCount
        }

        return {
            EM: 'Get data dashboard success !',
            EC: 0,
            DT: data,
        }

    } catch (error) {
        console.log('error from getDashBoardService:', error)
        return {
            EM: 'Get data error',
            EC: 1,
            DT: [],
        }
    }
}

module.exports = {
    createNewUserService,
    getUserService,
    updateUserService,
    deleteUserService,
    getUserWithPaginService,
    getDashBoardService
}