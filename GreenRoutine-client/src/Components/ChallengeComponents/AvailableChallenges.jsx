import react from 'react'
import { Button, Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import './ChallengeStyling.css'

const AvailableChallenges = ({ challenges, userChallenges, userInfo, ChallengeSignUp} ) => {
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
                            </ListGroup>
                                <Button onClick={() => ChallengeSignUp(challenge.id)}>Sign Up</Button>
                        </Card>
                    ))}
                </div>
    
            </>
        );
    }
    const userChallengeIds = userChallenges.map(userChallenge => userChallenge.challengeId);
    const availableChallengesToRender = challenges.filter(challenge => !userChallengeIds.includes(challenge.id));

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