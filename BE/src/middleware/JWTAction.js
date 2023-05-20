require('dotenv').config()
import jwt from 'jsonwebtoken';
const uuid = require('uuid');

const nonSercurePaths = ['/', '/register', '/login', '/logout'];
// route không cần check
const nonSercurePathsForUser = ['/', '/register', '/login', '/logout'];

const createAccess_tokenJWT = (payload) => {
    let key = process.env.JWT_SECRET
    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
    } catch (e) {
        console.log('createJWT Error', e)
    }
    return token
}

const createRefresh_token = () => {
    let refreshToken = uuid.v4();
    return refreshToken
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET
    let decoded = null
    try {
        decoded = jwt.verify(token, key)
    } catch (e) {
        console.log('Vui lòng đăng nhập !')
    }
    return decoded
}

const extractToken = (req) => {
    //console.log('headers', req.headers.authorization.split(' ')[1]);
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

const checkUserJWT = (req, res, next) => {
    if (nonSercurePaths.includes(req.path)) { return next() }
    let tokenFromHeader = extractToken(req)
    if (tokenFromHeader) {
        let token = tokenFromHeader
        //console.log('tokenFromHeader', token);
        let decoded = verifyToken(token)
        if (decoded) {
            req.user = decoded
            req.token = token
            next()
        } else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'Access token not verify !'
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user !'
        })
    }
}

const checkUserPermission = (req, res, next) => {
    if (nonSercurePaths.includes(req.path) || req.path === '/account') { return next() }
    if (req.user) {
        let role = req.user.role
        if (!role || role.length === 0) {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: 'Bạn không có quyền truy cập trang admin !'
            })
        }
        if (role === 'User') {
            if (
                req.path === '/quiz-by-participant'
                || req.path === '/questions-by-quiz'
                || req.path === '/profile'
                || req.path === '/history'
                || req.path === '/quiz-submit'
            ) {
                return next()
            } else {
                return res.status(403).json({
                    EC: -1,
                    DT: '',
                    EM: 'Bạn không có quyền truy cập trang này!'
                })
            }
        }
        if (role === 'Admin') {
            next()
        } else {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: 'Bạn không có quyền truy cập trang admin !'
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user !'
        })
    }
}

module.exports = {
    createAccess_tokenJWT,
    createRefresh_token,
    verifyToken,
    checkUserJWT,
    checkUserPermission
}