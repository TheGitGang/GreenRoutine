import React from 'react';
import { useState, useEffect } from 'react';
import JSConfetti from 'js-confetti';
import { Button } from 'reactstrap'
import { useLeaves } from './LeavesContext';

const CompleteChallengeButton = ({challengeId, userId, fetchChallenges }) => {
    const { leaves, setLeaves } = useLeaves();
    const completeChallenge= async () => {
        //fetch to complete challenge 
        try {
            const response = await fetch ('api/UserChallenge/completeChallenge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({ 
                    challengeId: challengeId,
                    userId: userId }),
            });

            if (response.ok) {
                console.log('Challenge marked as completed');
            } else {
                console.error('Failed to complete challenge');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        //fetch to add leaves
        try{
        const response = await fetch('/api/account/add-leaves', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserId: userId,
                Points: 100
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Points added successfully:', data);
            setLeaves(data.leaves);
        } else {
            const errorData = await response.json();
            setError(errorData.Message);
            console.error('Error updating points');
        }
        }
        catch{
            console.error("erroring");
        }

        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();

        fetchChallenges();

    };

    return (
        <Button onClick={completeChallenge}>Complete Challenge</Button>
    )
}

export default CompleteChallengeButton;