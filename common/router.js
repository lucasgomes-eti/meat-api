const EventEmitter = require('events').EventEmitter
const NotFoundError = require('restify-errors').NotFoundError

class Router extends EventEmitter {
    applyRoutes(application) { }

    envelope(document) {
        return document
    }

    envelopeAll(documents, options = {}) {
        return documents
    }

    render(response, next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document)
                response.json(this.envelope(document))
            } else {
                throw new NotFoundError('Document not found')
            }
            return next(false)
        }
    }

    renderAll(response, next, options = {}) {
        return (documents) => {
            if (documents) {
                documents.forEach((element, index, array) => {
                    this.emit('beforeRender', element)
                    array[index] = this.envelope(element)
                });
                response.json(this.envelopeAll(documents, options))
            } else {
                response.json(this.envelopeAll([]))
            }
            return next(false)
        }
    }
}

module.exports = Router