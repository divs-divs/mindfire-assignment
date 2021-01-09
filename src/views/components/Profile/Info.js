import React, { Component } from 'react';
import { Col, Row,Jumbotron, Container, Input,Modal, ModalBody, ModalHeader } from 'reactstrap';
import AuthenticationService from '../../../utils/authentication';
import './profile.css';
import HttpTransferService from "../.././../utils/httptransfer";
import UserInfoUpdate from './UpdateInfo';
import constant from '../../../constants/constant';
import UploadProfilePicture from './ProfilePictureUpload';
import moment from 'moment';
import utils from '../../../utils/date'

const  authentication = new AuthenticationService()
const httptransfer = new HttpTransferService();


class UpdateInfo extends React.Component {

    closePopup = () => {
      this.props.closePopup();
    }
    render() {
      const closebtn = <button className="close" onClick={this.closePopup}>&times;</button>;
      return (
        <div>
          <Modal
            size="lg"
            isOpen={this.props.showPopup}
            toggle={this.props.closePopup}
          >
            <ModalHeader toggle={this.props.closePopup} close={closebtn}>Update Information</ModalHeader>
            <ModalBody>
                <UserInfoUpdate   closeModal={this.closePopup}
                 userInfo={this.props.userInfo} />
                               
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }

var userInfo = authentication.getUserInfo()
var userId = JSON.parse(userInfo).user_id

class Info  extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userInfo : [],
          showPopup : false,
          profilePopup: false,
          imageUrl : '',
          image_id:''
        }
  
      };

      togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
        this.userQuery()
      }
  
      profilePopup () {
        this.userQuery()
        this.setState({
          profilePopup : !this.state.profilePopup
        }) 
      }

      componentDidMount () {
        this.userQuery()

    }
  
    userQuery () {
      var user_id = userId
      var searchParametre = {
        'user_id' : [user_id]
      }
      var entity_id = constant.ENTITY_ID
      httptransfer.userQuery(searchParametre, entity_id)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            userInfo : response['data']['users'] 
           })
        }
      });
      this.userImageQuery()
    }

    userImageQuery() {
      var user_id = userId
      var searchParametre = {
        'user_id' : [user_id],
        'type':['PROFILE'],
        // 'image_id': ['']
      }
      var entity_id = constant.ENTITY_ID
      httptransfer.queryUserImage(searchParametre, entity_id)
      .then(response => {
        if (response.status === 200){
          if (response['data']['images'].length) {
          this.setState({
              imageUrl : response['data']['images'][0]['image_download_url'],
              image_id:response['data']['images'][0]['image_id']
          })
        }
        else {
          this.setState ({
            imageUrl : null
          })
        }
        }
      })
    }
    render() {  
        return (
            <div>
                <Jumbotron fluid >
                <Container fluid id='base-container'>
                          {
                        this.state.showPopup ?
                          <UpdateInfo
                            showPopup={this.state.showPopup}
                            closePopup={this.togglePopup.bind(this)}
                            userInfo={this.state.userInfo}/>
                          : null
                      }
                      {
                        this.state.profilePopup ?
                          <UploadProfilePicture
                            showPopup={this.state.profilePopup}
                            closePopup={this.profilePopup.bind(this)}/>
                          : null
                      }
                      {this.state.userInfo.map((item, index) => {
                          return (<div>
                            <Row>
                              <Col sm="6">
                                <span id='profilePhoto'>
                                  {this.state.image_id.length!=0 ?
                                  <img src={this.state.imageUrl} alt="image" onClick={this.profilePopup.bind(this)} /> :
                                  <i className="fa fa-user" id="defaultPhoto" aria-hidden="true" onClick={this.profilePopup.bind(this)} ></i> 
                                  }
                                </span>
                              </Col>
                              <Col sm="6">
                                <button className="btn btn-info pull-right mt-4" onClick={this.togglePopup.bind(this)} >
                                Update Information</button>
                              </Col>
                            </Row>

                              <Row id="info-account" className="pt-3 ml-1 font-weight-bold">
                                <span>ACCOUNT INFORMATION</span>
                              </Row>
                            <Row className="pt-3 font-weight-bold">
                                    <Col xs="3" sm="3">Full Name :</Col>
                                    <Col xs="8" sm="8">{item.first_name}<span className="pl-2">{item.last_name}</span></Col>
                                </Row>
                                
                                <Row className="pt-3 font-weight-bold">
                                    <Col xs="3" sm="3">Email :</Col>
                                    <Col xs="8" sm="8">{item.email ? item.email : <span className="font-weight-bold">-</span> }</Col>
                                </Row>
                                <Row className="pt-3 font-weight-bold">
                                    <Col xs="3" sm="3">Contact No. :</Col>
                                    <Col xs="8" sm="8">{  item.mobile ? item.mobile : <span className="font-weight-bold">-</span> }</Col>
                                </Row>
                                <Row className="pt-3 font-weight-bold">
                                    <Col xs="3" sm="3">Gender :</Col>
                                    <Col xs="8" sm="8">{  item.gender ? item.gender : <span className="font-weight-bold">-</span> }</Col>
                                </Row>
                                <Row className="pt-3 font-weight-bold">
                                    <Col xs="3" sm="3">D.O.B. :</Col>
                                    <Col xs="8" sm="8">{  item.dob ? moment(item.dob).format(utils.displayDate()) :  <span className="font-weight-bold">-</span>}</Col>
                                </Row></div>
                          )
                        })}
                
                </Container>
                </Jumbotron>    
            </div>
        )
    }
}

export default Info;