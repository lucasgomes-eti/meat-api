const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        maxlength: 5
    },
    comment: {
        type: String,
        required: true,
        maxlength: 500
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review 