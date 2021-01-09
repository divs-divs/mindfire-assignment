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

class AddUser extends Component {

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({autoForceUpdate: this});
    this.handleInputChange = this.handleInputChange.bind(this);

    this.initialState = {
      first_name : "",
      last_name : "",
      mobile : "",
      email : "",
      role: [],
      prefered_language: "English",
      generate_password:false,
      password: "",
      userTitles: [],
      userTitle: '',
      landlineNumber: '',
      showPassword: false,
      userTitleDisplay: 'title',
      apiLoading: false
    }
    this.state = this.initialState;
    this.getUserTitle = this.getUserTitle.bind(this)
  };
    
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
      case 'user_password':
        this.setState({ password: e.target.value });
        break;
      case 'landlineNumber':
        this.setState({ landlineNumber: e.target.value });
        break;
      default:
        break;
    }

  }

  componentDidMount () {
    this.getUserTitle()
  }

  getUserTitle () {
    httptransfer.getUserTitle(constant.ENTITY_ID)
    .then(response => {
      if (response.status === 200) {
        this.setState({
          userTitles: response.data.titles
        })
      }
    })
  }

  addUser(){
    var entity_id = this.props.entityId
    var userJson = {}
    this.setState({
      apiLoading: true
    })
    userJson = this.createUserJson()
    httptransfer.createUserQuery(userJson,entity_id)
      .then(response => {
        if (response.status === 200) {
          this.addUserAdditionalAttributes(response.data.user_id)
        } else {
          this.setState({
            apiLoading: false
          })
        }
      });
  }
  addUserAdditionalAttributes (userId) {
    var params = {
      landline_number: this.state.landlineNumber
    }
    httptransfer.updateUserAdditionalAttributes(params, constant.ENTITY_ID, userId)
    .then(response => {
      if (response.status === 200) {
        this.setState({
          apiLoading: false
        })
        toastservice.success(constant.USER_ADDED_MESSAGE)
        this.props.togglePopup();
      }
    })
  }

  createUserJson()
  {
    var userJson = {}
    userJson['first_name'] = validate.capitalizeText(this.state.first_name)
    userJson['last_name'] = validate.capitalizeText(this.state.last_name)
    userJson['mobile'] = this.state.mobile.slice(-10)
    userJson['country_code'] = constant.plus + this.state.mobile.replace(userJson['mobile'], '')
    userJson['email'] = this.state.email
    userJson['role'] = this.state.role
    userJson['password_details'] = {
      generate_password: false,
      password: this.state.password
    }
    userJson['prefered_language'] = this.state.prefered_language
    userJson['user_title_id'] = [this.state.userTitle[0].title_id]

    return userJson

  }



    handleSubmit(event) {
      if (validate.validate(this.validator)) {
        this.addUser()
      }
    }

    onSelect(selectedList) {
      let role = []
      if (selectedList.length) {
        selectedList.map(element => {
          role.push(element.id)
        })
      }
      this.setState ({
        role: role
      })
    }
    
    onRemove(selectedList) {
      let role = []
      if (selectedList.length) {
        selectedList.map(element => {
          role.push(element.id)
        })
      }
      this.setState ({
        role: role
      })
    }

    onUserSelect(selectedList) {
     
      this.setState ({
        userTitle: selectedList
      })
    }
    
    onUserRemove() {
      this.setState ({
        userTitle: ''
      })
    }
    togglePassword (){
      this.setState ({
        showPassword: !this.state.showPassword
      })
    }


  render() {
    const {t} = this.props;
    const roles = constants.ROLES.filter(a => a.value === this.props.entityType)
    return (
      <div>
        <ToastContainer />
        <div className="my-0 position-relative row form-group">
          <div className="col-6">
            <div className="position-relative form-group">
              <Label for="first_name">{t("FIRST_NAME")}</Label>
              <Input type="text" className="text-capitalize" name="first_name" onChange={this.handleInputChange} id="first_name" placeholder="Enter first name" required/>
              {this.validator.message('first_name', this.state.first_name, validate.required)}
            </div>
          </div>
          <div className="col-6">
            <div className="position-relative form-group">
              <Label for="last_name">{t("LAST_NAME")}</Label>
              <Input type="text" className="text-capitalize" name="last_name" onChange={this.handleInputChange} id="last_name" placeholder="Enter last name" required/>
              {this.validator.message('last_name', this.state.last_name, validate.required)}
            </div>
          </div>
        </div>
        <div className="my-0 position-relative row form-group">
          <div className="col-6">
            <div className="position-relative form-group">
              <Label for="email">{t("EMAIL")}</Label>
              <Input type="email" className="form-control" name="email" onChange={this.handleInputChange} id="email" placeholder="Enter email-id" required/>
              {this.validator.message('email', this.state.email, validate.requiredEmail)}
            </div>
          </div>
          <div className="col-6">
            <div className="position-relative form-group">
              <Label for="password">{t("password")}</Label>
              {
                this.state.showPassword ?
                <span>
                  <InputGroup>
                  <Input  value={this.state.password} type="text" name="password" onChange={this.handleInputChange} id="user_password" placeholder="Enter password" required/>
                  <InputGroupAddon addonType="append"><Button onClick={this.togglePassword.bind(this)} color="secondary"><i className="fa fa-eye-slash"></i></Button></InputGroupAddon>
                  </InputGroup>
                </span>   
                : 
                <span>
                  <InputGroup>
                  <Input  value={this.state.password} type="password" name="password" onChange={this.handleInputChange} id="user_password" placeholder="Enter password" required/>
                  <InputGroupAddon addonType="append">
                    <Button onClick={this.togglePassword.bind(this)} color="secondary"><i className="fa fa-eye"></i></Button></InputGroupAddon>
                  </InputGroup>
                </span>
              }
              {this.validator.message('user_password', this.state.password, validate.required)}
            </div>
          </div>
        </div>
        <div className="my-0 position-relative row form-group">
          <div className="col-6">
            <div className="position-relative form-group">
              <Label for="mobile">{t("CONTACT_NUMBER")}</Label>
              <PhoneInput
                country={constant.IndiaCode}
                value={this.state.mobile}
                onChange={mobile => this.setState({ mobile })}
              />
              {this.validator.message('mobile', this.state.mobile, validate.phone)}
            </div>
          </div>
          <div className="col-6">
            <div className="position-relative form-group">
              <Label for="role">{t("ROLE")}</Label>
              <Multiselect id="role" className="form-control text-capitalize"
                onSelect={this.onSelect.bind(this)} 
                onRemove={this.onRemove.bind(this)} 
                options={roles}
                displayValue="name"/> 
                {this.validator.message('role', this.state.role, validate.required)}
            </div>
          </div>
          <div className="col-6 search-disable">
            <div className="position-relative form-group">
              <Label for="userTitle">{t("DESIGNATION_TITLE")}</Label>
              <Multiselect id="userTitle" className="form-control text-capitalize"
                onSelect={this.onUserSelect.bind(this)} 
                onRemove={this.onUserRemove.bind(this)} 
                options={this.state.userTitles}
                singleSelect={true}
                displayValue={this.state.userTitleDisplay}/> 
                {this.validator.message('userTitle', this.state.userTitle, validate.required)}
            </div>
          </div>
          <div className="col-6">
            <div className="position-relative form-group">
              <Label for="userTitle">{t("LANDLINE_NUMBER")}</Label>
              <Input type="number" className="form-control" name="landlineNumber" onChange={this.handleInputChange} id="landlineNumber" placeholder="Enter landline number"/>
            </div>
          </div>
        </div>
        <div>
          <button disabled={this.state.apiLoading} type="submit" className="btn btn-primary btn-md" onClick={(e) => this.handleSubmit(e)}>
            {this.state.apiLoading ? <i class="fa fa-spinner fa-spin mr-2"></i> : null}{t("CREATE")}
          </button>
        </div>
      </div>
    )
  }
}
AddUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (withTranslation("translations")(AddUser));
