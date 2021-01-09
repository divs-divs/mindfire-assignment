import  React, { Component } from "react";
import { Col, Row,Jumbotron, Label, Input,Modal, ModalBody, ModalHeader } from 'reactstrap';
import HttpTransferService from "../.././../utils/httptransfer";
import constant from '../../../constants/constant';
import AuthenticationService from '../../../utils/authentication';
const httptransfer = new HttpTransferService();
const  authentication = new AuthenticationService()


class UploadProfilePicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo : '',
            user: 'USER',
        }
    }

    closePopup = () => {
      this.props.closePopup();
    }

    handleInputChange(e) {
        this.setState({
            photo: e.target.files[0]
        })
    }

    uploadImage(e) {

        const file=document.querySelector('#fileItem').files['0']

        let params = {
            type: 'USER', 
            file_name: file.name
        }
        var userInfo = authentication.getUserInfo()
        var user_id = JSON.parse(userInfo).user_id
        
        httptransfer.uploadFileOnServer(params, constant.ENTITY_ID)
            .then(result => {
                if (result.status === 200) {
                    httptransfer.uploadFileOnAws(file, result.data.file_upload_url)
                    .then(res => {
                        if (res.status === 200) {
                            httptransfer.uploadImage({file_path: result.data.file_path}, constant.ENTITY_ID, user_id)
                            .then(response => {
                                if (response.status === 200) {
                                }
                            })
                        }
                    })
                }
            })
        }

    render() {
      const closebtn = <button className="close" onClick={this.closePopup}>&times;</button>;
      return (
        <div>
          <Modal
            size="md"
            isOpen={this.props.showPopup}
            toggle={this.props.closePopup}
          >
             <ModalHeader toggle={this.props.closePopup} close={closebtn}>Update Information</ModalHeader>  
            <ModalBody>
                {/* <UserInfoUpdate   closeModal={this.closePopup} /> */}
                <i className="fa fa-upload" aria-hidden="true"></i>

                <div className="col-6">
                                <div className="position-relative form-group">
                                    <Label for="amount">File</Label>
                                    <Input accept="image/*"  type="file" id="fileItem" required/>
                                </div>
                            </div>
                            { <div className="col-6 p-4">
                                <button onClick={this.uploadImage} type="submit" className="btn btn-primary" >Upload</button>
                            </div> 
                            }                 
            </ModalBody>
          </Modal>
        </div>

      );
    }
  }
export default UploadProfilePicture;