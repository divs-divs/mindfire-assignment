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

class AddAircraft extends Component {

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({autoForceUpdate: this});
    this.handleInputChange = this.handleInputChange.bind(this);

    this.initialState = {
      aircraft_number : "",
      airline : "",
      source : "",
      destination : "",
    }
    this.state = this.initialState;
  };
    
  handleInputChange(e) {
    let id = e.target.id
    switch (id) {
      case 'aircraft_number':
        this.setState({ aircraft_number: e.target.value });
        break;
        case 'airline':
        this.setState({ airline: e.target.value });
        break;
      case 'source':
        this.setState({ source: e.target.value });
        break;
      case 'destination':
        this.setState({ destination: e.target.value });
        break;
      default:
        break;
    }

  }

   async handleSubmit(event) {
    if (validate.validate(this.validator)) {
    $.ajax({
      url: "http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/aircrafts",
      type: "POST",
      data: { aircraft:{aircraft_no:this.state.aircraft_number,
             airline:this.state.airline,
             source:this.state.source,
             destination:this.state.destination
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
              <Label for="aircraft_number">Aircraft Name</Label>
              <Input type="text" className="text-capitalize" name="aircraft_number" onChange={this.handleInputChange} id="aircraft_number" placeholder="Enter aircraft number" required/>
            <div className="validationSpan">
                {this.validator.message('Aircraft Number', this.state.aircraft_number, validate.required)}
            </div>
            </div>
          </div>
        <div className="col-6">
            <div className="position-relative form-group">
              <Label for="airline">Airline</Label>
              <Input type="text" className="text-capitalize" name="airline" onChange={this.handleInputChange} id="airline" placeholder="Enter airline" required/>
            <div className="validationSpan">
                {this.validator.message('Airline', this.state.airline, validate.required)}
            </div>
            </div>
          </div>
        <div className="col-6">
            <div className="position-relative form-group">
              <Label for="source">Source</Label>
              <Input type="text" className="text-capitalize" name="source" onChange={this.handleInputChange} id="source" placeholder="Enter source" required/>
            <div className="validationSpan">
                {this.validator.message('Source', this.state.source, validate.required)}
            </div>
            </div>
          </div>
        <div className="col-6">
            <div className="position-relative form-group">
              <Label for="destination">Destination</Label>
              <Input type="text" className="text-capitalize" name="destination" onChange={this.handleInputChange} id="destination" placeholder="Enter destination" required/>
            <div className="validationSpan">
                {this.validator.message('Destination', this.state.destination, validate.required)}
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

export default AddAircraft;
