import React, { Component } from "react";
import Users from "./UsersList";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
class UserListModal extends Component {
    
    render () {
        const closebtn = <button className="close" onClick={this.props.toggleUserListModal}>&times;</button>;
        return (
            <Modal isOpen={this.props.showUserListModal}
                size="xl"
                toggle={this.props.toggleUserListModal}
                className="modal-dialog"
            >
                <ModalHeader close={closebtn}> {this.props.titles.addCustomerUserTitle} - [ {this.props.userData.name} ]</ModalHeader>
                <ModalBody >
                    <Users entityType={this.props.entityType} entityId={this.props.userData.entity_id}/>
                </ModalBody>
            </Modal>
        )
    }
  }
  export default UserListModal