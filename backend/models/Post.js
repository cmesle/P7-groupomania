const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    creationDate: { type: Date, required: true },
    title: { type: String },
    text: { type: String },
    imageUrl: { type: String },
    likes: { type: Number, default: 0 },
    usersLiked: { type: [String], default: [] }
})

module.exports = mongoose.model('Post', postSchema)