const EventEmitter = require('events').EventEmitter
const NotFoundError = require('restify-errors').NotFoundError

class Router extends EventEmitter {
    applyRoutes(application) { }

    envelope(document) {
        return document
    }

    render(response, next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document)
                response.json(this.envelope(document))
            } else {
                throw new NotFoundError('Document not found')
            }
            return next()
        }
    }

    renderAll(response, next) {
        return (documents) => {
            if (documents) {
                documents.forEach((element, index, array) => {
                    this.emit('beforeRender', element)
                    array[index] = this.envelope(element)
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