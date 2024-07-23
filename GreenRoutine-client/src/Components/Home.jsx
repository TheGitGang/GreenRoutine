import '../App.css'
import { useEffect, useState} from 'react';
import forestImage from '../assets/images/BlackForest-Germany-GettyImages-147180370.webp'
import { Button } from 'reactstrap'
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [userInfo, setUserInfo] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIsAuthenticated = async () => {
            try {
                const response = await fetch('api/Account/IsUserAuthenticated', {
                    method: "GET"
                });

                if (response.ok) {
                    setIsAuthenticated(true)
                }
            } catch (error) {
                setError('An error occurred while fetching data.');
            }
        };
        fetchIsAuthenticated();
    }, []);

    useEffect(() => {
        if (isAuthenticated && !userInfo.id) {
            const fetchUserInfo = async () => {
                const response = await fetch('pingauth', {
                    method: "GET"
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                    console.log(data);

                    setError('User info set.')
                } else {
                    setError('Could not set user info')
                }
            }
            fetchUserInfo();
        } else {
            setError('User is not authenticated.')
        }
    }, [isAuthenticated])

    const handleSignupClick = () => {
        navigate('/register')
    }

    const handleChallengeClick = () => {
        navigate('/challenge')
    }
    
    if (isAuthenticated) {
        return (
            <div className="home-page">
                <div className='bannerContainer'>
                    <img src={forestImage} alt='Image of forest' className="bannerImage" />
                
                <div className='centerContent'>
                    <div class="jumbotron home-text home-card">
                    <h1 class="display-4">Hello, {userInfo.firstName} {userInfo.lastName}!</h1>
                    <hr class="my-4"/>
                    <p>Click here for some more challenges!</p>
                    <Button color="success"onClick={handleChallengeClick}>Challenges!</Button>
                    </div>
                <div>
                </div>
                </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="home-page">
            <div className='bannerContainer'>
                <img src={forestImage} alt='Image of forest' className="bannerImage" />
            
            <div className='centerContent'>
                <div class="jumbotron home-text home-card">
                <h1 class="display-4">Welcome to Green Routine!</h1>
                <hr class="my-4"/>
                <p>Where we're reducing environmental impact through changes in daily habits through challenges</p>
                <p>Join us!</p>
                <Button color="success"onClick={handleSignupClick}>Sign Up!</Button>
                </div>
            <div>
            </div>
            </div>
            </div>
        </div>
        )
    }
}

export default Home;