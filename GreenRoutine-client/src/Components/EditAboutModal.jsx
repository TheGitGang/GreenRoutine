import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Label, Col, Row, Alert } from "reactstrap";
import { useState, useEffect } from 'react'

const EditAboutModal = ({ isOpen, toggle, user, userId, setUserInfo, fetchUserInfo }) => {

    const [pronouns, setPronouns] = useState(user.pronouns);
    const [email, setEmail] = useState(user.email);
    const [bio, setBio] = useState(user.bio);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            setPronouns(user.pronouns || '');
            setEmail(user.email || '');
            setBio(user.bio || '');
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'pronouns') setPronouns(value);
        if (name === 'email') setEmail(value);
        if (name === 'bio') setBio(value);
        if (name === 'firstName') setFirstName(value);
        if (name === 'lastName') setLastName(value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email) {
            setError("First name, last name, and email are required.")
        } else {
            setError("");
            const payload = {
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                email: email,
                bio: bio,
                pronouns: pronouns
            }
            const response = await fetch("/api/Account/updateUserInfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                await fetchUserInfo();
                toggle();
            } else {
                setError('Can not update user info')
            }
        }
        //toggle();
    }

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader>Edit User Info</ModalHeader>
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
                                <Label htmlFor='lastName'>Last Name:</Label>
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
                    <Button onClick={() => {
                            toggle();
                            setError("");
                            setBio(user.bio);
                            setFirstName(user.firstName);
                            setLastName(user.lastName);
                            setEmail(user.email);
                            setPronouns(user.pronouns);
                        }}>
                        Cancel
                    </Button>
                </ModalFooter>
                {error && <Alert color='danger' className="mr-2 ml-2">{error}</Alert>}
            </Modal>
        </div>
    );
};

export default EditAboutModal;