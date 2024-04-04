const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/notebook?readPreference=primary&directConnection=true&ssl=false'

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('Connected to mongo successfully')
    })
}

module.exports = connectToMongo