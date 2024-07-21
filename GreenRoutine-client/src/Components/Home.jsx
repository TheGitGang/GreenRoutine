import JSConfetti from 'js-confetti';
import './Home.css'
import { useEffect, useState} from 'react';
import { setLocalStorage } from './LocalStorageFunctions';
import ChallengeRequests from './ChallengeRequests';

const Home = () => {

    const [userInfo, setUserInfo] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

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
                    
                    setLocalStorage('userInfo', data);

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

    const handleClick = () => {
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
    }
    
    if (isAuthenticated) {
        return (
            <>
                <div className='centerContent'>
                    <h1>Hello, {userInfo.firstName} {userInfo.lastName}!</h1>
                </div>
                <div>
                    <ChallengeRequests userId={userInfo.id}/>
                </div>
            </>
        )
    } else {
        return (
            <div className='centerContent'>
                <h1>User not authenticated</h1>
            </div>
        )
    }
}

export default Home;