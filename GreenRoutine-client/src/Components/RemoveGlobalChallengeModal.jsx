import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const RemoveGlobalChallengeModal = ({ toggle, data, isOpen, handleRemoveSubmit }) => {
    

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Delete Challenge
                </ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to delete this challenge?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"onClick={() => {
                        handleRemoveSubmit(data.id);
                        toggle();
                    }}>Confirm</Button>
                    <Button onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        
    )
};

export default RemoveGlobalChallengeModal;