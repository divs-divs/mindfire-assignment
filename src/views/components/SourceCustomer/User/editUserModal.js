import React, { Component } from "react";
import EditUser from './editUser';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

class UserEditModal extends Component {
    render () {
        const closebtn = <button className="close" onClick={this.props.togglePopup}>&times;</button>;
        return (
            <Modal isOpen={this.props.showPopup}
                size="md"
                toggle={this.props.togglePopup}
                className="modal-dialog"
            >
                <ModalHeader close={closebtn}> Edit User </ModalHeader>
                <ModalBody >
                    <EditUser entityId={this.props.entityId}
                        userDetails={this.props.userDetails}
                        togglePopup={this.props.togglePopup}
                        entityType={this.props.entityType}
                    />
                </ModalBody>
            </Modal>
        )
    }
}
export default UserEditModal