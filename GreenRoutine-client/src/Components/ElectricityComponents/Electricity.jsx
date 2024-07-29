import { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const ElectricityEstimate = () => {
    const [userInfo, setUserInfo] = useState({});
    const [country, setCountry] = useState('');
    const [electricityUnit, setElectricityUnit] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchIsAuthenticated = async () => {
            try {
                const response = await fetch('api/Account/IsUserAuthenticated', {
                    method: "GET"
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                    fetchUserInfo();
                }
            } catch (error) {
                setError('An error occurred while fetching data.');
            }
        };

        const fetchUserInfo = async () => {
            const response = await fetch('pingauth', {
                method: "GET"
            });
            if (response.ok) {
                const data = await response.json();
                setUserInfo(data);
                setError('User info set.');
            } else {
                setError('Could not set user info');
            }
        };

        fetchIsAuthenticated();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            userId: userInfo.id,
            country: country,
            electricityUnit: electricityUnit,
        };

        try {
            const response = await fetch('/api/electricity/store-country', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setError('Data saved successfully.');
            } else {
                const errorData = await response.json();
                setError(`Error: ${errorData.message}`);
            }
        } catch (error) {
            setError('Unable to save data.');
        }
    };

    if (!isAuthenticated) {
        return <p>Loading...</p>;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="country">Country</Label>
                <Input
                    type="select"
                    name="country"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    <option value="">Select a country</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    {/* Add more countries as needed */}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="electricityUnit">Electricity Unit</Label>
                <Input
                    type="select"
                    name="electricityUnit"
                    id="electricityUnit"
                    value={electricityUnit}
                    onChange={(e) => setElectricityUnit(e.target.value)}
                >
                    <option value="">Select a unit</option>
                    <option value="mwh">MWh</option>
                    <option value="kwh">kWh</option>
                </Input>
            </FormGroup>
            <Button type="submit">Save Data</Button>
            {error && <p className="text-danger">{error}</p>}
        </Form>
    );
};

export default ElectricityEstimate;

