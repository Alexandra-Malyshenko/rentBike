import './App.css';
import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateBike from './components/createBikeComponent';
import RentalBike from './components/rentalBikesComponent';
import AvailRentalBike from './components/availableBikesComponent';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bikes: [],
            rentalBikes: [],
            availableRentBikes: []
        };

        this.addBike = this.addBike.bind(this);
        this.deleteBike = this.deleteBike.bind(this);
        this.rentBike = this.rentBike.bind(this);
        this.cancelRent = this.cancelRent.bind(this);

    }

    componentDidMount = async () => {
        const result = await axios.get('/rentBike/');
        this.setState({
            bikes: result.data.data.bikes,
            availableRentBikes: result.data.data.bikes.filter(el => el.rent === false),
            rentalBikes: result.data.data.bikes.filter(el => el.rent === true),
        })
    }

    // Method for Total price in RentalBikes List
    totalPrice = () => {
        const arr = this.state.rentalBikes;
        if (arr.length > 0) {
            const arrPrice = arr.map(el=> el.rentedPrice / 100 );

            const totalPrice = (arrPrice.reduce((sum,el) => {
                return sum + el
            })).toFixed(2);

            return totalPrice;
        }
    }

    addBike = async (bike) => {
        const result = await axios.post('/rentBike/add', bike);
        console.log(result);

        this.setState({
            availableRentBikes: this.state.availableRentBikes.concat([result.data.data.bike]),
        });
    }

    deleteBike = async (id) => {
        await axios.delete('/rentBike/'+ id);

        this.setState({
            availableRentBikes: this.state.availableRentBikes.filter(el => el._id !== id),
        });
    }

    rentBike = async (id, time) => {
        const bike = {
            rent: true,
            rentedTime: time
        }

        const result = await axios.patch('/rentBike/'+id , bike);

        this.setState({
            availableRentBikes: this.state.availableRentBikes.filter(el => el._id !== id),
            rentalBikes: this.state.rentalBikes.concat([result.data.bike]),
        });
    }

    cancelRent = async (id) => {

        const result = await axios.patch('/rentBike/'+ id, {rent: false});

        this.setState({
            availableRentBikes: this.state.availableRentBikes.concat([result.data.bike]),
            rentalBikes: this.state.rentalBikes.filter(el => el._id !== id)
        });
    }


    render() {
        return (
            <div className="container wrapper">
                <div className="App-header">
                    <h2>Awesome Bike Rental</h2>
                </div>
                <div className="container">
                    <h4 className="head">🤑  Create Bike</h4>
                    <div className="container container-inner">
                        <div className="col-md-12 mrgnbtm">
                            <CreateBike addBike={this.addBike}></CreateBike>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <h4 className="head">🤩  Your rent (Total: ${this.totalPrice()})</h4>
                    <h6 className="head"> All rented bikes are: {this.state.rentalBikes.length}</h6>
                    <RentalBike rentalBikes={this.state.rentalBikes} cancelRent={this.cancelRent}></RentalBike>
                </div>

                <div className="container">
                    <h4 className="head">🚲 Available Rent Bike</h4>
                    <h6 className="head"> All available bikes are: {this.state.availableRentBikes.length}</h6>
                    <AvailRentalBike availableRentBikes={this.state.availableRentBikes} rentBike={this.rentBike} deleteBike={this.deleteBike}></AvailRentalBike>
                </div>
            </div>
        );
    }
}
export default App;

