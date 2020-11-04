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
            <div className="button-mix">
                <button type="button"  className="btn btn-info button-rent">Rent</button>
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

        // this.onChangeRent = this.onChangeRent.bind(this);
        this.deleteBike = this.deleteBike.bind(this);

        this.state = {bikes: []};

    }
    componentDidMount = async () => {
        try {
            const res = await axios.get('/rentBike/');

            this.setState({
                bikes: res.data.data.bikes
            });
            console.log(this.state.bikes);

        } catch (err) {
            console.log(`Error: ${err}`);
        }

    }

    deleteBike = async (id) => {
        const res = await axios.delete('/rentBike/'+ id);
        console.log(res.data);
        this.setState({
            bikes: this.state.bikes.filter(el => el._id !== id)
        });
    }
    // onChangeRent = (e) => {
    //     this.state.rent = true;
    // }

    // rentBike = async (id) => {
    //     const bike =  {
    //         rent: this.state.rent,
    //         _id: id
    //     }
    //     const res = await axios.patch(`/`, bike);
    //     console.log(res.data);
    //     this.setState({
    //         bikes: this.state.bikes.filter(el => el._id !== id)
    //     });
    // }



    bikesList = () => {
        return this.state.bikes.map(currentbike => {
            return <Bikes bike={currentbike} deleteBike={this.deleteBike} key={currentbike._id}/>
        })
    }


    render () {
        return(
            this.bikesList()
        )
    }

}
