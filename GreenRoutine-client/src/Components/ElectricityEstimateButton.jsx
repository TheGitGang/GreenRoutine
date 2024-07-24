import { useState } from 'react';
import { Button } from 'reactstrap';

const ElectricityEstimateButton = ({ challengeId, userInfo, fetchChallenges }) => {
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
          electricity_value: userInfo.electricValue,
          electricity_unit: userInfo.electricityUnit,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setCarbonLb(result.carbon_lb);
        setMessage(`Carbon data registered for challenge: ${challengeId}`);
        // Store the carbon estimate in the backend
        await storeCarbonEstimate(result.carbon_lb);
      } else {
        setMessage(result.message || 'Failed to register carbon data for the challenge');
      }
    } catch (error) {
      setMessage('An error occurred while estimating electricity impact.');
    }
  };

  const storeCarbonEstimate = async (carbonLb) => {
    try {
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