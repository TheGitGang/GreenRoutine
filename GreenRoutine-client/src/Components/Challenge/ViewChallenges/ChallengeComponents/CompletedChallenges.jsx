import {react, useState} from 'react'
import { Button, Card, CardBody, CardTitle, ListGroup, ListGroupItem  } from 'reactstrap';
import './ChallengeStyling.css'
import Impact from './Impact'

const CompletedChallenges = ({ challenges, userChallenges, userInfo, CarbonImpactScreen, carbonLb } ) => {
    const renderChallenges = (challengesToRender, user, CarbonImpactScreen, carbonLb) => {
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
                                {/* <ListGroupItem className="list-group-item lightgrey-card">Assign Carbon Impact 
                                    <Button onClick={() => CarbonImpactScreen(challenge.id, challenge.miles)}> Here</Button>
                                {carbonLb} lbs</ListGroupItem> */}
                                <Impact />
                            </ListGroup>
                        </Card>
                    ))}
                </div>
    
            </>
        );
    }

    const completedPersonalChallengeIds = userChallenges.filter(userChallenge => userChallenge.challengeCompleted).map(userChallenge => userChallenge.personalChallengeId);
    const completedChallengesToRender = challenges.filter(challenge => completedPersonalChallengeIds.includes(challenge.challengeId));

    return (
        <>
            
            <div>
            <br />
            <h2>Completed Challenges</h2>
            {renderChallenges(completedChallengesToRender, userInfo, CarbonImpactScreen, carbonLb)}</div>
        </>
    )
};

export default CompletedChallenges;