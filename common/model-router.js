const Router = require('./router')
const mongoose = require('mongoose')
const NotFoundError = require('restify-errors').NotFoundError

class ModelRouter extends Router {
    constructor(model) {
        super()
        this.model = model
        this.basePath = `/${model.collection.name}`
    }

    prepare = (query) => {
        return query
    }

    envelope(document) {
        let resource = Object.assign({ _links: {} }, document.toJSON())
        resource._links.self = `${this.basePath}/${resource._id}`
        return resource
    }

    validateId = (req, resp, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            next(new NotFoundError('Document not found'))
        } else {
            next()
        }
    }

    findAll = (req, resp, next) => {
        this.prepare(this.model.find())
            .then(this.renderAll(resp, next))
            .catch(next)
    }

    findById = (req, resp, next) => {
        this.prepare(this.model.findById(req.params.id))
            .then(this.render(resp, next))
            .catch(next)
    }

    save = (req, resp, next) => {
        let document = new this.model(req.body)
        resp.status(201)
        document.save()
            .then(this.render(resp, next))
            .catch(next)
    }

    replace = (req, resp, next) => {
        const options = { override: true, runValidators: true }
        this.model.updateOne({ _id: req.params.id }, req.body, options)
            .exec().then(result => {
                if (result.n) {
                    return this.prepare(this.model.findById(req.params.id))
                } else {
                    throw new NotFoundError('Document not found')
                }
            }).then(this.render(resp, next))
            .catch(next)
    }

    update = (req, resp, next) => {
        const options = { new: true, runValidators: true }
        this.prepare(this.model.findByIdAndUpdate(req.params.id, req.body, options))
            .then(this.render(resp, next))
            .catch(next)
    }

    delete = (req, resp, next) => {
        this.model.deleteOne({ _id: req.params.id })
            .exec().then(cmdResult => {
                if (cmdResult.n) {
                    resp.send(204)
                } else {
                    throw new NotFoundError('Document not found')
                }
                return next()
            })
            .catch(next)
    }
}

module.exports = ModelRouter