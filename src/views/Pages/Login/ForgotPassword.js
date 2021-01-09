import React, { Component } from "react";
import { Label, Input} from 'reactstrap';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import authentication from "../../../utils/authentication";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleReactValidator from 'simple-react-validator';
import validate from "../../../utils/validations"
const authenticationService = new authentication();

class ForgotPassword extends React.Component {
    constructor (props) {
        super(props);
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
        this.state = {
            email : "",
          }
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleInputChange = this.handleInputChange.bind(this)
        }

    handleInputChange(e) {
        let id = e.target.id
        switch (id) {
          case 'email':
            this.setState({ email: e.target.value});
          default:
            console.log('undefined field');
            break;
        }
      }
      handleSubmit() {
        if (validate.validate(this.validator)) {
          this.forgotPassword()
        }
      }

      forgotPassword () {
        authenticationService.forgotPassword(this.state.email).then((response) => {
          if (response.status === 200) {
            this.props.toggleForgotPasswordModal();
          } 
        });
      }

    render () {
        const closebtn = <button className="close" onClick={this.props.toggleForgotPasswordModal}>&times;</button>;
        return (
            <div>
            <ToastContainer />
            <Modal isOpen={this.props.toggleForgotPasswordModal}
                size="sm"
                toggle={this.props.toggleForgotPasswordModal}
                className="modal-dialog"
            >
                <ModalHeader close={closebtn}> Forgot Password </ModalHeader>
                <ModalBody >
            <div className="position-relative form-group">
              <Label for="email">E-Mail</Label>
              <Input type="text"  name="email" onChange={this.handleInputChange} id="email" placeholder="Enter Email" value={this.state.email}/>
              {this.validator.message('email', this.state.email, validate.required)}
              </div>
              <div>
          <button type="submit" className="btn btn-primary btn-md" onClick={(e) => this.handleSubmit(e)}>Reset Password</button>
          </div>
                </ModalBody>
            </Modal>
            </div>
        )
    }
  }

  export default ForgotPassword

  