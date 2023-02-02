const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('Connecting to: ', url)
mongoose.connect(url)
    .then(() => console.log('Connected to MongoDb'))
    .catch(error => console.log(error.message))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        required: true,
    },
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)