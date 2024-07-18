import JSConfetti from 'js-confetti';
import './Home.css'
import { useEffect, useState} from 'react';
import forestImage from '../assets/images/BlackForest-Germany-GettyImages-147180370.webp'

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
                <div className='bannerImage'>
                <div class="jumbotron">
                <h1 class="display-4">Hello, {userInfo.firstName} {userInfo.lastName}!</h1>
                <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr class="my-4"/>
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <p class="lead">
                    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                </p>
                </div>

                </div>
                </div>
                <div>
                    <button onClick={handleClick}>Confetti!</button>
                </div>
            </>
        )
    } else {
        return (
            <div className='centerContent'>
                <img src={forestImage} height='300'/> 
                <h1>User not authenticated</h1>
            </div>
        )
    }
}

export default Home;