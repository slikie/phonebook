const mongoose = require('mongoose')
const process = require('process')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: String,
})

personSchema.path('number').validate(function (value) {
    if (value.length < 8) {
        return false
    }

    const regex = /^[0-9]{2,3}-[0-9]{7,}$/
    return regex.test(value)
}, 'Invalid phone number')

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)