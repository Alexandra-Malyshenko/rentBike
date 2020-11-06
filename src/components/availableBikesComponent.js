import React, {Component} from 'react';

const Bikes = props => (
    <div className="container container-rent-avail">
        <div className="col-md-12 my-auto item">
            <label>{props.bike.name}</label>
            <label>/</label>
            <label>{props.bike.bikeType}</label>
            <label>/</label>
            <label>$ {props.bike.price}</label>
            <label>/</label>
            <input type="number" name={props.bike._id} min="1" max="100" required
                   placeholder="1" defaultValue={1}
                   onChange={(e) => props.onChangeTime(props.bike._id, e)}/>
            <label></label>
            <label>hours</label>
            <div className="button-mix">
                <button type="button"  className="btn btn-info button-rent"
                        onClick={(e) => { props.rentBike(props.bike._id ,e) }}>Rent</button>
                <button type="button"  className="btn btn-danger button-cancel"
                        onClick={() => { props.deleteBike(props.bike._id) }}>Delete
                </button>
            </div>
        </div>
    </div>
)

export default class AvailRentalBike extends Component {

    constructor(props) {
        super(props);

        this.deleteBike = this.deleteBike.bind(this);
        this.rentBike = this.rentBike.bind(this);

        this.state = {  totalPrice: 0,
                        id: 0,
                        time: 0 };
    }

    onChangeTime = (id, e) => {
        if (e.target.name === id) {
            this.setState({
                time: e.target.value || 1,
                id: id
            });
        }
    }

    deleteBike = async (id) => {
        this.props.deleteBike(id);
    }

    rentBike = async (id, e) => {
        e.preventDefault();
        let time = this.state.id === id ? this.state.time : 1;
        this.props.rentBike(id, time);
    }

    bikesList = () => {
        return this.props.availableRentBikes.map(currentbike => {
            return <Bikes bike={currentbike}
                          rentBike={this.rentBike}
                          deleteBike={this.deleteBike}
                          key={currentbike._id}
                          onChangeTime={this.onChangeTime}
                          valueTime={this.state.time} />
            });
    }

    render () {
        return(
            <div className="container">
                <h4 className="head">🚲 Available Rent Bike</h4>
                <h6 className="head"> All available bikes are: {this.props.availableRentBikes.length}</h6>
                {this.bikesList()}
            </div>
        )
    }

}
