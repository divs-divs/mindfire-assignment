import React, { Component } from 'react';
import { Label, Input } from 'reactstrap';
import HttpTransferService from "../../../utils/httptransfer";
import SimpleReactValidator from 'simple-react-validator';
import validate from "../../../utils/validations";
import 'react-phone-input-2/lib/style.css';
import constant from '../../../constants/constant';
import {  withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const httptransfer = new HttpTransferService();

class AddSourceCustomer extends Component {

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({autoForceUpdate: this});
    this.handleInputChange = this.handleInputChange.bind(this);
  
    this.initialState = {
      name : "",
      type : "",
      state : "",
      email : "",
      city : "",
      pincode : "",
      contact:"",
      stateList: [],
      cityList: [],
      contacttype:"MOBILE",
      address_line_1: '',
      pan: '',
      fssai: ''
    }
    this.state = this.initialState;
  };

  handleInputChange(e, index, value) {
    e.persist();
    let id = e.target.id
    switch (id) {
      case 'name':
        this.setState({ name: e.target.value });
        break;
      case 'state':
        this.setState({ state: e.target.value  });
        this.getCity(e.target.value );
        break;
      case 'city':
        this.setState({ city:  e.target.value  });
        break;
      case 'pincode':
        this.setState({ pincode: e.target.value});
        break;
      case 'contact':
        this.setState({ contact: e.target.value });
        break;
      case 'address_line_1': 
        this.setState({ address_line_1: e.target.value });
        break;
      case 'type': 
        this.setState({ type: e.target.value });
        break;
      default:
        break;
    }
  }

  createUserJson() {
    var userJson = {
      name: validate.capitalizeText(this.state.name),
      type: this.state.type ? this.state.type : this.props.type,
      state: this.state.state,
      city_id: this.state.city,
      pincode: this.state.pincode,
      address_line_1: validate.capitalizeText(this.state.address_line_1),
      contacts: [
        {
          contact: this.state.contact,
          type: this.state.contacttype
        }
      ]
    }
    return userJson
  }

  SubmitAddCustomer(event) {
    if (validate.validate(this.validator)) {
      this.addEntity()
    }
  }
  
  addEntity(){
    var userJson = {}
   userJson = this.createUserJson()
    httptransfer.addSourceCustomerEntity(userJson)
      .then(response => {
          this.props.closeModal()
    });
  }


  componentDidMount() {
    this.getStateList()
  }

  getStateList () {
    httptransfer.getStateList()
      .then(response => {
        this.setState({
          stateList: response.data.states
        })
      })
  }

  getCity (state_id) {
    httptransfer.getCityList({state_id: [state_id]})
      .then(response => {
        this.setState({
          cityList: response.data.cities
        })
      })
  }

  render() {
    const {t}=this.props;
    let statesOptions = this.state.stateList.length ? 
      this.state.stateList.map(element => <option key={element.state_name} value={element.state_id}>{element.state_name}</option>) :
      []
    let cityOptions = this.state.cityList.length ? 
      this.state.cityList.map(element => <option key={element.city_name} value={element.city_id}>{element.city_name}</option>) :
      []
    return (
      <div>
        <ToastContainer/>
        <div className="position-relative form-group">
        <Label for="name">{t("NAME")}</Label>
          <Input type="text" className="text-capitalize" onChange={this.handleInputChange} id="name" placeholder="Enter your name" required/>
          {this.validator.message('name', this.state.name, 'required')}
        </div>
        <div className="position-relative form-group">
          <Label for="address_line_1">{t("ADDRESS")} </Label>
          <Input type="text"  onChange={this.handleInputChange} className="form-control" id="address_line_1" placeholder="Enter Address"/>
          {this.validator.message('address_line_1', this.state.address_line_1, validate.required)}
        </div>    
        <div className="my-0 position-relative row form-group">
          <div className="col-4">
            <div className="position-relative form-group">
              <Label for="state">{t("STATE")}</Label>
              <select id="state"  onChange={this.handleInputChange} className="form-control">
                <option defaultValue >Choose state</option>
                {statesOptions}
              </select>
              {this.validator.message('state', this.state.state, validate.required)}
            </div>
          </div>
          <div className="col-4">
            <div className="position-relative form-group">
              <Label for="city">{t("CITY")}</Label>
              <select disabled={cityOptions.length ? false : true} id="city"  onChange={this.handleInputChange} className="form-control">
                <option value="">Choose city</option>
                {cityOptions}
              </select>
              {this.validator.message('city', this.state.city, validate.required)}
            </div>
          </div>
          <div className="col-4">
            <div className="position-relative form-group">
            <Label for="pincode">{t("PINCODE")}</Label>
            <Input type="number"  onChange={this.handleInputChange} className="form-control" id="pincode" placeholder="Enter Pincode"/>
            {this.validator.message('pincode', this.state.pincode, validate.requiredPincode)}
            </div>     
          </div>
        </div>
        <div className="position-relative form-group">
          <Label for="contact">{t("CONTACT")}</Label>
          <Input
            id="contact"
            onChange={this.handleInputChange}
          />
          {this.validator.message('contact', this.state.contact, validate.required)}
        </div>
        <div>
    <button type="submit" className="btn btn-primary btn-md" onClick={this.SubmitAddCustomer.bind(this)}>{t("CREATE")}</button>
        </div>
      </div>  
    )
  }
}

AddSourceCustomer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (withTranslation("translations")(AddSourceCustomer));
