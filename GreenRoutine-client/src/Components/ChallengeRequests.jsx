import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

const ChallengeRequests = ({ userId }) => {
    const [challengeRequests, setChallengeRequests] = useState([]);
    const [error, setError] = useState("");

    const fetchChallengeRequests = async () => {
        const response = await fetch(`api/Friend/${userId}/GetChallengeRequests`, {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            setChallengeRequests(data)
        } else {
            setError('Unable to fetch challenge requests')
        }
    };

    useEffect(() => {
        if (userId) {
            fetchChallengeRequests();
        }
    }, [userId]);

    const mappedRequests = challengeRequests.map((challengeRequest) => {
        if (challengeRequest.personalChallengeId !== null) {
            return (
                <li key={challengeRequest.id}>
                    <Card>
                        <CardBody>
                            <p>From: {challengeRequest.senderName}</p>
                            <p>Message: {challengeRequest.message}</p>
                            <p>Leaves Wagered: {challengeRequest.wageredLeaves}</p>
                        </CardBody>
                    </Card>
                </li>
                
            )
        }
        
    })
    
    return (
        <Card className="lightgrey-card">
            <CardTitle>
                Challenge Requests
            </CardTitle>
            <CardBody>
                <ul className="no-bullets-on-list">
                    {mappedRequests}
                </ul>
            </CardBody>
        </Card>
    )
};

export default ChallengeRequests;