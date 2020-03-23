const ForbiddenError = require('restify-errors').ForbiddenError

const authorize = (...profiles) => {
    return (req, resp, next) => {
        if(req.authenticated !== undefined && req.authenticated.hasAny(...profiles)) {
            next()
        } else {
            return next(new ForbiddenError('Permission denied'))
        }
    }
}

module.exports = authorize