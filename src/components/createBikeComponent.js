import React, {Component} from 'react'
import 'react-dropdown/style.css';

export default class CreateBike extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeBikeType = this.onChangeBikeType.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);

        this.state = {
            name: '',
            bikeType: '',
            price: 0,
        }

        this.state.bikes = ['city', 'city-women', 'kids', 'mountain']
    }

    componentDidMount() {
        this.setState({
            bikes: ['city', 'city-women', 'kids', 'mountain'],
        })
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onChangeBikeType = (e) =>{
        this.setState({
            bikeType: e.target.value
        })
    }

    onChangePrice = (e) => {
        this.setState({
            price: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const bike = {
            name: this.state.name,
            bikeType: this.state.bikeType,
            price: this.state.price
        }

        console.log(bike);

        this.setState({
            name: '',
            bikeType:'',
            price: 0
        });

    }

    render() {
        return(
            <div className="container container-inner">
                <div className="col-md-12 mrgnbtm">
                    <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="form-group col-md-3">
                                <label>Bike Name</label>
                                <input type="text" name="name" id="name" aria-describedby="emailHelp" placeholder="Bike name"
                                       required
                                       className="form-control"
                                       value={this.state.name}
                                       onChange={this.onChangeName} />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Bike Type</label>
                                <select
                                        required
                                        className="form-control"
                                        value={this.state.bikeType}
                                        onChange={this.onChangeBikeType}>
                                    {
                                        this.state.bikes.map(function(bike) {
                                            return <option
                                                key={bike}
                                                value={bike}>{bike}
                                            </option>;
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label>Rent Price (per 1 hour)</label>
                                <input type="text" name="price" id="price" placeholder="Rent Price"
                                       required
                                       className="form-control"
                                       value={this.state.price}
                                       onChange={this.onChangePrice}  />
                            </div>
                            <div className="form-group col-md-3">
                                <button type="submit"  className="btn btn-success button-submit">Submit rent</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


}
