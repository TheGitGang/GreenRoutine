import react from 'react'

const CompletedChallenges = ({ challenges, userChallenges, userInfo, CarbonImpactScreen, carbonLb } ) => {
    const renderChallenges = (challengesToRender, user, CarbonImpactScreen, carbonLb) => {
        return (
            <>
                <p>There are {challengesToRender.length} challenges in the DB</p> 
                <div>
                    {challengesToRender.map((challenge, index) => (
                        <div className="card" key={index}>
                            <h5 className="card-title">{challenge.name}</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Difficulty: {challenge.difficulty}</li>
                                <li className="list-group-item">Length: {challenge.length}</li>
                                <li className="list-group-item">Description: {challenge.description}</li>
                                <li className="list-group-item">Miles: {challenge.miles}</li>
                                <li className="list-group-item">Assign Carbon Impact 
                                    <button onClick={() => CarbonImpactScreen(challenge.id, challenge.miles)}> Here</button>
                                {carbonLb} lbs</li>
                            </ul>
                        </div>
                    ))}
                </div>
    
            </>
        );
    }

    const completedUserChallengeIds = userChallenges.filter(userChallenge => userChallenge.challengeCompleted).map(userChallenge => userChallenge.challengeId);
    const completedChallengesToRender = challenges.filter(challenge => completedUserChallengeIds.includes(challenge.id));

    return (
        <>
            <h2>Completed Challenges</h2>
            <div>{renderChallenges(completedChallengesToRender, userInfo, CarbonImpactScreen, carbonLb)}</div>
        </>
    )
};

export default CompletedChallenges;