import { useState } from 'react';

import { Button, Col, Form, Input, Row } from 'reactstrap';

const UploadForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('/api/Account/UploadProfilePicture', {
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className='mt-3'>
                <Col>
                    <Input type='file' onChange={handleFileChange} />
                </Col>
                <Col xs= '2'>
                    <Button type='submit'>Upload</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default UploadForm;