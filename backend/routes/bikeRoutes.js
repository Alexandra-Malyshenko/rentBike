const express = require('express');
const bikeController = require('./../controller/bikeController');

const router = express.Router();

router
    .route('/')
    .get(bikeController.getAllBikes);

router
    .route('/:id')
    .get(bikeController.getBike)
    .patch(bikeController.updateRentBike)
    .delete(bikeController.deleteBike);


router
    .route('/add')
    .post(bikeController.createBike);

module.exports = router;