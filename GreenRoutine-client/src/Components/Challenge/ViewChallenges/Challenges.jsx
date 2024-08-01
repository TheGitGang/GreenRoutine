import { useState, useEffect } from 'react';
import './Challenges.css'
import AvailableChallenges from './ChallengeComponents/AvailableChallenges';
import YourChallenges from './ChallengeComponents/YourChallenges';
import CompletedChallenges from './ChallengeComponents/CompletedChallenges';
import Search from './ChallengeComponents/Search';
import ElectricityEstimateButton from '../../ElectricityEstimateButton';
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
                    setError('All challenges set');
                } else {
                    setError('Could not set all challenges');
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


    // //Allows user to sign up for challenge
    // const ChallengeSignUp = async (challengeId, challengeType) => {
    //     const response = await fetch('/api/challenges/signup', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             UserId: userInfo.id, 
    //             GlobalChallengeId: challengeType === 'global'? challengeId : null,
    //             PersonalChallengeId: challengeType === 'personal'? challengeId : null
    //         }),
    //     });
    //     const result = await response.json();
    //     if(response.ok) {
    //         setMessage(`Signed up for challenge: ${challengeId}`);
    //         fetchChallenges();
    //     } else {
    //         setMessage(result.message || 'Failed to sign up for the challenge');
    //         navigate('/thankyou')
    //     }
    // };

   

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
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
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
                    fetchChallenges={fetchChallenges}
                    />
                </TabPane>
                <TabPane tabId="2">
                    <CompletedChallenges
                        challenges={challenges} 
                        userChallenges={userChallenges} 
                        userInfo={userInfo} 
                    />
                </TabPane>
                <TabPane tabId="3">
                    <AvailableChallenges 
                        challenges={challenges} 
                        userChallenges={userChallenges} 
                        userInfo={userInfo}
                        fetchChallenges={fetchChallenges} 
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
