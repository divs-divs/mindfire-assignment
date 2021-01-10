import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAircraft from "./addAircraft";


class AircraftAddModal extends Component {

    render () {
        const {t} = this.props;
        const closebtn = <button className="close" onClick={this.props.togglePopup}>&times;</button>;
        return (
            <Modal isOpen={this.props.showPopup}
                size="md"
                toggle={this.props.togglePopup}
                className="modal-dialog"
            >
                <ModalHeader close={closebtn}> Add Aircraft </ModalHeader>
                <ModalBody >
                    <ToastContainer/>
                    <AddAircraft refresh={this.props.refresh} entityId={this.props.entityId} togglePopup={this.props.togglePopup} />
                </ModalBody>
            </Modal>
        )
    }
  }

  export default (AircraftAddModal);
  