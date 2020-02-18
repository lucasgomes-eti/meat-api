const restify = require('restify')
const environment = require('../common/environment')
const mongoose = require('mongoose')
const mergePatchBodyParser = require('./merge-patch.parser')
const handleError = require('./error.handler')

class Server {
    initializeDb() {
        mongoose.Promise = global.Promise
        return mongoose.connect(environment.db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                })

                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())
                this.application.use(mergePatchBodyParser)

                // routes

                for (let router of routers) {
                    router.applyRoutes(this.application)
                }

                this.application.listen(environment.server.port, () => {
                    resolve(this.application)
                })

                this.application.on('restifyError', handleError)
            } catch (error) {
                reject(error)
            }
        })
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() =>
            this.initRoutes(routers).then(() => this))
    }
}

module.exports = Server