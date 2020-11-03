import React from 'react'


const RentalBike = () => {

    return(
        <div className="container container-rental">
            <div className="col-md-12 my-auto">
                <label>Bike Name</label>
                <label>/</label>
                <label>Bike Type</label>
                <label>/</label>
                <label>$ 12.99</label>
                <button type="button"  className="btn btn-danger button-cancel-rent">Cancel Rent</button>
            </div>

        </div>

    )
}

export default RentalBike;