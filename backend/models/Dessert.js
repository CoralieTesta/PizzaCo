const mongoose = require('mongoose')
const dessertSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:60,
    },
    desc:{
        type:String,
        required:true,
        maxlength:200,
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number, //array that only includes numbers
        require:true,
    },
},
{timestamps: true})

module.exports = mongoose.model('Dessert', dessertSchema)