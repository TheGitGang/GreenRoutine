import { useState, useEffect } from 'react';
import './Challenges.css'
import AvailableChallenges from './ChallengeComponents/AvailableChallenges';
import YourChallenges from './ChallengeComponents/YourChallenges';
import CompletedChallenges from './ChallengeComponents/CompletedChallenges'
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';

import { useNavigate } from "react-router-dom";

const Challenges = () => {
    const [userInfo, setUserInfo] = useState({});
    const [challenges, setChallenges] = useState([]);
    const [userChallenges, setUserChallenges] = useState([]);
    const [message, setMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [carbonLb, setCarbonLb] = useState('');
    const [activeTab, setActiveTab] = useState('1');
    const navigate = useNavigate();

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
                        setUserChallenges(userChallengesData);
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
            fetchChallenges();
        } else {
            setError('Could not set user info')
        }
        }
        if(isAuthenticated) {
            fetchUserInfo();
        }
    }, [isAuthenticated]);

   

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            fetchChallenges();
        }
    };

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
            fetchChallenges();
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

    //TODO SONNIE 1: Rework how challenges are displayed. Possibly changing system in which they are rendered because it's ugly atm
    //TODO SONNIE 2: Make it so that page re-renders when a user signs up for a challenge or completes it.
    //TODO SONNIE 3: Possibly adding items to state so that they re-render on page  
    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink 
                    className={activeTab === '1' ? 'active': ''}
                    onClick={() => { toggleTab('1'); }}
                    >Your Challenges
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                    className={activeTab === '2' ? 'active': ''}
                    onClick={() => { toggleTab('2'); }}
                    >Completed Challenges
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                    className={activeTab === '3' ? 'active': ''}
                    onClick={() => { toggleTab('3'); }}
                    >Available Challenges
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <YourChallenges
                    challenges={challenges}
                    userChallenges={userChallenges}
                    userInfo={userInfo} 
                    CarbonImpactScreen={CarbonImpactScreen} 
                    CarbonImpactBackend={CarbonImpactBackend} 
                    carbonLb={carbonLb}
                    fetchChallenges={fetchChallenges}/>
                </TabPane>
                <TabPane tabId="2">
                    <CompletedChallenges
                        challenges={challenges} 
                        userChallenges={userChallenges} 
                        userInfo={userInfo} 
                        CarbonImpactScreen={CarbonImpactScreen} 
                        carbonLb={carbonLb}
                    />
                </TabPane>
                <TabPane tabId="3">
                    <AvailableChallenges 
                        challenges={challenges} 
                        userChallenges={userChallenges} 
                        userInfo={userInfo} 
                        ChallengeSignUp={ChallengeSignUp} 
                    />
                </TabPane>
            </TabContent>
        </div>
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