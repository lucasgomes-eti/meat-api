const NotAuthorizedError = require('restify-errors').NotAuthorizedError
const User = require('../users/users.model')
const jwt = require('jsonwebtoken')
const environment = require('../common/environment')

const authenticate = (req, resp, next) => {
    const { email, password } = req.body
    User.findOne({ email }, '+password')
        .then(user => {
            if (user && user.matches(password)) {
                const token = jwt.sign({ sub: user.email, iss: 'meat-api' },
                    environment.security.apiSecret)
                resp.json({ name: user.name, email: user.email, accessToken: token })
                return next(false)
            } else {
                return NotAuthorizedError('Invalid Credentials')
            }
        })
        .catch(next)
}

module.exports = authenticate