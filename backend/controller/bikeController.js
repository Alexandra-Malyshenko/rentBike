const Bike = require('./../models/bikeModel');

exports.getAllBikes = async (req, res) => {
    try {
        const bikes = await Bike.find();

        await res.status(200).json({
            status: 'success',
            result: bikes.length,
            data: {
                bikes
            }
        });
    } catch (err) {
        await res.status(400).json({
            status: "failed",
            message: `Error: ${err}`
        });
    }

}

exports.createBike = async (req, res) => {
    try {
        const bikeName = req.body.name;
        const bikeType = req.body.bikeType;
        const bikePrice = (req.body.price * 100).toFixed(2);


        const new_bike = await Bike.create({
            name: bikeName,
            bikeType: bikeType,
            price: bikePrice,
            rentedTime: 1,
            rentedPrice: bikePrice
        });

        await res.status(201).json({
            status: "success",
            data: {
                bike: new_bike,
            }
        });
    } catch (err) {
        await res.status(400).json({
            status: "failed",
            message: `Error: ${err}`
        });
    }

}

exports.getBike = async (req, res) => {
    try {
        const bike = await Bike.findById(req.params.id);

        await res.status(200).json({
            status: 'success',
            bike
        });

    } catch (err) {
        await res.status(404).json({
            status: 'failed',
            message: 'There is no bike by this ID'
        });
    }
}

exports.deleteBike = async (req, res) => {
    try {
        const bike = await Bike.findByIdAndDelete(req.params.id, req.body);

        await res.status(204).json({
            status: 'success',
            data: null,
        });

    } catch (err) {
        await res.status(404).json({
            status: 'failed',
            message: 'There is no bike by this ID'
        });
    }
}

exports.updateRentBike = async (req, res) => {
    try {
        // 1. From request find out if user want to rent (true) or want to cancel rent (false)
        const rent = req.body.rent;
        // 2. if rent true we want to set a time for rent
        const rentedTime = rent ? req.body.rentedTime: 1;

        // 3. Find out what price have bike (by ID ) what we want ro rent

        const bikeBY = await Bike.findById(req.params.id);
        let rentedPrice = rent ? bikeBY.price * rentedTime  : 0;

        if (rentedTime > 20) {
            rentedPrice = (rentedPrice / 2).toFixed(2);
        } else {
            rentedPrice = rentedPrice.toFixed(2);
        }

        // 4. Update data
        const bike = await Bike.findByIdAndUpdate(req.params.id, {rent, rentedTime, rentedPrice}, {
            new: true,
            runValidators: true
        });

        await res.status(200).json({
            status: 'success',
            bike
        });

    } catch (err) {
        await res.status(404).json({
            status: 'failed',
            message: 'There is no bike by this ID'
        });
    }
}