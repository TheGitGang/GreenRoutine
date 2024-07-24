import { useState, useEffect } from 'react';
import './Challenges.css'
import AvailableChallenges from './ChallengeComponents/AvailableChallenges';
import YourChallenges from './ChallengeComponents/YourChallenges';
import CompletedChallenges from './ChallengeComponents/CompletedChallenges';
import Search from './ChallengeComponents/Search';
import ElectricityEstimateButton from './ElectricityEstimateButton';
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
            setMessage(error.message);
        }
    }

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
    useEffect(() => {
        fetchChallenges();
    }, [userInfo.id, isAuthenticated]);

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            fetchChallenges();
        }
    };

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
        const result = await response.json();
        if(response.ok) {
            console.log(result.data.attributes.carbon_lb)
            setCarbonLb(result.data.attributes.carbon_lb)
            setMessage(`Carbon data registered for challenge: ${challengeId}`);
        } else {
            setMessage(result.message || 'Failed to register carbon data for the challenge');
        }
    };

    const CarbonImpactScreen = async (challengeId, miles) => {
        const response = await fetch('/api/CarbonInterFace/get-estimate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Type: "vehicle",
                DistanceValue: miles,
                DistanceUnit: "mi",
                VehicleModelId: userInfo.modelChoice,
            }),
        });
        const result = await response.json();
        if(response.ok) {
            console.log(result.data.attributes.carbon_lb)
            setCarbonLb(result.data.attributes.carbon_lb)
            setMessage(`Carbon data registered for challenge: ${challengeId}`);
        } else {
            setMessage(result.message || 'Failed to register carbon data for the challenge');
        }
    };

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink 
                    className={activeTab === '1' ? 'active': 'cursor-pointer'}
                    onClick={() => { toggleTab('1'); }}
                    >Your Challenges
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                    className={activeTab === '2' ? 'active': 'cursor-pointer'}
                    onClick={() => { toggleTab('2'); }}
                    >Completed Challenges
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                    className={activeTab === '3' ? 'active': 'cursor-pointer'}
                    onClick={() => { toggleTab('3'); }}
                    >Available Challenges
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                    className={activeTab === '4' ? 'active': 'cursor-pointer'}
                    onClick={() => { toggleTab('4'); }}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
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
                    {userChallenges.map((challenge) => (
                        <div key={challenge.id}>
                            {/* Render other challenge details here */}
                            <ElectricityEstimateButton 
                                challengeId={challenge.id} 
                                userInfo={userInfo} 
                                fetchChallenges={fetchChallenges} 
                            />
                        </div>
                    ))}
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
                <TabPane tabId="4">
                    <Search />
                </TabPane>
            </TabContent>
        </div>
    );
};

export default Challenges;
