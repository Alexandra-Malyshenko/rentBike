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
        const bikePrice = req.body.price;

        const new_bike = await Bike.create({
            name: bikeName,
            bikeType: bikeType,
            price: bikePrice
        });

        await res.status(201).json({
            status: "success",
            data: {
                tour: new_bike,
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
        const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
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