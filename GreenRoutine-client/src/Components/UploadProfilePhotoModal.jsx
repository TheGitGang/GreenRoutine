import { useState } from "react";
import { Modal, ModalHeader, ModalBody, Row, Col, Label, Input, Button, ModalFooter, Form, Alert } from 'reactstrap'

const UploadProfilePhotoModal = ({ isOpen, toggle, userId, onPhotoUpload, fetchUserPhoto }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (e) => {
            e.preventDefault();
            if (!file) {
                setError('Please select a file');
                return;
            }
    
            const formData = new FormData();
            formData.append('profilePhoto', file);
            formData.append('userId', userId);
    
            const response = await fetch(`/api/Account/UploadProfilePhoto`, {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                const data = await response.json();
                const photoUploaded = await onPhotoUpload(data);
                if (photoUploaded) {
                    fetchUserPhoto();
                    toggle();
                }
            } else {
                setError('Failed to upload photo');
            }
    };

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Upload Profile Photo</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col>
                                <Label htmlFor='profilePhoto'>Profile Photo:</Label>
                                <Input
                                    type='file'
                                    id='profilePhoto'
                                    name='profilePhoto'
                                    onChange={handleFileChange}
                                />
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit}color='primary'>Upload</Button>
                    <Button onClick={toggle}>Cancel</Button>
                </ModalFooter>
                {error && <Alert className="danger">{error}</Alert>}
            </Modal>
        </div>
    )
}

export default UploadProfilePhotoModal;