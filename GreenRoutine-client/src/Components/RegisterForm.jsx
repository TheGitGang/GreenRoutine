import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "reactstrap";

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
            <h3>Register an Account</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='firstName'>First Name:</label>
                </div>
                <div>
                    <input
                        type='text'
                        id='firstName'
                        name='firstName'
                        value={firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='lastName'>Last Name:</label>
                </div>
                <div>
                    <input
                        type='text'
                        id='lastName'
                        name='lastName'
                        value={lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                </div>
                <div>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='username'>Username:</label>
                </div>
                <div>
                    <input type='text' id='username' name='username' value={username} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                </div>
                <div>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                </div>
                <div>
                    <input
                        type='password'
                        id='confirmPassword'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <br/>
                <div>
                    <Button color="primary">Register</Button>
                </div>
            </form>
            <br/>
            <div>
                    <p>Already have an account?</p>
                    <Button onClick={handleLoginClick}>Go to Login</Button>
            </div>
            <br/>
            {error && <Alert color='danger'>{error}</Alert>}
        </div>
    )
};

export default RegisterForm;