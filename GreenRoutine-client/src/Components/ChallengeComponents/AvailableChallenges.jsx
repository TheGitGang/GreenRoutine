import react from 'react'

const AvailableChallenges = ({ challenges, userChallenges, userInfo, ChallengeSignUp} ) => {
    const renderChallenges = (challengesToRender, isUserChallenge, user) => {
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
                            </ul>
                                <button onClick={() => ChallengeSignUp(challenge.id)}>Sign Up</button>
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