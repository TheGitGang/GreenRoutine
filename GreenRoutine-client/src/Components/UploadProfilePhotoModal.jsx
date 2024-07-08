import { useState } from "react";
import { Modal, ModalHeader, ModalBody, Row, Col, Label, Input, Button, ModalFooter, Form } from 'reactstrap'

const UploadProfilePhotoModal = ({ isOpen, toggle }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = () => {
        console.log('File upload');
        toggle();
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
                                    value={selectedFile}
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
            </Modal>
        </div>
    )
}

export default UploadProfilePhotoModal;