import { useState } from "react";
import { Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row, ModalFooter, Button, Alert } from "reactstrap";

const AddFriendModal = ({ isOpen, toggle, userId, onAddFriend }) => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username) {
            setError('No username entered')
        } else {
            setError('');
            const payload = {
                userId: userId,
                friendUsername: username
            }
            const response = await fetch('/api/Friend/add', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            if (response.ok) {
                const data = await response.json();
                onAddFriend(data);
                setError("Friend added successfully")
            } else {
                setError("Unable to add friend. The entered user may not exist.")
            }
        }
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader>
                Add Friend
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Label htmlFor='username'>Username</Label>
                            <Input
                                type='text'
                                name='username'
                                id='username'
                                value={username}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button 
                    onClick={() => {
                        handleSubmit(event);
                        setUsername("");
                    }} 
                    color='primary'
                >
                    Add Friend
                </Button>
                <Button 
                    onClick={() => {
                        toggle();
                        setUsername("");
                        setError("");
                    }}
                >
                    Cancel
                </Button>
            </ModalFooter>
            {error && <Alert color='danger'>{error}</Alert>}
        </Modal>
    )
}

export default AddFriendModal;