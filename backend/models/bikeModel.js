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
        default: 'city',
        enum: ['city' ,'road', 'mountain', 'electric', 'city-women', 'kids', 'cyclocross'],
    },
    price: {
        type: Number,
        default: 12.99
    },
    rent: {
        type: Boolean,
        default: false
    }
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;