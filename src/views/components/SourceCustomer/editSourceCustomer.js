import React, { Component } from 'react';
import { Label, Input } from 'reactstrap';
import HttpTransferService from "../../../utils/httptransfer";
import { ToastContainer } from "react-toastify";
import SimpleReactValidator from 'simple-react-validator';
import validate from "../../../utils/validations"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import constant from '../../../constants/constant';
import {  withTranslation } from "react-i18next";
import PropTypes from "prop-types";


const httptransfer = new HttpTransferService();

class EditSourceCustomer extends Component {

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({autoForceUpdate: this});
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getEntityAdditional = this.getEntityAdditional.bind(this);
    this.setEntityAdditional = this.setEntityAdditional.bind(this);
    this.initialState = {
      name : "",
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
      fssai: '',
      type: '',
      statusList: [
        {id: 'DEACTIVATED' , name: 'DEACTIVATED'},
        {id: 'ACTIVE' , name: 'ACTIVE'},
        {id: 'DELAYED_PAYEMNT' , name: 'DELAYED_PAYEMNT'}
      ],
      status: ''
    }
    this.state = this.initialState;
  };

  handleInputChange(e, index, value) {
    let id = e.target.id
    switch (id) {
      case 'name':
        this.setState({ name: e.target.value });
        break;
      case 'state':
        this.setState({ state: e.target.value  });
        this.getCity(e.target.value);
        break;
      case 'city':
        this.setState({ city:  e.target.value  });
        break;
      case 'pincode':
        this.setState({ pincode: e.target.value});
        break;
      case 'address_line_1':
        this.setState({ address_line_1: e.target.value });
        break;
      case 'type': 
        this.setState({ type: e.target.value });
        break;
      case 'pan': 
        this.setState({ pan: e.target.value });
        break;
      case 'fssai': 
        this.setState({ fssai: e.target.value });
        break;
      case 'status': 
        this.setState({ status: e.target.value });
        break;
      default:
        console.log('undefined field');
        break;
    }
  }

  createUserJson() {
    var userJson = {
      name: validate.capitalizeText(this.state.name),
      type: this.state.type ? this.state.type : this.props.type,
      state_id: this.state.state,
      city_id: this.state.city,
      status: this.state.status,
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

  SubmitEditCustomer(event) {
    if (validate.validate(this.validator)) {
      this.editEntity()
    }
  }
  
  editEntity(){
    var userJson = {}
    userJson = this.createUserJson()
    httptransfer.updateSourceCustomerEntity(userJson, this.props.sourceCustomerDetails.entity_id)
      .then(response => {
        if (response.status === 200) {
          if (this.props.type === constant.TRANSPORTER) {
            this.setEntityAdditional()
          } else {
            this.props.closeModal()
          }
        } 
        
    });
  }


  async componentDidMount() {
    await this.getEntityAdditional()
    this.setState({
      name: this.props.sourceCustomerDetails.name,
      pincode: this.props.sourceCustomerDetails.pincode,
      state: this.props.sourceCustomerDetails.state_details.state_id,
      city: this.props.sourceCustomerDetails.city_details.city_id,
      status: this.props.sourceCustomerDetails.status,
      contact: this.props.sourceCustomerDetails.contact[0].contact.replace(constant.plus, ''),
      address_line_1: this.props.sourceCustomerDetails.address_line_1,
      type: this.props.sourceCustomerDetails.type
    })
    document.getElementById('name').value = this.props.sourceCustomerDetails.name
    if (this.props.type === constant.TRANSPORTER) {
      document.getElementById('type').value = this.props.sourceCustomerDetails.type
    }
    document.getElementById('status').value = this.state.status
    document.getElementById('contact').value = this.state.contact
    document.getElementById('pincode').value = this.props.sourceCustomerDetails.pincode
    document.getElementById('address_line_1').value = this.props.sourceCustomerDetails.address_line_1
    this.getStateList()
    .then(response => {
      document.getElementById('state').value = this.props.sourceCustomerDetails.state_details.state_id
      this.getCity(this.props.sourceCustomerDetails.state_details.state_id)
        .then(response => {
          document.getElementById('city').value = this.props.sourceCustomerDetails.city_details.city_id
        })
    })
  }

  getEntityAdditional () {
    var params = {
      entity_id: [this.props.sourceCustomerDetails.entity_id]
    }
    httptransfer.queryEntityAdditionalAttributes(params)
    .then(response => {
      if (response.status === 200) {
        if (response.data.entities.length) {
          let values = response.data.entities[0].additional_attributes
          document.getElementById('pan').value = values.pan_number
          document.getElementById('fssai').value = values.fssai_number
          this.setState({
            pan: values.pan_number,
            fssai: values.fssai_number
          })
        }
      }
    })
  }

  setEntityAdditional () {
    var params ={
        "pan_number": this.state.fssai,
        "fssai_number": this.state.pan,
    }
    httptransfer.updateEntityAdditionalAttributes(params, this.props.sourceCustomerDetails.entity_id)
    .then(response => {
      this.props.closeModal();
    })
  }



  getStateList () {
    return new Promise((resolve, reject) => {
      httptransfer.getStateList()
      .then(response => {
        this.setState({
          stateList: response.data.states
        })
        resolve(response)
      })
    })
  }

  getCity (state_id) {
    return new Promise((resolve, reject) => {
      httptransfer.getCityList({state_id: [state_id]})
        .then(response => {
          this.setState({
            cityList: response.data.cities
          })
          resolve(response)
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
    let statusList = this.state.statusList.length ? 
      this.state.statusList.map(element => <option key={element.id} value={element.id}>{element.name}</option>) :
      []

    return (
      <div>
        <ToastContainer/>
        <div className="position-relative form-group">
          <Label for="name">{t("NAME")}</Label>
          <Input type="text" className="text-capitalize" onChange={this.handleInputChange} id="name" placeholder="Enter your name" required/>
          {this.validator.message('name', this.state.name, validate.required)}
        </div>
        <div className="my-0 position-relative row form-group">
          <div className="col-12">
            <div className="position-relative form-group">
              <Label for="address_line_1">{t("ADDRESS")}</Label>
              <Input type="text"  onChange={this.handleInputChange} className="text-capitalize" id="address_line_1" placeholder="Enter Address"/>
              {this.validator.message('address_line_1', this.state.address_line_1, validate.required)}
            </div>    
          </div>
          <div className="col-4">
            <div className="position-relative form-group">
              <Label for="state">{t("STATE")}</Label>
              <select id="state"  onChange={this.handleInputChange} className="form-control">
                <option defaultValue>Choose state</option>
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
          <div className="col-12">
            <div className="position-relative form-group">
              <Label for="pincode">{t("STATUS")}</Label>
              <select  id="status"  onChange={this.handleInputChange} className="form-control">
                <option value="">Choose Status</option>
                {statusList}
              </select>
              {this.validator.message('status', this.state.status, validate.required)}
            </div>     
          </div>
        </div>
        <div className="position-relative form-group">
          <Label for="contact">{t("CONTACT")}</Label>
          <Input
            id="contact"
            onChange={this.handleInputChange}
          />
          {this.validator.message('contact', this.state.contact, validate.phone)}
        </div>
        {
        this.props.type === constant.TRANSPORTER ?
          <div className="my-0 position-relative row form-group">
            <div className="col-6">
              <div className="position-relative form-group">
                <Label for="pan">{t("pan")}</Label>
                <Input type="text" className="form-control" onChange={this.handleInputChange} id="pan" placeholder="Enter PAN"/>
              </div>
            </div>
            <div className="col-6">
              <div className="position-relative form-group">
              <Label for="fssai">{t("fssai")}</Label>
              <Input type="text"  onChange={this.handleInputChange} className="form-control" id="fssai" placeholder="Enter FSSAI"/>
              </div>     
            </div>
          </div>
        : null
        }
        <div>
          <button type="submit" className="btn btn-primary btn-md" onClick={this.SubmitEditCustomer.bind(this)}>{t("UPDATE")}</button>
        </div>
      </div>  
    )
  }
}

EditSourceCustomer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (withTranslation("translations")(EditSourceCustomer));
