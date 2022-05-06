import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalConfirm extends React.Component {

    render() {
        let { message, answer } = this.props;
        return (
                <Modal isOpen={!!message}  className="modalConfirmContainer">
                    <ModalHeader >Thông Báo!</ModalHeader>
                    <ModalBody>{message}</ModalBody>
                    <ModalFooter>
                        <button className='button-modal' onClick={() => { answer(true) }}>Yes</button>{' '}
                        <Button color="danger" onClick={() => { answer() }}>No</Button>
                    </ModalFooter>
                </Modal>
            
        );
    }
}

export default ModalConfirm;