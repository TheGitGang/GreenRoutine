import AboutCard from './AboutCard';
import ProfilePhoto from './ProfilePhoto';
import UploadForm from './UploadForm';
import './Profile.css'
import profileImg from '../assets/images/ProfilePlaceholder.jpg'
import UserStatisticsCard from './UserStatisticsCard';
import { Col, Row } from 'reactstrap';
import FriendsList from './FriendsList';
import { useState, useEffect } from 'react';
//dummy data
const dummyUser = {
    profileImg: profileImg
}

const Profile = () => {
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

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserInfo();
        } else {
            setError('User is not authenticated.')
        }
    }, [isAuthenticated])

    if (!userInfo) {
        return <p>Loading...</p>;
    }
    return (
        <>
        {userInfo.makeChoice}
            <Row>
                <Col xs={3}>
                    <ProfilePhoto user={userInfo} userId={userInfo.id} photo={dummyUser.profileImg}/>
                </Col>
                <Col>
                    <AboutCard user={userInfo} userId={userInfo.id} setUserInfo={setUserInfo} fetchUserInfo={fetchUserInfo}/>
                </Col>   
            </Row>
            <Row>
                <Col>
                    <UserStatisticsCard user={userInfo}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FriendsList userId={userInfo.id}/>
                </Col>
            </Row>
        </>
    )
}

export default Profile;