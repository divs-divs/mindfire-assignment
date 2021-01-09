import React, { Component } from "react";
import HttpTransferService from "../../../../utils/httptransfer";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ToastContainer } from "react-toastify";
import {  withTranslation } from "react-i18next";
import PropTypes from "prop-types";


const httptransfer = new HttpTransferService();

class UserDeleteModal extends Component {

    deleteUser(){
        httptransfer.deleteUser(this.props.entityId, this.props.userDetails.user_id)
          .then(response => {
            if(response.status  === 200) {
              this.props.togglePopup()
            }
          });
    }

    render () {
        const {t} = this.props;
        const closebtn = <button className="close" onClick={this.props.togglePopup}>&times;</button>;
        return (
            <div>
            <ToastContainer />
            <Modal isOpen={this.props.showPopup}
                size="md"
                toggle={this.props.togglePopup}
                className="modal-dialog">
                <ModalHeader close={closebtn} className="text-center border-0" > 
                </ModalHeader>
                <ModalBody className="text-center">
                    <h1>{t("DELETE_ACCOUNT")}</h1>
                    <p>{t("ARE_YOU_SURE_YOU_WANT_TO_DELETE_YOUR_ACCOUNT ?")}</p> 
                    <button className="btn btn-danger pull-right mr-1" onClick={this.deleteUser.bind(this)}>{t("DELETE")}</button>
                    <button className="btn btn-secondary pull-right mr-1" onClick={this.props.togglePopup}>{t("CANCEL")}</button>
                </ModalBody>
            </Modal>
            </div>
        )
    }
}
UserDeleteModal.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default (withTranslation("translations")(UserDeleteModal));