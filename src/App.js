import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateBike from './components/createBikeComponent';
import RentalBike from './components/rentalBikesComponent';
import AvailRentalBike from './components/availableBikesComponent';


function App() {

  return (
    <div className="container">
        <div className="App-header">
            <h2>Awesome Bike Rental</h2>
        </div>
        <h4 className="head">🤑 Create Bike</h4>
        <CreateBike></CreateBike>
        <h4 className="head">🤩 Your rent (Total: ${})</h4>
        <RentalBike></RentalBike>
        <h4 className="head">🚲 Available Rent Bike</h4>
        <AvailRentalBike></AvailRentalBike>
        <AvailRentalBike></AvailRentalBike>
        <AvailRentalBike></AvailRentalBike>

    </div>

  );
}
export default App;
