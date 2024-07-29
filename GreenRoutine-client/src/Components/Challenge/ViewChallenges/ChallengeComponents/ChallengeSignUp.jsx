import { useState } from 'react';
import { Button } from 'reactstrap';

const ChallengeSignUp = (challenge) => {
    const [ message, setMessage ] = useState('');
    //Allows user to sign up for challenge
    const SignUp = async (challengeId) => {
        
        const response = await fetch('/api/challenges/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserId: userInfo.id, 
                PersonalChallengeId: challengeId
            }),
        });
        const result = await response.json();
        if(response.ok) {
            setMessage(`Signed up for challenge: ${challengeId}`);
            fetchChallenges();
        } else {
            setMessage(result.message || 'Failed to sign up for the challenge');
            // console.log(user);
            navigate('/thankyou')
        }
    };
    return (
    <Button onClick={() => SignUp(challenge.challengeId, 'personal')}>Sign Up</Button>
);
};
export default ChallengeSignUp;