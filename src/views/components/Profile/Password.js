import React, { Component } from 'react';
import { Card, CardBody, CardTitle,  CardText, Button,Form, FormGroup, Label, Input, Jumbotron, Container } from 'reactstrap';
import constant from "../../../constants/constant";
import HttpTransferService from "../../../utils/httptransfer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticationService from '../../../utils/authentication';
import { Redirect } from "react-router-dom";
const  authentication = new AuthenticationService()

const httptransfer = new HttpTransferService();


class Password extends React.Component {

  
    constructor(props) {
      super(props);
      this.state = {
        recentPassword:'',
        newPassword:'',
        confirmPassword:'',
        name : '',
        redirect: false
      }
    };

    componentDidMount  = () => {
      var userName =authentication.getUserInfo()
      this.setState({
        name : JSON.parse(userName).first_name
      })
  }


  handleChange = (event) =>  {
    this.setState({
        [event.target.name]: event.target.value
      })
}


  handlePasswordChange () {
    var createPasswordJson ={}
    var userId =localStorage.getItem("user_info")
    var user_id = JSON.parse(userId).user_id
    createPasswordJson['old_password'] = this.state.recentPassword
    createPasswordJson['new_password'] = this.state.newPassword   
    var entity_id = constant.ENTITY_ID;
    if (this.state.newPassword === this.state.confirmPassword) {
    httptransfer.passwordChange(createPasswordJson, entity_id, user_id)
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem("change_password",false);
          this.setState({
            redirect : true
          })
        } 
      })
    }
  }

    render() {
      const { redirect } = this.state;

      if (redirect) {
        window.location="/profile";
      }
        return (
    <div>
      <Jumbotron fluid >
        <Container fluid id='base-container'> 
            <CardBody>
              <CardTitle><span  className='d-flex'><h5 className="mt-3 font-weight-bold">Hello</h5><h1 className="ml-3 font-weight-bold">{this.state.name}</h1> </span></CardTitle>
              <CardText className="mt-5"><b>Change your password</b></CardText>
              <Form >
                    <FormGroup>
                        <Label for="Recent Password">Current Password<span className="text-danger pl-1">*</span></Label>
                        <Input type="password" name="recentPassword" id="rPassword" required onChange = {this.handleChange.bind(this)} placeholder="Current Password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="New Password">New Password<span className="text-danger pl-1">*</span></Label>
                        <Input type="password" required name="newPassword" onChange = {this.handleChange.bind(this)} id="cPassword" placeholder="New Password"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Confirm Password">Confirm Password<span className="text-danger pl-1">*</span></Label>
                        <Input type="password" required name="confirmPassword" onChange = {this.handleChange.bind(this)} id="confirmPassword" placeholder="Confirm Password"/>
                    </FormGroup>
                  </Form>
              <Button type="button" className="btn btn-primary bg-primary btn-lg float-right"  onClick = {this.handlePasswordChange.bind(this)}>Update</Button>
            </CardBody>
        </Container>
      </Jumbotron>
      <ToastContainer />
    </div>    
    )
    }

}

export default Password;