const mongoose = require('mongoose')
const validateCPF = require('../common/validators')
const bcrypt = require('bcrypt')
const environment = require('../common/environment')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    sex: {
        type: String,
        required: false,
        enum: ['Male', 'Female']
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validateCPF,
            message: '{PATH}: Invalid CPF ({VALUE})'
        }
    }
})

const hashPassword = (obj, next) => {
    bcrypt.hash(obj.password, environment.security.saltOrRounds)
        .then(hash => {
            obj.password = hash
            next()
        })
        .catch(next)
}

const saveMidddleware = function (next) {
    if (!this.isModified('password')) {
        next()
    } else {
        hashPassword(this, next)
    }
}

const updateMiddleware = function (next) {
    if (!this.getUpdate().password) {
        next()
    } else {
        hashPassword(this.getUpdate(), next)
    }
}

userSchema.pre('save', saveMidddleware)
userSchema.pre('findOneAndUpdate', updateMiddleware)
userSchema.pre('update', updateMiddleware)

const User = mongoose.model('User', userSchema)

module.exports = User