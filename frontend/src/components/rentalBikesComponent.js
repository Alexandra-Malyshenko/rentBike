import React, {Component} from 'react';

const Bikes = props => (
    <div className="container container-rent-avail">
        <div className="col-md-12 my-auto item">
            <label>{props.bike.name}</label>
            <label>/</label>
            <label>{props.bike.bikeType}</label>
            <label>/</label>
            <label>$ {(props.bike.price / 100).toFixed(2)}</label>
            <label>/</label>
            <label>{props.bike.rentedTime}h</label>
            <label>/</label>
            <label>Total: { (props.bike.rentedPrice / 100).toFixed(2)} $</label>
            <div className="button-mix">
                <button type="button"  className="btn btn-danger button-cancel"
                        onClick={(e) => { props.cancelRentBike(props.bike._id, e) }}>Cancel rent
                </button>
            </div>
        </div>
    </div>
)

export default class RentalBike extends Component {

    constructor(props) {
        super(props);

        this.cancelRentBike = this.cancelRentBike.bind(this);
        this.state = {totalPrice: 0};

    }

    cancelRentBike = async (id, e) => {
        e.preventDefault();
        this.props.cancelRent(id);
    }

    bikesList = () => {
        return this.props.rentalBikes.map(currentbike => {
            return <Bikes bike={currentbike} cancelRentBike={this.cancelRentBike} key={currentbike._id}/>
        })
    }

    render () {
        return(
            this.bikesList()
        )
    }

}
