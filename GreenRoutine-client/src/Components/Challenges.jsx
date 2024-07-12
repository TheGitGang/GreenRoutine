import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// import { getLocalStorage} from './LocalStorageFunctions';

const Challenges = () => {
    const [userInfo, setUserInfo] = useState({});
    const [challenges, setChallenges] = useState([]);
    const [userChallenges, setUserChallenges] = useState([]);
    const [message, setMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [carbonLb, setCarbonLb] = useState('');
    const navigate = useNavigate();

    //fetching checking user is signed in
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

    //fetching user information and setting it
    useEffect(() => {
        const fetchUserInfo = async () => {
        const response = await fetch('pingauth', {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            setUserInfo(data);
            setError('User info set.')
        } else {
            setError('Could not set user info')
        }
        }
        if(isAuthenticated) {
            fetchUserInfo();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                // Fetching all challenges
                if(userInfo.id){
                    const allChallengesResponse = await fetch('/api/Challenges');
                    if (allChallengesResponse.ok) {
                        const allChallengesData = await allChallengesResponse.json();
                        setChallenges(allChallengesData);
                        setError('User info set');
                    } else {
                        setError('Could not set user info');
                    }

                    if(userInfo.id){
                        const userChallengesResponse = await fetch(`/api/UserChallenge/${userInfo.id}`);
                        if (userChallengesResponse.ok){
                            const userChallengesData = await userChallengesResponse.json();
                            // console.log(userChallengesData);
                            setUserChallenges(userChallengesData);
                            // console.log(userInfo.id);
                            setError('userChallenge set');
                        } else {
                            setError('Could not set userChallenges');
                        }
                    }
                }
            } catch (error) {
                // console.error('Error fetching challenges:', error);
                setMessage(error.message);
            }
        }
        fetchChallenges();
    }, [userInfo.id])


    //Allows user to sign up for challenge
    const ChallengeSignUp = async (challengeId) => {
        const response = await fetch('/api/challenges/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserId: userInfo.id, 
                ChallengeId: challengeId,
            }),
        });
        const result = await response.json();
        if(response.ok) {
            setMessage(`Signed up for challenge: ${challengeId}`);
        } else {
            setMessage(result.message || 'Failed to sign up for the challenge');
            // console.log(user);
            navigate('/thankyou')
        }
    };
    const CarbonImpactBackend = async (challengeId) => {
        const response = await fetch('/api/CarbonInterFace/store-estimate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserId: userInfo.id, 
                ChallengeId: challengeId,
                Carbon_lb: carbonLb,
            }),
        });
        // console.log(body);
        // console.log(userInfo)
        const result = await response.json();
        if(response.ok) {
            console.log(result.data.attributes.carbon_lb)
            setCarbonLb(result.data.attributes.carbon_lb)
            setMessage(`Carbon data registered for challenge: ${challengeId}`);
        } else {
            setMessage(result.message || 'Failed to register carbon data for the challenge');
            // console.log(user);
        }
    };

    const CarbonImpactScreen = async (challengeId, miles) => {
        const response = await fetch('/api/CarbonInterFace/get-estimate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                /*UserId: userInfo.id, 
                ChallengeId: challengeId,*/
                Type: "vehicle",
                DistanceValue: miles,
                DistanceUnit: "mi",
                VehicleModelId: userInfo.modelChoice,
            }),
        });
        // console.log(body);
        // console.log(userInfo)
        const result = await response.json();
        if(response.ok) {
            console.log(result.data.attributes.carbon_lb)
            setCarbonLb(result.data.attributes.carbon_lb)
            setMessage(`Carbon data registered for challenge: ${challengeId}`);
        } else {
            setMessage(result.message || 'Failed to register carbon data for the challenge');
            // console.log(user);
        }
    };

    const renderChallenges = (challengesToRender, isUserChallenge) => {
        return (
            <>
                <p>There are {challengesToRender.length} challenges in the DB</p> 
                <div>
                    {challengesToRender.map((challenge, index) => (
                        <div className="card" key={index}>
                            <h5 className="card-title">{challenge.name}</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Difficulty: {challenge.difficulty}</li>
                                <li className="list-group-item">Length: {challenge.length}</li>
                                <li className="list-group-item">Description: {challenge.description}</li>
                                <li className="list-group-item">Miles: {challenge.miles}</li>
                            </ul>
                            {isUserChallenge ? (
                                <p>You are signed up for this challenge. Assign Carbon Impact <button onClick={() => CarbonImpactScreen(challenge.id, challenge.miles)}> Here</button>{carbonLb} lbs <button onClick={() => CarbonImpactBackend(challenge.id)}>Send to DB</button></p>
                            ) : (
                                <button onClick={() => ChallengeSignUp(challenge.id)}>Sign Up</button>
                            )}
                        </div>
                    ))}
                </div>
                {message && <p>{message}</p>}
    
            </>
        );
    }

    
    const userChallengeIds = userChallenges.map(userChallenge => userChallenge.challengeId);
    const userChallengesToRender = challenges.filter(challenge => userChallengeIds.includes(challenge.id));
    const availableChallengesToRender = challenges.filter(challenge => !userChallengeIds.includes(challenge.id));

    // console.log(userChallengeIds);
    
    
    return (
        <>
            <h2>Your Challenges</h2>
            <div>{renderChallenges(userChallengesToRender, true)}</div>


            <h2>Available Challenges</h2>
            <div>{renderChallenges(availableChallengesToRender, false)}</div>
            {message && <p>{message}</p>}
        </>
    );
};
export default Challenges;


{/* <div>
    <div>
        <h1>
            Delete Options
        </h1>
        <div>
            <div>
                <div>
                    <input
                        type="radio"
                        id="option1"
                        value="option1"
                        checked={
                            selectedValue ===
                            "option1"
                        }
                        onChange={() =>
                            handleRadioChange(
                                "option1"
                            )
                        }
                    />
                    <label htmlFor="option1">
                        ReactJS
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        id="option2"
                        value="option2"
                        checked={
                            selectedValue ===
                            "option2"
                        }
                        onChange={() =>
                            handleRadioChange(
                                "option2"
                            )
                        }
                    />
                    <label htmlFor="option2">
                        NextJs
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        id="option3"
                        value="option3"
                        checked={
                            selectedValue ===
                            "option3"
                        }
                        onChange={() =>
                            handleRadioChange(
                                "option3"
                            )
                        }
                    />
                    <label htmlFor="option3">
                        React Native
                    </label>
                </div>
            </div>
        </div>
    </div>
</div> */}