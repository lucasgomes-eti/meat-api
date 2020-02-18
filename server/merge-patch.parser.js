const restify = require('restify')
const BadRequestError = require('restify-errors').BadRequestError

const mpContentType = 'application/merge-patch+json'

const mergePatchBodyParser = ((req, resp, next) => {
    if (req.getContentType() === mpContentType && req.method === 'PATCH') {
        req.rawBody = req.body
        try {
            req.body = JSON.parse(req.body)
        } catch (error) {
            return next(new BadRequestError('Invalid content: ${error.message}'))
        }
    }
    return next()
})

module.exports = mergePatchBodyParser