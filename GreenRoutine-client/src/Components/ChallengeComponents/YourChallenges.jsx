import react from 'react'
import CompleteChallengeButton from '../CompleteChallengeButton';

const YourChallenges = ({ challenges, userChallenges, userInfo, CarbonImpactScreen, CarbonImpactBackend, carbonLb, fetchChallenges } ) => {
    const renderChallenges = (challengesToRender, user, CarbonImpactScreen, CarbonImpactBackend, carbonLb) => {
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
                                <li className="list-group-item">You are signed up for this challenge. Assign Carbon Impact 
                                    <button onClick={() => CarbonImpactScreen(challenge.id, challenge.miles)}> Here</button>
                                {carbonLb} lbs <button onClick={() => CarbonImpactBackend(challenge.id)}>Send to DB</button></li>
                            </ul>
                            <CompleteChallengeButton challengeId={challenge.id} userId={user.id} fetchChallenges={fetchChallenges}/>
                        </div>
                    ))}
                </div>
    
            </>
        );
    }
    const noncompletedUserChallengeIds = userChallenges.filter(userChallenge => !userChallenge.challengeCompleted).map(userChallenge => userChallenge.challengeId);
    const noncompletedChallengesToRender = challenges.filter(challenge => noncompletedUserChallengeIds.includes(challenge.id));

    return (
        <>
            <h2>Your Challenges</h2>
            <div>{renderChallenges(noncompletedChallengesToRender, userInfo, CarbonImpactScreen, CarbonImpactBackend, carbonLb)}</div>
        </>
    )
};

export default YourChallenges;