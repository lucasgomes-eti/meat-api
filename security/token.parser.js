const User = require('../users/users.model')
const jwt = require('jsonwebtoken')
const environment = require('../common/environment')

const tokenParser = (req, resp, next) => {
    const token = extractToken(req)
    if (token) {
        jwt.verify(token, environment.security.apiSecret, applyBearer(req, next))
    } else {
        next()
    }
}

module.exports = tokenParser

function extractToken(req) {
    const authorization = req.header('Authorization')
    if (authorization) {
        const parts = authorization.split(' ')
        if (parts.length === 2 && parts[0] === 'Bearer') {
            return parts[1]
        } else {
            return undefined
        }
    }
}

function applyBearer(req, next) {
    return (error, decoded) => {
        if (decoded) {
            const email = decoded.sub
            User.findOne({ email })
                .then(user => {
                    if (user) {
                        req.authenticated = user
                    }
                    next()
                })
                .catch(next)
        } else {
            next()
        }
    }
}