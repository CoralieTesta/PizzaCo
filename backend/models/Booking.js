const mongoose = require('mongoose')

const schema = mongoose.Schema({
    date: {type: String, required : true},
    time: {type: String, required : true},
    number:{type:Number, require:true},//number of people
    surname: {type: String, required : true},
    name: {type: String, required : true},
    email: {type: String, required : true},
    tel: {type: String, required : true},
    status: {type: String, required : true},
})

module.exports = mongoose.model('Booking', schema)