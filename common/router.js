const EventEmitter = require('events').EventEmitter
const NotFoundError = require('restify-errors').NotFoundError

class Router extends EventEmitter {
    applyRoutes(application) { }

    render(response, next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document)
                response.json(document)
            } else {
                throw new NotFoundError('Document not found')
            }
            return next()
        }
    }

    renderAll(response, next) {
        return (documents) => {
            if (documents) {
                documents.forEach(element => {
                    this.emit('beforeRender', element)
                });
                response.json(documents)
            } else {
                response.json([])
            }
            return next()
        }
    }
}

module.exports = Router