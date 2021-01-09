import React, { Component} from 'react';
import { Modal, Row, Col, CustomInput, Form, FormGroup, Label, Input, ModalHeader, Button } from 'reactstrap';
import constant from '../.././../constants/constant'
import HttpTransferService from "../../../utils/httptransfer";
import moment from 'moment';
import utils from '../../../utils/date'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const httptransfer = new HttpTransferService();


class UserInfoUpdate extends Component {
    constructor(props){
        super(props);
  
        this.props.userInfo.map(item=>{
            this.state = {
                user_id:item.user_id,
                firstName : item.first_name,
                lastName : item.last_name,
                dob : item.dob,
                gender: item.gender,
            };
        })


    }

    handleChange(event)  {
        this.setState({
            [event.target.name]: event.target.value,
          })
    }

    handleGenderChange(event)  {
        this.setState({
            gender : event.target.value,
          })
    }
    
    componentDidMount() {
        document.getElementById('firstName').value = this.state.firstName
        document.getElementById('lastName').value = this.state.lastName
        document.getElementById('dob').value = moment(this.state.dob).format(utils.dateShowFormat())
        { this.state.gender === 'MALE' ? document.getElementById("male").checked = true :
        this.state.gender === 'FEMALE' ? document.getElementById("female").checked = true :
        document.getElementById("other").checked = true
        }   
    }

    handleSubmit() {
    var user_id = this.state.user_id
    var entity_id = constant.ENTITY_ID
    var createInfoJson = {}
    createInfoJson['first_name'] = this.state.firstName
    createInfoJson['last_name'] = this.state.lastName
    createInfoJson['gender'] = this.state.gender.toUpperCase()
    createInfoJson['dob'] = new Date(this.state.dob).getTime()    
    httptransfer.updateInfo(createInfoJson, entity_id,user_id)
    .then (response => {
        if (response.status === 200) {
            this.props.closeModal()
        }
    })
    }

    render() {

        return (
            <div>
                 <ToastContainer />
                <Form >
                <div className="row">
                <FormGroup className="col-6">
                    <Label for="type">First Name</Label>
                    <Input type="firstName" name="firstName"  id="firstName" required onChange = {this.handleChange.bind(this)} placeholder="First Name" />
                </FormGroup>
                <FormGroup className="col-6">
                    <Label for="type">Last Name</Label>
                    <Input type="lastName" name="lastName"  id="lastName" required onChange = {this.handleChange.bind(this)} placeholder="Last Name" />
                </FormGroup >
                <FormGroup className="col-6">
                    <Label for="description">D.O.B</Label>
                    <Input type="date"  name="dob" onChange = {this.handleChange.bind(this)} max={utils.todayDateFormatted()} id="dob" />
                </FormGroup>
                <div className="col-6">
                    <div className="position-relative ">
                    <FormGroup  onChange={this.handleGenderChange.bind(this)} name='gender' >
                    <Label for="gender">Gender</Label>
                    <div className="d-flex">
                      <CustomInput type="radio" id="male" name="customRadio" value="male" label="Male" />
                      <CustomInput type="radio" className="ml-3" id="female" name="customRadio" value="female" label="Female" />
                      <CustomInput type="radio" className="ml-3" id="other" name="customRadio" value="other" label="Others" />
                    </div>
                  </FormGroup>
                    </div>
                </div>
                </div> 
                    <button type="button" onClick={this.handleSubmit.bind(this)} className="btn btn-primary btn-md pull-right" >Update</button>
                </Form>
            </div>
            
        );
    }
}

export default UserInfoUpdate;
