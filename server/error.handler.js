const handleError = (req, resp, err, done) => {
    err.toJSON = () => ({
        message: err.message
    })
    switch (err.name) {
        case 'MongoError':
            if (err.code === 11000) {
                err.statusCode = 400
            }
            break;
        case 'ValidationError':
            err.statusCode = 400
            const messages = []
            for (let name in err.errors) {
                messages.push({ message: err.errors[name].message })
            }
            err.toJSON = () => ({
                errors: messages
            })
            break;
        default:
            break;
    }
    done()
}

module.exports = handleError