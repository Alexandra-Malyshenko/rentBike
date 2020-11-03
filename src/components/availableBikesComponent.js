import React from 'react'


const AvailRentalBike = () => {

    return(
        <div className="container container-rent-avail">
            <div className="col-md-12 my-auto item">
                <label>Bike Name</label>
                <label>/</label>
                <label>Bike Type</label>
                <label>/</label>
                <label>$ 12.99</label>
                <div className="button-mix">
                    <button type="button"  className="btn btn-info button-rent">Rent</button>
                    <button type="button"  className="btn btn-danger button-cancel">Delete</button>
                </div>
            </div>

        </div>

    )
}

export default AvailRentalBike;