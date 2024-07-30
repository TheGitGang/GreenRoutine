import { useState } from 'react';
import { Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";

const ChallengeSignUp = (challengeId, userId, fetchChallenges) => {
    const [ message, setMessage ] = useState('');
    const navigate = useNavigate();
    //Allows user to sign up for challenge
    const SignUp = async () => {
        const payload = {
            userId: challengeId.userId,
            personalChallengeId: challengeId.challenge
        }
        const response = await fetch('/api/challenges/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        const result = await response.json();
        if(response.ok) {
            setMessage(`Signed up for challenge: ${challengeId.challenge}`);
            fetchChallenges();
        } else {
            setMessage(result.message || 'Failed to sign up for the challenge');
            navigate(0)
        }
    };
    return (
    <Button onClick={SignUp}>Sign Up</Button>
);
};
export default ChallengeSignUp;