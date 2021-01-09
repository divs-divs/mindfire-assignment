import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import toastService from "../../../utils/toastnotification";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Label,
} from "reactstrap";
import firebase from '../../../firebase';
import 'react-phone-input-2/lib/style.css'; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastservice = new toastService();

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.login = this.login.bind(this);


    this.state = {
      username: "",
      password: "",
      isPopupOpen: false,
      showOTP:false,
      showOTPEntryScreen:false,
      country_code:'',
      count:0,
      changePassword:false,
      users:[]
    };
  }

  async login(event) {
    await fetch('http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/users').
    then(response => response.json())
  .then(data => this.setState({
    users:data
  }));
  console.log("aa",this.state.username,"aaa",this.state.password);
  if(this.state.users.filter(a=>a.email==this.state.username)[0]&&this.state.users.filter(a=>a.password==this.state.password)[0]){
    localStorage.setItem("name", this.state.username);
    window.location.href='/dashboard';
  }
  else{
    toastservice.error("Username or password is incorrect");
  }
  }

  setTranslationLanguage() {
    this.props.i18n.changeLanguage(localStorage.getItem("user_preffered_language"));
  }



  setUserInfoInLocalStorage(apiresponse) {
    return new Promise((resolve, reject) => {
      localStorage.setItem("user_info", JSON.stringify(apiresponse["data"]));
      localStorage.setItem("change_password", JSON.parse(JSON.stringify(apiresponse["data"])).change_password);
      localStorage.setItem("user_preffered_language", JSON.parse(JSON.stringify(apiresponse["data"])).preffered_language)
      localStorage.setItem("isLoggedin", "true");
      localStorage.setItem("token", apiresponse["headers"]["x-auth-token"]);
      localStorage.setItem(
        "serveruniqueid",
        apiresponse["headers"]["server_unique_id"]
      );
      localStorage.setItem(
        "refreshtoken",
        apiresponse["headers"]["refresh-token"]
      );
      resolve();
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleInputChangeForUserName(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
    [name]: value
    });
    
  }



  render() {
return(
      <div className="app flex-row align-items-center">
        <ToastContainer/>
        <form className="col-12" onSubmit={this.login}>
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form>
                        <h1>Login</h1>
                        <p className="text-muted">Sign in to your account</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Username"
                            autoComplete="username"
                            value={this.state.username}
                            onChange={this.handleInputChangeForUserName.bind(this)}
                            name="username"
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            name="password"
                          />
                        </InputGroup>
                        <Row>
                          <Col xs="6">
                            <Input
                              color="primary"
                              className="px-4 btn btn-primary"
                              // type="submit"
                              value="Login"
                              onClick={()=>this.login()}
                            />
                            <ToastContainer />
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </form>
      </div>
      )
                 }
               }

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (Login);


