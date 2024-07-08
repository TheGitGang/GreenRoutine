import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form, Input, Label, Row, Col, CardHeader, CardBody } from "reactstrap";

const RegisterForm = () => {
    //state variables for email, first, last names, passwords
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    //state variable for error messages
    const [error, setError] = useState('');

    const handleLoginClick = () => {
        navigate('/login')
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'firstName') setFirstName(value);
        if (name === 'lastName') setLastName(value);
        if (name === 'password') setPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);
        if (name === 'username') setUsername(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //validate email, firstname, lastname and passwords
        if (!email || !firstName || !lastName || !password || !confirmPassword || !username) {
            setError('Please fill in all fields.');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { //tests to see if email follows an email format
            setError('Please enter a valid email address.')
        } else if (password !== confirmPassword) {
            setError('Passwords do not match')
        } else {
            //clear error message
            setError('');
            const payload = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                confirmPassword: confirmPassword,
                username: username
            }
            console.log(payload);
            fetch('api/Account/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }).then((data) => {
                //handle success or error from the server
                console.log(data);
                if (data.ok) {
                    setError("Successful registration.")
                    navigate('/login')
                } else {
                    setError("Error with registration.")
                }
            }).catch((error) => {
                //handle network error
                console.error(error);
                setError('Error with registration.')
            })
        }
    }

    return (
        <div>
            <Card className='lightgrey-card w-100'>
                <CardHeader className='center-content'>
                    <h3 className='pt-2'>Create an Account</h3>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Label htmlFor='firstName'>First Name:</Label>
                                <Input
                                    type='text'
                                    id='firstName'
                                    name='firstName'
                                    value={firstName}
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
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col>
                                <Label htmlFor='username'>Username:</Label>
                                <Input 
                                    type='text' 
                                    id='username' 
                                    name='username' 
                                    value={username} 
                                    onChange={handleChange} 
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label htmlFor='password'>Password:</Label>
                                <Input
                                    type='password'
                                    id='password'
                                    name='password'
                                    value={password}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col>
                                <Label htmlFor='confirmPassword'>Confirm Password:</Label>
                                <Input
                                    type='password'
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <div className='center-content pt-3'>
                            <Button color="primary">Register</Button>
                        </div>
                    </Form>
                    <hr />
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <p>Already have an account?</p>
                        <Button onClick={handleLoginClick} color='success'>Go to Login</Button>
                    </div>
                    <br />
                    {error && <Alert color='danger'>{error}</Alert>}
                </CardBody>     
                
            </Card>
        </div>
    )
};

export default RegisterForm;