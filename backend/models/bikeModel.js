const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bikeSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    bikeType: {
        type: String,
    },
    price: {
        type: Number,
        default: 1299
    },
    rent: {
        type: Boolean,
        default: false
    },
    rentedTime: {
        type: Number,
        default: 1
    },
    rentedPrice: {
        type: Number,
        default: 1299
    }
});

/// Price saved in cents. For example : 12.99 $ is 1299 cents.

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;