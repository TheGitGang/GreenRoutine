import { useState, useEffect } from 'react';
import CompleteChallengeButton from './CompleteChallengeButton';

const Challenges = () => {
    const [userInfo, setUserInfo] = useState({});
    const [challenges, setChallenges] = useState([]);
    const [userChallenges, setUserChallenges] = useState([]);
    const [message, setMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

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
        }
    };

    const CarbonImpact = async (challengeId, miles) => {
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
        console.log(userInfo)
        const result = await response.json();
        if(response.ok) {
            console.log(response)
            setMessage(`Carbon data registered for challenge: ${challengeId}`);
        } else {
            setMessage(result.message || 'Failed to register carbon data for the challenge');
            // console.log(user);
        }
    };

    //TODO SONNIE 1: Rework how challenges are displayed. Possibly changing system in which they are rendered because it's ugly atm
                //When challenges are complete they should no longer appear in your challenges
    //TODO SONNIE 2: Make it so that page re-renders when a user signs up for a challenge or completes it.

    const renderChallenges = (challengesToRender, isUserChallenge, user) => {
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
                            {!challenge.ChallengeCompleted && isUserChallenge && (
                                <CompleteChallengeButton challengeId={challenge.id} userId={user.id}/>)}

                            {isUserChallenge ? (
                                <p>You are signed up for this challenge. Assign Carbon Impact <button onClick={() => CarbonImpact(challenge.id, challenge.miles)}> Here</button></p>
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

    //gets challengeid for challenges in user challenge
    const userChallengeIds = userChallenges.map(userChallenge => userChallenge.challengeId);
    const userChallengesToRender = challenges.filter(challenge => userChallengeIds.includes(challenge.id));
    
    const noncompletedUserChallengeIds = userChallenges.filter(userChallenge => !userChallenge.challengeCompleted).map(userChallenge => userChallenge.challengeId);
    const noncompletedChallengesToRender = challenges.filter(challenge => noncompletedUserChallengeIds.includes(challenge.id));

    console.log(noncompletedChallengesToRender);
    
    //actually filters challenges user is signed up for into a seperate array
    
    const completedUserChallengeIds = userChallenges.filter(userChallenge => userChallenge.challengeCompleted).map(userChallenge => userChallenge.challengeId);
    const completedChallengesToRender = challenges.filter(challenge => completedUserChallengeIds.includes(challenge.id));

    //filters challenges to only include ones not in user challenges
    const availableChallengesToRender = challenges.filter(challenge => !userChallengeIds.includes(challenge.id));

    // console.log(userChallengeIds);
    
    
    return (
        <>
            <h2>Your Challenges</h2>
            <div>{renderChallenges(noncompletedChallengesToRender, true, userInfo)}</div>
            <h2>Completed Challenges</h2>
            <div>{renderChallenges(completedChallengesToRender, true, userInfo)}</div>

            <h2>Available Challenges</h2>
            <div>{renderChallenges(availableChallengesToRender, false, userInfo)}</div>
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