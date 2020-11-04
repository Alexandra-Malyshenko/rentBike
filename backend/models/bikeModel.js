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
    },
    rentedAt: Date,
    rentedTime: {
        type: Number,
        default: 1
    }
});

bikeSchema.pre('save', function (next) {
    if (this.isModified('rent')) {
        this.rentedAt = Date.now() - 1000;
        next();
    } else {
        return next();
    }
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;