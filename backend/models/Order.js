const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customer: {
        type: String,
        required: true,
        maxlength: 60,
    },
    address: {
        type: String,
        required: true,
        maxlength: 200,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        default: 0, //0 commande actuelle  1 commande archivée
    },
    method: {
        type: Number,
        required: true,
    },
    pizzas: {
        type: [
            {
                title: {
                    type: String,
                    required: true,
                    maxlength: 60,
                },
                price: {//prix d'une pizza avec les suppléments
                    type: Number,
                    required: true,
                },
                size: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                removedIngredients: {
                    type: [String],
                    required: true,
                },
                extras: {
                    type: [String],
                    required: true,
                },
            },
        ],
    },
    pasta: {
        type: [
            {
                title: {
                    type: String,
                    required: true,
                    maxlength: 60,
                },
                price: {//prix d'une pizza avec les suppléments
                    type: Number,
                    required: true,
                },
                size: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                removedIngredients: {
                    type: [String],
                    required: true,
                },
                extras: {
                    type: [String],
                    required: true,
                },
            },
        ],
    },
    desserts: {
        type: [
            {
                title: {
                    type: String,
                    required: true,
                    maxlength: 60,
                },
                price: {//prix d'une pizza avec les suppléments
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
