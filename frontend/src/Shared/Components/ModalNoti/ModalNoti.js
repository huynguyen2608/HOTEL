import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import {Util} from '../../../Helper/Util'
class ModalNoti extends React.Component {

    render() {
        let { message, done } = this.props;
        return (
            <div className="modalNotiContainer">
                <Modal isOpen={!!message} >
                    <ModalHeader >Thông Báo !</ModalHeader>
                    <ModalBody>{message}</ModalBody>
                    <ModalFooter>
                        <button
                            // onKeyDown={(e) => Util.onKeyDown(e)}
                            className='button-modal'
                            data-index="18"
                            onClick={() => { done() }}>OK</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalNoti;