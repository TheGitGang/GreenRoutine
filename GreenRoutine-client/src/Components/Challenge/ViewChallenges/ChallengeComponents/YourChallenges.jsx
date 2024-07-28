import react from 'react'
import CompleteChallengeButton from './CompleteChallengeButton';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Button  } from 'reactstrap';

const YourChallenges = ({ challenges, userChallenges, userInfo, CarbonImpactScreen, CarbonImpactBackend, carbonLb, fetchChallenges } ) => {
    const renderChallenges = (challengesToRender, user, CarbonImpactScreen, CarbonImpactBackend, carbonLb) => {
        return (
            <>
                <p>There are {challengesToRender.length} challenges in the DB</p> 
                <div>
                    {challengesToRender.map((challenge, index) => (
                        <Card className="card lightgrey-card" key={index}>
                            <CardBody>
                            <CardTitle className="card-title lightgrey-card">{challenge.name}</CardTitle>
                            </CardBody>
                            <ListGroup className="list-group list-group-flush lightgrey-card">
                                <ListGroupItem className="list-group-item lightgrey-card">Difficulty: {challenge.difficulty}</ListGroupItem>
                                <ListGroupItem className="list-group-item lightgrey-card">Length: {challenge.length}</ListGroupItem>
                                <ListGroupItem className="list-group-item lightgrey-card">Description: {challenge.description}</ListGroupItem>
                                <ListGroupItem className="list-group-item lightgrey-card">Miles: {challenge.miles}</ListGroupItem>
                                <ListGroupItem className="list-group-item lightgrey-card">You are signed up for this challenge. Assign Carbon Impact 
                                    <Button onClick={() => CarbonImpactScreen(challenge.id, challenge.miles)}> Here</Button>
                                {carbonLb} lbs <Button onClick={() => CarbonImpactBackend(challenge.id)}>Send to DB</Button></ListGroupItem>
                                <p>{challenge.challengeId}</p>
                            </ListGroup>
                            <CompleteChallengeButton challengeId={challenge.challengeId} userId={user.id} fetchChallenges={fetchChallenges}/>
                        </Card>
                    ))}
                </div>
    
            </>
        );
    }
    const noncompletedPersonalChallengeIds = userChallenges.filter(userChallenge => !userChallenge.challengeCompleted).map(userChallenge => userChallenge.personalChallengeId);
    const noncompletedChallengesToRender = challenges.filter(challenge => noncompletedPersonalChallengeIds.includes(challenge.challengeId));

    return (
        <>
            <div>
            <br />
            <h2>Your Challenges</h2>
            {renderChallenges(noncompletedChallengesToRender, userInfo, CarbonImpactScreen, CarbonImpactBackend, carbonLb)}
            </div>
        </>
    )
};

export default YourChallenges;