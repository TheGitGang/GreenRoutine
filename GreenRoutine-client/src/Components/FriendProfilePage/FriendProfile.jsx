import FriendAboutCard from "./FriendAboutCard";
import { Row, Col, Alert } from "reactstrap";
import UserStatisticsCard from "../ProfilePage/UserStatisticsCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FriendProfilePhoto from "./FriendProfilePhoto";

const FriendProfile = () => {
    const { id } = useParams();
    const [friendInfo, setFriendInfo] = useState(null);
    const [error, setError] = useState("");

    const fetchFriendInfo = async () => {
        const response = await fetch(`/api/Friend/${id}/getFriendInfo`, {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            setFriendInfo(data);
            console.log(data);
        } else {
            setError("Unable to get friend info.")
        }
    }

    

    useEffect(() => {
        if (id) {
            fetchFriendInfo();
        }
    }, [id])

    if (!friendInfo) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Row>
                <Col xs={3}>
                    <FriendProfilePhoto user={friendInfo} id={id}/>
                </Col>
                <Col>
                    <FriendAboutCard user={friendInfo}/>
                </Col>   
            </Row>
            <Row>
                <Col>
                    <UserStatisticsCard user={friendInfo}/>
                </Col>
            </Row>
            {error && <Alert color="danger">{error}</Alert>}
        </>
    )
};

export default FriendProfile;