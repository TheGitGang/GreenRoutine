import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card } from "reactstrap";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
    }

    const handleSignupClick = () => {
        navigate('/register')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('All fields are required.')
        } else {
            let loginURL = '/login?useCookies=true'
            setError('');
            const payload = {
                email: username,
                password: password
            }
            console.log(payload)
            fetch(loginURL, { //api/Account/login
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .then((data) => {
                console.log(data);
                if (data.ok) {
                    setError("Successful login.")
                    window.location.href = '/'
                } else {
                    setError("Invalid password or username.")
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
                    <label htmlFor='username'>Username:</label>
                </div>
                <div>
                    <input
                        type='username'
                        id='username'
                        name='username'
                        value={username}
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