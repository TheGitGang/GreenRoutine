import { useState } from 'react'

const RenderChallenges = (challengesToRender = [], isUserChallenge, user, carbonLb) => {
    const [message, setMessage] = useState('');
    return (
        <>
            <p>There are {challengesToRender.length} challenges in the DB</p> 
            <div>
                {challengesToRender.length === 0 ? (
                    <p>No challenges to display</p>
                ) : (challengesToRender.map((challenge, index) => (
                    <div className="card" key={index}>
                        <h5 className="card-title">{challenge.name}</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Difficulty: {challenge.difficulty}</li>
                            <li className="list-group-item">Length: {challenge.length}</li>
                            <li className="list-group-item">Description: {challenge.description}</li>
                            <li className="list-group-item">Miles: {challenge.miles}</li>
                        </ul>
                        {!challenge.ChallengeCompleted && isUserChallenge && (
                            <CompleteChallengeButton challengeId={challenge.id} userId={user.id}/>)}

                        {isUserChallenge ? (
                            <p>You are signed up for this challenge. Assign Carbon Impact <button onClick={() => CarbonImpactScreen(challenge.id, challenge.miles)}> Here</button>{carbonLb} lbs <button onClick={() => CarbonImpactBackend(challenge.id)}>Send to DB</button></p>
                        ) : (
                            <button onClick={() => ChallengeSignUp(challenge.id)}>Sign Up</button>
                        )}
                    </div>
                )))
                }
            </div>
            {message && <p>{message}</p>}

        </>
    );
}

export default RenderChallenges;