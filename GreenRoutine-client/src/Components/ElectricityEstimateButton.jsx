import { useState } from 'react';
import { Button } from 'reactstrap';

const ElectricityEstimateButton = ({ challengeId, userInfo, fetchChallenges, electricValue, userChallenges, challengeElectricValue }) => {
  const [carbonLb, setCarbonLb] = useState('');
  const [message, setMessage] = useState('');

  const estimateElectricityImpact = async () => {
    try {
      const response = await fetch('/api/Electricity/get-estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: "electricity",
          country: userInfo.country,
          electricityValue: challengeElectricValue,
          electricityUnit: userInfo.electricityUnit/*"MWh"*/,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setCarbonLb(result.carbonLb);
        console.log("here")
        console.log(result.carbonLb)
        console.log(challengeId)
        setMessage(`Carbon data registered for challenge: ${challengeId}`);
        // Store the carbon estimate in the backend
        await storeCarbonEstimate(result.carbonLb, challengeId);
      } else {
        console.log(userInfo)
        setMessage(result.message || 'Failed to register carbon data for the challenge');
      }
    } catch (error) {
      setMessage('An error occurred while estimating electricity impact.');
    }
  };

  const storeCarbonEstimate = async (carbonLb, challengeId) => {
    try {
      console.log("storing")
      console.log(userChallenges)
      const response = await fetch('/api/Electricity/store-estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserId: userInfo.id,
          ChallengeId: challengeId,
          Carbon_lb: carbonLb,
        }),
      });
      console.log(response)
      console.log("new")
      if (response.ok) {
        setMessage('Electricity impact successfully stored.');
        fetchChallenges();
      } else {
        const result = await response.json();
        setMessage(result.message || 'Failed to store electricity impact.');
      }
    } catch (error) {
      setMessage('An error occurred while storing electricity impact.');
    }
  };

  return (
    <div>
      <Button onClick={estimateElectricityImpact}>Estimate Electricity Impact</Button>
      {carbonLb && <p>Estimated Carbon Impact: {carbonLb} lbs</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ElectricityEstimateButton;