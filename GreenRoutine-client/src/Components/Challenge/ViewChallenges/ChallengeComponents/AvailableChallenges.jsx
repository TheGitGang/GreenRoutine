import react, { useState, createContext, useContext, Children } from 'react'
import { Button, Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import './ChallengeStyling.css'
import ChallengeSignUp from './ChallengeSignUp';

const AvailableChallenges = ({ challenges, userChallenges, userInfo, fetchChallenges} ) => {
    const renderChallenges = (challengesToRender) => {
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
                                <ChallengeSignUp challenge={challenge.challengeId} userId={userInfo.id} fetchChallenges={fetchChallenges}/>
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
                {renderChallenges(availableChallengesToRender)}</div>
        </>
    )
};

export default AvailableChallenges;