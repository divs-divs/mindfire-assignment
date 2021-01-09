import React, { Component } from 'react';
import { Label, Input} from 'reactstrap';
import HttpTransferService from "../../../../utils/httptransfer";
import { ToastContainer } from "react-toastify";
import { Multiselect } from 'multiselect-react-dropdown';
import constants from '../../../../constants/constant';
import SimpleReactValidator from 'simple-react-validator';
import validate from "../../../../utils/validations"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import constant from '../../../../constants/constant';


const httptransfer = new HttpTransferService();

class EditUser extends Component {

  constructor (props) {
    super(props);
    this.validator = new SimpleReactValidator({autoForceUpdate: this});
    this.initialState = {
        first_name : "",
        last_name : "",
        mobile : "",
        email : "",
        role: [],
        user_id: '',
        landlineNumber: '',
        prefered_language: "English",
        generate_password:false,
        country_code:this.props.userDetails.country_code ? this.props.userDetails.country_code : "+91"
      }

      this.state = this.initialState;
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount () {
      this.getUserAdditionalDetails()
      this.setState({
        first_name: this.props.userDetails.first_name,
        last_name: this.props.userDetails.last_name,
        email: this.props.userDetails.email,
        user_id: this.props.userDetails.user_id,
        mobile: this.state.country_code +this.props.userDetails.mobile,
      })
      document.getElementById('first_name').value = this.props.userDetails.first_name
      document.getElementById('last_name').value =  this.props.userDetails.last_name
      document.getElementById('email').value =  this.props.userDetails.email

      if (this.props.userDetails.role.length) {
        let role = []
        this.props.userDetails.role.map(element => {
          role.push(constants.ROLES.filter(a => a.id === element)[0])
        })
        this.setState({role: role})
      }
    }
    getUserAdditionalDetails () {
      var params = {
        user_id: [this.props.userDetails.user_id]
      }
      httptransfer.queryUserAdditionalAttributes(params, constant.ENTITY_ID)
      .then(response => {
       if (response.status === 200) {
         if (response.data.users.length) {
           this.setState({
            landlineNumber: response.data.users[0].additional_attributes.landline_number
           })
           document.getElementById('landlineNumber').value = response.data.users[0].additional_attributes.landline_number
         }
       }
      })
    }
    

    handleInputChange(e) {
      let id = e.target.id
      switch (id) {
        case 'first_name':
          this.setState({ first_name: e.target.value });
          break;
          case 'last_name':
          this.setState({ last_name: e.target.value });
          break;
        case 'email':
          this.setState({ email: e.target.value });
          break;
        case 'role':
          this.setState({ role: e.target.value });
          break;
        case 'landlineNumber':
          this.setState({ landlineNumber: e.target.value });
          break;
        default:
          console.log('undefined field');
          break;
      }
  
    }

  handleSubmit(event) {
    if (validate.validate(this.validator)) {
      this.editUser()
    }
  }

  editUser(){
    var userJson = {}
    userJson = this.editUserJson()
    httptransfer.updateUserQuery(userJson,this.props.entityId)
      .then(response => {
        if (response.status === 200) {
        this.updateUserAdditionalAttributes(this.props.userDetails.user_id)
        } 
      });
  }

  updateUserAdditionalAttributes (userId) {
    var params = {
      landline_number: this.state.landlineNumber
    }
    httptransfer.updateUserAdditionalAttributes(params, constant.ENTITY_ID, userId)
    .then(response => {
      if (response.status === 200) {
        this.props.togglePopup();
      }
    })
  }

  onSelect(selectedList) {

    this.setState ({
      role: selectedList
    })
  }
  
  onRemove(selectedList) {
    this.setState ({
      role: selectedList
    })
  }

  editUserJson()
  {
    var userJson = {}
    let role = []
    if (this.state.role.length) {
      this.state.role.map(element => {
        role.push(element.id)
      })
    }
    userJson['first_name'] = validate.capitalizeText(this.state.first_name)
    userJson['last_name'] = validate.capitalizeText(this.state.last_name)
    userJson['email'] = this.state.email
    userJson['role'] = role
    userJson['user_id'] = this.state.user_id
    userJson['generate_password'] = false
    userJson['prefered_language'] = this.state.prefered_language
    userJson['mobile'] = this.state.mobile.slice(-10)
    userJson['country_code'] = constant.plus + this.state.mobile.replace(userJson['mobile'], '')
    return userJson

  }

    render() {
      const roles = constants.ROLES.filter(a => a.value === this.props.entityType)
      return (
        <div>
          <ToastContainer />
          <div className="my-0 position-relative row form-group">
          <div className="col-6">
              <div className="position-relative form-group">
              <Label for="first_name">First Name</Label>
              <Input type="text" className="text-capitalize" name="first_name" onChange={this.handleInputChange} id="first_name" placeholder="Enter first name" />
              {this.validator.message('first_name', this.state.first_name, validate.required)}
              </div>
          </div>
          <div className="col-6">
              <div className="position-relative form-group">
              <Label for="last_name">Last Name</Label>
              <Input type="text" className="text-capitalize" name="last_name" onChange={this.handleInputChange} id="last_name" placeholder="Enter last name" />
              {this.validator.message('last_name', this.state.last_name, validate.required)}
              </div>
          </div>
          </div>
          <div className="my-0 position-relative row form-group">
            <div className="col-6">
                <div className="position-relative form-group">
                <Label for="email">Email</Label>
                <Input disabled type="email" className="form-control" name="email" id="email" placeholder="Enter email-id"/>
                {this.validator.message('email', this.state.email, validate.requiredEmail)}
                </div>
            </div>
            <div className="col-6">
                <div className="position-relative form-group">
                <Label for="mobile">Contact Number</Label>
                <PhoneInput
                  disabled
                  // country={constants.IndiaCode}
                  value={this.state.mobile}
                />
                {this.validator.message('mobile', this.state.mobile, validate.phone)}
                </div>
            </div>
          </div>
          <div className="my-0 position-relative row form-group">
          <div className="col-6">
              <div className="position-relative form-group">
              <Label for="role">Role</Label>
              <Multiselect id="role" className="form-control text-capitalize"
                selectedValues={this.state.role} 
                onSelect={this.onSelect.bind(this)} 
                onRemove={this.onRemove.bind(this)} 
                options={roles}
                displayValue="name"
              />
              {this.validator.message('role', this.state.role, validate.required)}
              </div>
          </div>
          <div className="col-6">
            <div className="position-relative form-group">
              <Label for="userTitle">Landline Number</Label>
              <Input type="number" className="form-control" name="landlineNumber" onChange={this.handleInputChange} id="landlineNumber" placeholder="Enter landline number"/>
            </div>
          </div>
          </div>
          <div>
          <button type="submit" className="btn btn-primary btn-md" onClick={(e) => this.handleSubmit(e)}>Update</button>
          </div>
        </div>
        )
    }
}
export default EditUser