import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const SendChallengeModal = ({ isOpen, toggle, data }) => {

    const handleSubmit = async () => {

    }; 

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader>
                    Send Challenge
                </ModalHeader>
                <ModalBody>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>Send Challenge</Button>
                    <Button onClick={() => {
                        toggle();
                    }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
};

export default SendChallengeModal;