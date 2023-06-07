const mongoose = require('mongoose')
const pastaSchema = mongoose.Schema({
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
    prices:{
        type:[Number], //array that only includes numbers
        require:true,
    },
    ingredients:{
        type:[String],
        required:true,
    },
    extras:{
        type:[
            {
                text:{type:String, required:true}, 
                price:{type:Number, required:true}
            },
        ],
    },
},
{timestamps: true})

module.exports = mongoose.model('Pasta', pastaSchema)