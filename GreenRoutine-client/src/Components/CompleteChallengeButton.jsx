import React from 'react';

const CompleteChallengeButton = ({challengeId, userId }) => {
    const completeChallenge= async () => {
        try {
            const response = await fetch ('api/UserChallenge/completeChallenge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({ challengeId, userId }),
            });

            if (response.ok) {
                console.log('Challenge marked as completed');
            } else {
                console.error('Failed to complete challenge');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <button onClick={completeChallenge}>Complete Challenge</button>
    )
}

export default CompleteChallengeButton;