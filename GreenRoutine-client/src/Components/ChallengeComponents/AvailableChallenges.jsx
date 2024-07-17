import react from 'react'
import { Button } from 'reactstrap';

const AvailableChallenges = ({ challenges, userChallenges, userInfo, ChallengeSignUp} ) => {
    const renderChallenges = (challengesToRender, isUserChallenge, user) => {
        return (
            <>
                <p>There are {challengesToRender.length} challenges in the DB</p> 
                <div>
                    {challengesToRender.map((challenge, index) => (
                        <div className="card lightgrey-card" key={index}>
                            <h5 className="card-title lightgrey-card">{challenge.name}</h5>
                            <ul className="list-group list-group-flush lightgrey-card">
                                <li className="list-group-item lightgrey-card">Difficulty: {challenge.difficulty}</li>
                                <li className="list-group-item lightgrey-card">Length: {challenge.length}</li>
                                <li className="list-group-item lightgrey-card">Description: {challenge.description}</li>
                                <li className="list-group-item lightgrey-card">Miles: {challenge.miles}</li>
                            </ul>
                                <Button onClick={() => ChallengeSignUp(challenge.id)}>Sign Up</Button>
                        </div>
                    ))}
                </div>
    
            </>
        );
    }
    const userChallengeIds = userChallenges.map(userChallenge => userChallenge.challengeId);
    const availableChallengesToRender = challenges.filter(challenge => !userChallengeIds.includes(challenge.id));

    return (
        <>
            <h2>Available Challenges</h2>
            <div>{renderChallenges(availableChallengesToRender, false)}</div>
        </>
    )
};

export default AvailableChallenges;