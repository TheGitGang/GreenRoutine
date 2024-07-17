import react from 'react'

const CompletedChallenges = ({ challenges, userChallenges, userInfo, CarbonImpactScreen, carbonLb } ) => {
    const renderChallenges = (challengesToRender, user, CarbonImpactScreen, carbonLb) => {
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
                                <li className="list-group-item lightgrey-card">Assign Carbon Impact 
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