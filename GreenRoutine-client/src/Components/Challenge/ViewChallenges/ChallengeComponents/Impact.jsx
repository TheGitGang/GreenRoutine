import { useState } from 'react';
import { Button, ListGroupItem} from 'reactstrap';

const Impact = ({challenge, userInfo}) => {
    const [carbonLb, setCarbonLb] = useState('');
    const CarbonImpactBackend = async (challengeId) => {
        const response = await fetch('/api/CarbonInterFace/store-estimate', {
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
        const result = await response.json();
        if(response.ok) {
            console.log(result.data.attributes.carbon_lb)
            setCarbonLb(result.data.attributes.carbon_lb)
            setMessage(`Carbon data registered for challenge: ${challengeId}`);
        } else {
            setMessage(result.message || 'Failed to register carbon data for the challenge');
        }
    };

    const CarbonImpactScreen = async (challengeId, miles) => {
        const response = await fetch('/api/CarbonInterFace/get-estimate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Type: "vehicle",
                DistanceValue: miles,
                DistanceUnit: "mi",
                VehicleModelId: userInfo.modelChoice,
            }),
        });
        const result = await response.json();
        if(response.ok) {
            console.log(result.data.attributes.carbon_lb)
            setCarbonLb(result.data.attributes.carbon_lb)
            setMessage(`Carbon data registered for challenge: ${challengeId}`);
        } else {
            setMessage(result.message || 'Failed to register carbon data for the challenge');
        }
    };

    return (
        <ListGroupItem className="list-group-item lightgrey-card">You are signed up for this challenge. Assign Carbon Impact
        <Button onClick={() => CarbonImpactScreen(challenge.challengeId, challenge.miles)}> Here</Button>
        {carbonLb} lbs <Button onClick={() => CarbonImpactBackend(challenge.id)}>Send to DB</Button>
        </ListGroupItem>

    );
}

export default Impact;