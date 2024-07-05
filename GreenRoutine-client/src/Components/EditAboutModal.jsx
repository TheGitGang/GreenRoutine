import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Label, Col, Row } from "reactstrap";
import { useState } from 'react'

const EditAboutModal = ({ isOpen, toggle, user }) => {

    const [pronouns, setPronouns] = useState(user.pronouns);
    const [email, setEmail] = useState(user.email);
    const [bio, setBio] = useState(user.bio);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'pronouns') setPronouns(value);
        if (name === 'email') setEmail(value);
        if (name === 'bio') setBio(value);
        if (name === 'firstName') setFirstName(value);
        if (name === 'lastName') setLastName(value);
    }


    const handleSubmit = () => {
        console.log('this is working');
        toggle();
    }



    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit User Info</ModalHeader>
                <ModalBody>
                    <form>
                        <Row>
                            <Col>
                                <Label htmlFor='firstName'>First Name:</Label>
                                <Input 
                                    type='text'
                                    id='firstName'
                                    name='firstName'
                                    value={firstName}
                                    placeholder={firstName}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col>
                                <Label htmlFor='lastName'>First Name:</Label>
                                <Input 
                                    type='text'
                                    id='lastName'
                                    name='lastName'
                                    value={lastName}
                                    placeholder={lastName}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label htmlFor='email'>Email:</Label>
                                <Input 
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={email}
                                    placeholder={email}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col>
                                <Label htmlFor='pronouns'>Pronouns:</Label>
                                <Input 
                                    type='text'
                                    id='pronouns'
                                    name='pronouns'
                                    value={pronouns}
                                    placeholder={pronouns}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label htmlFor='bio'>Bio:</Label>
                                <Input 
                                    type='textarea'
                                    id='bio'
                                    name='bio'
                                    value={bio}
                                    placeholder={bio}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit}color='primary'>Submit</Button>
                    <Button onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default EditAboutModal;