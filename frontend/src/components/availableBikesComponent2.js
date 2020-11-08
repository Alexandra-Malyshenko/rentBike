import React, {Component} from 'react';
import axios from "axios";

export default class AvailRentalBike extends Component {

    constructor(props) {
        super(props);

        this.deleteBike = this.deleteBike.bind(this);
        this.rentBike = this.rentBike.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        // this.state.time = 1;
        this.state = {bikes: []}
        // this.state= {bikes: this.props.bikes};
        console.log(this.props.bikes);
    }


    componentDidMount = async () => {
        try {
            const res = await axios.get('/rentBike/');

            const bikes_ = res.data.data.bikes;
            this.setState({
                bikes: bikes_.filter(el => el.rent === false)
            });

        } catch (err) {
            console.log(`Error: ${err}`);
        }

    }

    onChangeTime = (id, e) => {
        console.log(`${e.target.name} === ${id}`);
        if (e.target.name === id) {
            this.setState({
                time: e.target.value || 1,
                id: id
            });
        }
    }

    deleteBike = async (id) => {
        const res = await axios.delete('/rentBike/'+ id);
        console.log(res.data);
        this.setState({
            bikes: this.state.bikes.filter(el => el._id !== id)
        });
    }

    rentBike = async (id) => {
        console.log(this.state.time);
        let time = this.state.id === id ? this.state.time : 1;
        const bike = { rent: true, rentedTime: time };
        const result = await axios.patch('/rentBike/' +id , bike);
        console.log(result.data);

        this.setState({
            bikes: this.state.bikes.filter(el => el._id !== id),
            rentedTime: 1
        });
    }


    bikesList = () => {
        return this.state.bikes.map(currentbike => {
            return (
                <div className="container container-rent-avail" key={currentbike._id} >
                    <div className="col-md-12 my-auto item" >
                        <label>{currentbike.name}</label>
                        <label>/</label>
                        <label>{currentbike.bikeType}</label>
                        <label>/</label>
                        <label>$ {currentbike.price}</label>
                        <label>/</label>
                        <input type="number" name={currentbike._id} min="1" max="100" required
                               placeholder="1" defaultValue={1}
                               onChange={(e)=>this.onChangeTime(currentbike._id, e)}/>
                        <div className="button-mix">
                            <button type="button"  className="btn btn-info button-rent"
                                    onClick={() => { this.rentBike(currentbike._id) }}>Rent</button>
                            <button type="button"  className="btn btn-danger button-cancel"
                                    onClick={() => { this.deleteBike(currentbike._id) }}>Delete
                            </button>
                        </div>
                    </div>
                </div>
            )
        });
    }


    render () {
        return(
            <div className="container">
                <h4 className="head">🚲 Available Rent Bike</h4>
                {this.bikesList()}
            </div>
        )
    }

}
