import React, { useState, useEffect } from 'react';

const ElectricityEstimate = ({ user, userId }) => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [electricityValue, setElectricityValue] = useState('');
    const [electricityUnit, setElectricityUnit] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchCountryInfo = async () => {
        const response = await fetch('/api/countries', {
            method: 'GET'
        });
        if (response.ok) {
            const data = await response.json();
            setCountries(data);
            setError('');
        } else {
            setError('Could not fetch country options.');
        }
    };

    const fetchStateInfo = async (selectedCountry) => {
        const response = await fetch(`/api/states?country=${selectedCountry}`, {
            method: 'GET'
        });
        if (response.ok) {
            const data = await response.json();
            setStates(data);
            setError('');
        } else {
            setError('Could not fetch state options.');
        }
    };

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setCountry(selectedCountry);
        fetchStateInfo(selectedCountry);
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const handleElectricityValueChange = (e) => {
        setElectricityValue(e.target.value);
    };

    const handleElectricityUnitChange = (e) => {
        setElectricityUnit(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const payload = {
            userId,
            country,
            state,
            electricityValue,
            electricityUnit
        };
        const response = await fetch('/api/electricity/estimate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            const data = await response.json();
            setSuccessMessage('Electricity estimate added successfully.');
        } else {
            setError('Unable to add electricity estimate.');
        }
    };

    useEffect(() => {
        fetchCountryInfo();
    }, []);

    return (
        <>
            <h4>Please select your country and state for electricity estimates:</h4>
            <form onSubmit={handleSubmit}>
                <select onChange={handleCountryChange} name='country' value={country}>
                    <option value=''>Select Country</option>
                    {countries.map(country => (
                        <option key={country.id} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>
                <select onChange={handleStateChange} name='state' value={state}>
                    <option value=''>Select State</option>
                    {states.map(state => (
                        <option key={state.id} value={state.name}>
                            {state.name}
                        </option>
                    ))}
                </select>
                <input
                    type='number'
                    placeholder='Electricity Value'
                    value={electricityValue}
                    onChange={handleElectricityValueChange}
                />
                <input
                    type='text'
                    placeholder='Electricity Unit'
                    value={electricityUnit}
                    onChange={handleElectricityUnitChange}
                />
                <button type='submit'>Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </>
    );
};

export default ElectricityEstimate;