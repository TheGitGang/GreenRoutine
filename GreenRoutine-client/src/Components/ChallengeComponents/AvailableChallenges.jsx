import react from 'react'
import { Button, Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import './ChallengeStyling.css'

const AvailableChallenges = ({ challenges, userChallenges, userInfo} ) => {
    //Allows user to sign up for challenge
    const ChallengeSignUp = async (challengeId) => {
        const response = await fetch('/api/challenges/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserId: userInfo.id, 
                PersonalChallengeId: challengeId
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

    const renderChallenges = (challengesToRender, isUserChallenge, user) => {
        return (
            <>
                <p>There are {challengesToRender.length} challenges in the DB</p> 
                <div>
                    {challengesToRender.map((challenge, index) => (
                        <Card className="lightgrey-card spacer" key={index}>
                            <CardBody>
                            <CardTitle className="card-title lightgrey-card">{challenge.name}</CardTitle>
                            </CardBody>
                            <ListGroup className="list-group list-group-flush lightgrey-card">
                                <ListGroupItem className="list-group-item lightgrey-card">Difficulty: {challenge.difficulty}</ListGroupItem>
                                <ListGroupItem className="list-group-item lightgrey-card">Length: {challenge.length}</ListGroupItem>
                                <ListGroupItem className="list-group-item lightgrey-card">Description: {challenge.description}</ListGroupItem>
                                <ListGroupItem className="list-group-item lightgrey-card">Miles: {challenge.miles}</ListGroupItem>
                                <p>{challenge.challengeId}Apples</p>
                            </ListGroup>
                                <Button onClick={() => ChallengeSignUp(challenge.challengeId, 'personal')}>Sign Up</Button>
                        </Card>
                    ))}
                </div>
    
            </>
        );
    }
    const personalChallengeIds = userChallenges.map(userChallenge => userChallenge.personalChallengeId);
    const availableChallengesToRender = challenges.filter(challenge => !personalChallengeIds.includes(challenge.challengeId));

    return (
        <>
           
            <div>
            <br/>
            <h2>Available Challenges</h2>
                {renderChallenges(availableChallengesToRender, false)}</div>
        </>
    )
};

export default AvailableChallenges;