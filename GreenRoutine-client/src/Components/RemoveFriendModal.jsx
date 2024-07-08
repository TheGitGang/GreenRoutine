import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const RemoveFriendModal = ({ isOpen, toggle, name, friendId, userId, handleRemoveFriendSubmit }) => {
    const handleSubmit = () => {
        handleRemoveFriendSubmit(friendId)
        toggle();
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader>
                Remove Friend
            </ModalHeader>
            <ModalBody>
                Are you sure you want to remove {name} as a friend?
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleSubmit}color="primary">Confirm</Button>
                <Button onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default RemoveFriendModal;