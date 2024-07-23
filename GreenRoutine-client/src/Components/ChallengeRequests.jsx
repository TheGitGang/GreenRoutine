import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardTitle, Col, Row, Button } from "reactstrap";

const ChallengeRequests = () => {
    const [challengeRequests, setChallengeRequests] = useState([]);
    const [userId, setUserId] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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
        const fetchUserId = async () => {
            const response = await fetch('pingauth', {
                method: "GET"
            });
            if (response.ok) {
                const data = await response.json();
                setUserId(data.id);
                setError("");
            } else {
                setError("Unable to get user id");
            }
        }
        fetchUserId();
    }, [isAuthenticated])

    useEffect(() => {
        if (userId) {
            fetchChallengeRequests();
        }
    }, [userId]);

    const handleAccept = async (requestId, accepted) => {
        const payload = {
            userId: userId,
            challengeRequestId: requestId,
            accepted: accepted
        }
        const response = await fetch('/api/Friend/AcceptOrDecline', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            setChallengeRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
        } else {
            setError("Error with accept")
        }
    };

    const handleDecline = async (requestId, accepted) => {
        const payload = {
            userId: userId,
            challengeRequestId: requestId,
            accepted: accepted
        }
        const response = await fetch('/api/Friend/AcceptOrDecline', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            setChallengeRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
        } else {
            setError("Error with decline")
        }
    };

    const mappedRequests = challengeRequests.map((challengeRequest) => {
        if (challengeRequest.personalChallengeId !== null) {
            const timeSpan = challengeRequest.personalChallengeTimeSpan === "1.00:00:00" ? "1 day" :
                    challengeRequest.personalChallengeTimeSpan === "3.00:00:00" ? "3 days" :
                        challengeRequest.personalChallengeTimeSpan === "7.00:00:00" ? "1 week" :
                            challengeRequest.personalChallengeTimeSpan;
            return (
                <li key={challengeRequest.id} className='mb-2'>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col xs={4}>
                                    <h6>From: {challengeRequest.senderName}</h6>
                                    <p className='request-detail'>Message: {challengeRequest.message || `${challengeRequest.senderName} sent you a challenge!`}</p>
                                    <p className='request-detail'>Leaves Wagered: {challengeRequest.wageredLeaves || 0}</p>
                                    <div className='d-flex'>
                                        <Button color='primary' className="me-1 mt-1" onClick={() => handleAccept(challengeRequest.id, true)}>
                                            Accept
                                        </Button>
                                        <Button color='danger' className="ms-1 mt-1" onClick={() => handleDecline(challengeRequest.id, false)}>
                                            Decline
                                        </Button>
                                    </div>
                                </Col>
                                <Col xs={8}>
                                    <h6>
                                        <strong>Challenge Details</strong>
                                    </h6>
                                    <p className='request-detail'>Name: {challengeRequest.personalChallengeName}</p>
                                    <p className='request-detail'>Description: {challengeRequest.personalChallengeDescription}</p>
                                    <p className='request-detail'>Timespan: {timeSpan}</p>
                                    <p className='request-detail'>Difficulty: {challengeRequest.personalChallengeDifficulty}</p>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </li>   
            )
        } else {
            const timeSpan = challengeRequest.globalChallengeTimeSpan === "1.00:00:00" ? "1 day" :
                    challengeRequest.globalChallengeTimeSpan === "3.00:00:00" ? "3 days" :
                        challengeRequest.globalChallengeTimeSpan === "7.00:00:00" ? "1 week" :
                            challengeRequest.globalChallengeTimeSpan;
            return (
                <li key={challengeRequest.id} className='mb-2'>
                    <Card >
                        <CardBody>
                            <Row>
                                <Col>
                                    <h6>From: {challengeRequest.senderName}</h6>
                                    <p className='request-detail'>Message: {challengeRequest.message || `${challengeRequest.senderName} sent you a challenge!`}</p>
                                    <p className='request-detail'>Leaves Wagered: {challengeRequest.wageredLeaves || 0}</p>
                                    <div className='d-flex'>
                                        <Button color='primary' className="me-1 mt-1" onClick={() => handleAccept(challengeRequest.id, true)}>
                                            Accept
                                        </Button>
                                        <Button color='danger' className="ms-1 mt-1" onClick={() => handleDecline(challengeRequest.id, false)}>
                                            Decline
                                        </Button>
                                    </div>
                                </Col>
                                <Col>
                                    <h6>
                                        <strong>Challenge Details</strong>
                                    </h6>
                                    <p className='request-detail'>Name: {challengeRequest.globalChallengeName}</p>
                                    <p className='request-detail'>Description: {challengeRequest.globalChallengeDescription}</p>
                                    <p className='request-detail'>Timespan: {timeSpan}</p>
                                    <p className='request-detail'>Difficulty: {challengeRequest.globalChallengeDifficulty}</p>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </li>
            )   
        }
        
    })
    
    return (
        <Card className="lightgrey-card">
            <CardTitle className="display-6 text-center mt-2">
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