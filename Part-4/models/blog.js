const mongoose = require('mongoose')
const {info, error} = require('../utils/logger')


mongoose.set('strictQuery', false)

const blogSchema = new mongoose.Schema({
    title: {
        type: String, 
        minLength: 2,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
    }   
})

const Blog = mongoose.model("Blog", blogSchema)

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)