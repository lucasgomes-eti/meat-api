const environment = {
    server: { port: process.env.SERVER_PORT || 3000 },
    db: { url: process.env.DB_URL || 'mongodb://127.0.0.1:27017/meat-api' },
    security: { saltOrRounds: process.env.SALT_OR_ROUNDS || 10 }
}

module.exports = environment