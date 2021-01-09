import React, { Component } from "react";
import AddUser from './addUser';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  withTranslation } from "react-i18next";
import PropTypes from "prop-types";

class UserAddModal extends Component {

    render () {
        const {t} = this.props;
        const closebtn = <button className="close" onClick={this.props.togglePopup}>&times;</button>;
        return (
            <Modal isOpen={this.props.showPopup}
                size="md"
                toggle={this.props.togglePopup}
                className="modal-dialog"
            >
                <ModalHeader close={closebtn}> {t("ADD_USER")} </ModalHeader>
                <ModalBody >
                    <ToastContainer/>
                    <AddUser entityType={this.props.entityType} entityId={this.props.entityId} togglePopup={this.props.togglePopup} />
                </ModalBody>
            </Modal>
        )
    }
  }
  UserAddModal.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default (withTranslation("translations")(UserAddModal));
  