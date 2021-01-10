import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAirport from "./addAirport";


class AirportAddModal extends Component {

    render () {
        const {t} = this.props;
        const closebtn = <button className="close" onClick={this.props.togglePopup}>&times;</button>;
        return (
            <Modal isOpen={this.props.showPopup}
                size="md"
                toggle={this.props.togglePopup}
                className="modal-dialog"
            >
                <ModalHeader close={closebtn}> Add Airport </ModalHeader>
                <ModalBody >
                    <ToastContainer/>
                    <AddAirport refresh={this.props.refresh} togglePopup={this.props.togglePopup} />
                </ModalBody>
            </Modal>
        )
    }
  }

  export default (AirportAddModal);
  