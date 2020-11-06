import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateBike from './components/createBikeComponent';
import RentalBike from './components/rentalBikesComponent';
import AvailRentalBike from './components/availableBikesComponent';
import axios from "axios";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {bikes: [],
            rentalBikes: [],
            availableRentBikes: []};

        this.addBike = this.addBike.bind(this);
        this.deleteBike = this.deleteBike.bind(this);
        this.rentBike = this.rentBike.bind(this);

    }

    componentDidMount = async () => {
        const res = await axios.get('/rentBike/');
        this.setState({
            bikes: res.data.data.bikes,
            availableRentBikes: res.data.data.bikes.filter(el => el.rent === false),
            rentalBikes: res.data.data.bikes.filter(el => el.rent === true),
        })
    }


    addBike = async (bike) => {

        const result = await axios.post('/rentBike/add', bike);
        this.setState({
            availableRentBikes: this.state.availableRentBikes.concat([result.data.data.bike]),
        });
        console.log(this.state.bikes);
    }

    deleteBike = async (id) => {
        const res = await axios.delete('/rentBike/'+ id);
        console.log(res.data);

        this.setState({
            availableRentBikes: this.state.availableRentBikes.filter(el => el._id !== id),
        });
    }

    rentBike = async (id, time) => {
        let newBikePrice = 0;
        const res = await axios.get('/rentBike/'+ id);
        if (time >= 20) {
            newBikePrice = ((res.data.bike.price * time) / 2).toFixed(2);
        } else {
            newBikePrice = (res.data.bike.price * time).toFixed(2);
        }
        const bike = {
            rent: true,
            price: newBikePrice,
            rentedTime: time
        }
        const result = await axios.patch('/rentBike/'+id , bike);
        console.log(result.data);

        this.setState({
            availableRentBikes: this.state.availableRentBikes.filter(el => el._id !== id),
            rentalBikes: this.state.rentalBikes.concat([result.data.bike]),
        });
    }

    cancelRent = async (id) => {
        const result = await axios.patch('/rentBike/'+ id, {rent: false});
        console.log(result.data);

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
                <RentalBike rentalBikes={this.state.rentalBikes} cancelRent={this.cancelRent}></RentalBike>
                <AvailRentalBike availableRentBikes={this.state.availableRentBikes} rentBike={this.rentBike} deleteBike={this.deleteBike}></AvailRentalBike>
            </div>
        );
    }
}
export default App;

