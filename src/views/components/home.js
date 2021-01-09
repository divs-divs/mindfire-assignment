import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Enqueries from '../enqueries';

const EnquiryPopup = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  return (
  <div>
    <Button color="primary" className='float-right mt-2' onClick={toggle}>+ Add Enquiry</Button>
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle} close={closeBtn} className="bg-info" >Add enquery</ModalHeader>
      <ModalBody>
        <Enqueries />
        <Button color="secondary" className="float-right mr-2" onClick={toggle}>Cancel</Button>
      </ModalBody>
    </Modal>
  </div>
);
} 

export default EnquiryPopup;