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
        setTimeout(()=>{
            this.setState({
                bikes: this.props.bikes.filter(el => el.rent === true)
            });
        }, 500);

    }

    totalPrice() {
        const arr = this.props.bikes.filter(el => el.rent === true);
        if (arr.length > 0) {
            const arrPrice = arr.map(el=> el.price * el.rentedTime );

            const totalPrice = (arrPrice.reduce((sum,el) => {
                return sum + el
            })).toFixed(2);

            return totalPrice;
        }

    }

    cancelRentBike = async (id, e) => {
        e.preventDefault();
        this.props.cancelRent(id);
        let update = true;
        let bikes = await this.props.cancelRent(id, update);
        console.log(bikes);
        this.getBikes(bikes);

    }

    getBikes(bikes) {
        if (bikes) {
            return bikes.filter(el => el.rent === true);
        } else {
            return this.props.bikes.filter(el => el.rent === true);
        }
    }


    bikesList = () => {
        return this.getBikes().map(currentbike => {
            return <Bikes bike={currentbike} cancelRentBike={this.cancelRentBike} key={currentbike._id}/>
        })
    }


    render () {
        return(
            <div className="container">
                <h4 className="head">🤩  Your rent (Total: ${this.totalPrice()})</h4>
                <h6 className="head"> All rented bikes are: {this.getBikes().length}</h6>
                {this.bikesList()}
            </div>

        )
    }

}
