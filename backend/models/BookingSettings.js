const mongoose = require('mongoose')
const BookingSettingsSchema = mongoose.Schema({
    lunch:{
        type:Boolean,
        required:true,
    },
    startingHour:{
        type:String,
        required:true,
    },
    closingHour:{
        type:String,
        required:true,
    },
    intervalBetweenServices:{
        type:String,
        required:true,
    },
    eatingTime:{
        type:String,
        require:true,
    },
},
{timestamps: true})

module.exports = mongoose.model('BookingSettings', BookingSettingsSchema)