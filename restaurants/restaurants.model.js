const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const restSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    menu: {
        type: [menuSchema],
        require: false,
        select: false,
        default: []
    }
})

const Restaurant = mongoose.model('Restaurant', restSchema)

module.exports = Restaurant