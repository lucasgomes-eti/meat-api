const request = require('supertest')
const faker = require('faker')
// const Server = require('../server/server')
// const environment = require('../common/environment')
// const usersRouter = require('./users.router')
// const User = require('./users.model')

// let server
let address = 'http://localhost:3000'

// beforeAll(() => {
//     environment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db'
//     environment.server.port = process.env.SERVER_PORT || 3001
//     address = `http://localhost:${environment.server.port}`
//     server = new Server()
//     return server.bootstrap([usersRouter])
//         .then(() => User.remove({}).exec())
//         .catch(console.error)
// })

test('get /users', () => {
    return request(address)
        .get('/users')
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.items).toBeInstanceOf(Array)
        })
        .catch(fail)
})

test('post /users', () => {
    fakeUser = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }
    return request(address)
        .post('/users')
        .send(fakeUser)
        .then(response => {
            expect(response.status).toBe(201)
            expect(response.body._id).toBeDefined()
            expect(response.body.name).toBe(fakeUser.name)
            expect(response.body.email).toBe(fakeUser.email)
            expect(response.body.password).toBeUndefined()
        })
        .catch(fail)
})

// afterAll(() => {
//     return server.shutdown()
// })