import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

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

        this.state = {totalPrice: 0};
        this.state = {bikes: []};
    }


    componentDidMount() {
        setTimeout(()=>{
            console.log(this.props.bikes);
            this.setState({
                bikes: this.props.bikes.filter(el => el.rent === false)
            })
        }, 500);
        console.log(this.state.bikes);

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
        this.setState({
            bikes: this.state.bikes.filter(el => el._id !== id)
        });
    }

    rentBike = async (id, e) => {
        e.preventDefault();
        let time = this.state.id === id ? this.state.time : 1;
        let newBikePrice = 0;

        const res = await axios.get('/rentBike/' +id);

        if (time >= 24) {
            newBikePrice = ((res.data.bike.price * time) / 2).toFixed(2);
        } else {
            newBikePrice = (res.data.bike.price * time).toFixed(2);
        }
        const bike = {
            rent: true,
            price: newBikePrice,
            rentedTime: time,
        }

        this.props.rentBike(id, bike);

        this.setState({
            bikes: this.state.bikes.filter(el => el._id !== id),
            rentedTime: 1
        });
    }


    bikesList = () => {
        return this.state.bikes.map(currentbike => {
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
                <h6 className="head"> All available bikes are: {this.state.bikes.length}</h6>
                {this.bikesList()}
            </div>
        )
    }

}

AvailRentalBike.propTypes = {
    deleteBike: PropTypes.func.isRequired,
    rentBike: PropTypes.func.isRequired,
    bikes: PropTypes.arrayOf(PropTypes.object).isRequired
}
