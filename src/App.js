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
        this.state = {bikes: []};

        this.addBike = this.addBike.bind(this);
        this.deleteBike = this.deleteBike.bind(this);
        this.rentBike = this.rentBike.bind(this);

    }

    addBike = async (bike) => {
        console.log(bike);

        const result = await axios.post('/rentBike/add', bike);
        console.log(result.data.data.bike);

        this.setState({
            bikes: this.state.bikes.concat([result.data.data.bike])
        });

        console.log(this.state.bikes);
    }

    deleteBike = async (id) => {
        const res = await axios.delete('/rentBike/'+ id);
        console.log(res.data);

        this.setState({
            bikes: this.state.bikes.filter(el => el._id !== id)
        });
        console.log(this.state.bikes);
    }

    rentBike = async (id, bike) => {
        const result = await axios.patch('/rentBike/' +id , bike);
        console.log(result.data);
    }


    componentDidMount() {
        this.getBikes();
    }

    getBikes = async() => {
        const res = await axios.get('/rentBike/');
        this.setState({
            bikes: res.data.data.bikes
        })
        console.log(this.state.bikes);
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
                <RentalBike bikes={this.state.bikes} ></RentalBike>
                <AvailRentalBike bikes={this.state.bikes} rentBike={this.rentBike} deleteBike={this.deleteBike}></AvailRentalBike>
            </div>
        );
    }
}
export default App;
