import React from 'react'
import Dropdown  from 'react-dropdown';
import 'react-dropdown/style.css';

const CreateBike = () => {

    return(
        <div className="container container-inner">
             {/*<div className="row">*/}
                <div className="col-md-12 mrgnbtm">
                    <form>
                        <div className="row">
                            <div className="form-group col-md-3">
                                <label>Bike Name</label>
                                <input type="text" className="form-control" name="name" id="name" aria-describedby="emailHelp" placeholder="Bike Name" />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Bike Type</label>
                                <Dropdown options={['city', 'mountain', 'kids']} value={'city'} placeholder="Select an option" />
                                    {/*<input type="text" className="form-control" name="biketype" id="biketype" placeholder="Bike Type" />*/}
                            </div>
                            <div className="form-group col-md-3">
                                <label>Rent Price </label>
                                <input type="text" className="form-control" name="price" id="price" placeholder="Rent Price" />
                            </div>
                            <div className="form-group col-md-3">
                                <button type="button"  className="btn btn-success button-submit">Submit rent</button>
                            </div>
                        </div>

                    </form>
                </div>
         </div>
    )
}

export default CreateBike;