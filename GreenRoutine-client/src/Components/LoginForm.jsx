import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card } from "reactstrap";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    }

    const handleSignupClick = () => {
        navigate('/register')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('All fields are required.')
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.')
        } else {
            //clear error message
            setError('');
            const payload = {
                email: email,
                password: password
            }
            console.log(payload)
            fetch('api/Account/Login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }).then((response => response.json()))
            .then((data) => {
                console.log(data);
                if (data.ok) {
                    setError("Successful login.")
                    navigate('/')
                } else {
                    setError("Error with login.")
                }
            }).catch((error) => {
                console.error(error);
                setError('Error with login.')
            })
        }
    }

    return (
        <div className="center-content">
        <Card className='centered-card p-3'>
            <h3>Login to Your Account</h3>
            <form onSubmit={handleSubmit}>
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
                <br/>
                <div>
                    <Button color='primary'>Login</Button>
                </div>
            </form>
            <br/>
            <div>
                    <p>Don't have an account?</p>
                    <Button onClick={handleSignupClick}>Sign Up!</Button>
            </div>
            <br/>
            {error && <Alert color='danger'>{error}</Alert>}
        </Card>
        </div>
    );
};

export default LoginForm;