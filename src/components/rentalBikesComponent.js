import React, {Component} from 'react';
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
            <label>{props.bike.rentedTime}h</label>
            <label>/</label>
            <label>Total: { (props.bike.price * props.bike.rentedTime).toFixed(2)} $</label>
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
        this.state = {bikes: []};
    }

    componentDidMount = async () => {
        try {
            const res = await axios.get('/rentBike/');
            this.setState({
                bikes: res.data.data.bikes.filter(el => el.rent === true)
            });
            this.totalPrice();

        } catch (err) {
            console.log(`Error: ${err}`);
        }
    }

    totalPrice = () => {
        const arrPrice = this.state.bikes.map(el=> el.price * el.rentedTime );
        console.log(arrPrice);

        const totalPrice = (arrPrice.reduce((sum,el) => {
            return sum + el
        })).toFixed(2);
        console.log(totalPrice);

        this.setState({
            totalPrice: totalPrice
        });
    }

    cancelRentBike = async (id, e) => {
        e.preventDefault();
        const bike = { rent: false}
        const result = await axios.patch('/rentBike/'+ id, bike);
        console.log(result.data);

        this.setState({
            bikes: this.state.bikes.filter(el => el._id !== id)
        });
    }


    bikesList = () => {
        return this.state.bikes.map(currentbike => {
            return <Bikes bike={currentbike} cancelRentBike={this.cancelRentBike} key={currentbike._id}/>
        })
    }


    render () {
        return(
            <div className="container">
                <h4 className="head">🤩  Your rent (Total: ${this.state.totalPrice})</h4>
                <h6 className="head"> All rented bikes are: {this.state.bikes.length}</h6>
                {this.bikesList()}
            </div>

        )
    }

}
