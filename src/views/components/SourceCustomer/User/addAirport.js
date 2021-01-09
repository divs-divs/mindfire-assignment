import React, { Component } from 'react';
import { Label, Input, InputGroupAddon, InputGroup, Button} from 'reactstrap';
import HttpTransferService from "../../../../utils/httptransfer";
import "react-toastify/dist/ReactToastify.css";
import toastService from "../../../../utils/toastnotification";
import { ToastContainer } from "react-toastify";
import { Multiselect } from 'multiselect-react-dropdown';
import constants from '../../../../constants/constant';
import constant from '../../../../constants/constant';
import SimpleReactValidator from 'simple-react-validator';
import validate from "../../../../utils/validations";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {  withTranslation } from "react-i18next";
import PropTypes from "prop-types";

const httptransfer = new HttpTransferService();
const toastservice = new toastService();

class AddAirport extends Component {

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({autoForceUpdate: this});
    this.handleInputChange = this.handleInputChange.bind(this);

    this.initialState = {
      airport_name : "",
      fuel_capacity : 0,
      fuel_available : 0,
    }
    this.state = this.initialState;
  };
    
  handleInputChange(e) {
    let id = e.target.id
    switch (id) {
      case 'airport_name':
        this.setState({ airport_name: e.target.value });
        break;
        case 'fuel_capacity':
        this.setState({ fuel_capacity: e.target.value });
        break;
      case 'fuel_available':
        this.setState({ fuel_available: e.target.value });
        break;
      default:
        break;
    }

  }

   async handleSubmit(event) {
     var data  = new FormData(event)
      await fetch('http://localhost:3001/api/v1/airports',{
      method:"POST",
      mode:"cors",
      body:JSON.stringify({airport_params:{airport_name:this.state.airport_name,
      fuel_capacity:parseInt(this.state.fuel_capacity),
    fuel_available:parseInt(this.state.fuel_available)
    }})
    }).
      then(response => response.json())
    .then(console.log("Yaaaaaaaaaaaaa"));
    }

  render() {
    return (
      <div>
        <ToastContainer />
        <div className="my-0 position-relative row form-group">
          <div className="col-6">
            <div className="position-relative form-group">
              <Label for="first_name">Airport Name</Label>
              <Input type="text" className="text-capitalize" name="airport_name" onChange={this.handleInputChange} id="airport_name" placeholder="Enter airport name" required/>
            </div>
          </div>
          <div className="col-6">
            <div className="position-relative form-group">
              <Label for="fuel_capacity">Fuel Capacity</Label>
              <Input type="number" className="text-capitalize" name="fuel_capacity" onChange={this.handleInputChange} id="fuel_capacity" placeholder="Enter Fuel Capacity" required/>
            </div>
          </div>
        </div>
        <div className="my-0 position-relative row form-group">
          <div className="col-6">
            <div className="position-relative form-group">
              <Label for="fuel_available">Fuel Avaiable</Label>
              <Input type="number" className="form-control" name="emfuel_availableail" onChange={this.handleInputChange} id="fuel_available" placeholder="Enter fuel available" required/>
            </div>
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary btn-md" onClick={(e) => this.handleSubmit(e)}>
            ADD
          </button>
        </div>
      </div>
    )
  }
}

export default AddAirport;
