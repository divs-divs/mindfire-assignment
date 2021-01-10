import React, { Component } from 'react';
import { Label, Input, InputGroupAddon, InputGroup, Button} from 'reactstrap';
import "react-toastify/dist/ReactToastify.css";
import toastService from "../../../../utils/toastnotification";
import { ToastContainer } from "react-toastify";
import { Multiselect } from 'multiselect-react-dropdown';
import SimpleReactValidator from 'simple-react-validator';
import validate from "../../../../utils/validations";
import PropTypes from "prop-types";
import $ from 'jquery';

const toastservice = new toastService();

class AddAirport extends Component {

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({autoForceUpdate: this});
    this.handleInputChange = this.handleInputChange.bind(this);

    this.initialState = {
      airport_name : "",
      fuel_capacity : "",
      fuel_available : "",
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
    if (validate.validate(this.validator)) {
    $.ajax({
      url: "http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/airports",
      type: "POST",
      data: { airport:{name:this.state.airport_name,
             capacity:parseInt(this.state.fuel_capacity),
             available:parseInt(this.state.fuel_available)
    }},
      success: response => {
        this.props.togglePopup();
        this.props.refresh();
      }
    });
    }
}

  render() {
    return (
      <div>
        <ToastContainer />
        <div className="my-0 position-relative row form-group">
          <div className="col-6">
            <div className="position-relative form-group">
              <Label for="airport_name">Airport Name</Label>
              <Input type="text" className="text-capitalize" name="airport_name" onChange={this.handleInputChange} id="airport_name" placeholder="Enter airport name" required/>
            <div className="validationSpan">
                {this.validator.message('Airport name', this.state.airport_name, validate.required)}
            </div>
            </div>
          </div>
          <div className="col-6">
            <div className="position-relative form-group">
              <Label for="fuel_capacity">Fuel Capacity</Label>
              <Input type="number" className="text-capitalize" name="fuel_capacity" onChange={this.handleInputChange} id="fuel_capacity" placeholder="Enter Fuel Capacity" required/>
            <div className="validationSpan">
                {this.validator.message('Fuel Capacity', this.state.fuel_capacity, validate.required)}
            </div>
            </div>
          </div>
        </div>
        <div className="my-0 position-relative row form-group">
          <div className="col-6">
            <div className="position-relative form-group">
              <Label for="fuel_available">Fuel Avaiable</Label>
              <Input type="number" className="form-control" name="emfuel_availableail" onChange={this.handleInputChange} id="fuel_available" placeholder="Enter fuel available" required/>
             <div className="validationSpan">
                {this.validator.message('Fuel Available', this.state.fuel_available, validate.required)}
            </div>
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
