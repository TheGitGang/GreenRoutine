import React, { useState, useEffect } from 'react';
// import fetchCarMakeInfo from './Fetch.jsx';

const ModelSelect = ( user, makeChoice, ready, setReady ) => {
    const [models, setModels] = useState([]);
    const [modelChoice, setModelChoice] = useState([]);
    const [error, setError] = useState('');

    const fetchCarModelInfo = async () => {
        const response = await fetch(`/api/account/about2/${user.makeChoice}`, {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            setModels(data);
            // setReady(true);
            setError('Car make info set.')
        } else {
            setError('Could not set car make info')
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'modelChoice') setModelChoice(value);
        // setReady(true)
    }

    const handleSubmitCarModel = async (e) => {
        e.preventDefault();
            setError('');
            const payload = {
                Id: user.userId,
                modelChoice: modelChoice
            }
            const response = await fetch('/api/account/about2', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            if (response.ok) {
                const data = await response.json();
                setError("Car model added successfully")
            } else {
                setError("Unable to add car model")
            }
        }
    
    useEffect(() => {
        fetchCarModelInfo()
    }, [user.makeChoice])


    return (
        <>
            <form style={ready ? { opacity: 1 } : { opacity: 0.4 }}>
            <h4>Please select your vehicle model:</h4>
                <select onChange={handleChange} name='modelChoice'>
                    {models.map(model => (
                        <option key={model.data.id} value={model.data.id} >
                            {model.data.attributes.name} {model.data.attributes.year}
                        </option>
                    ))}
                </select>
                <button disabled={models.length === 0} onClick={handleSubmitCarModel}>Click</button>
            </form>
            {/* {models && } */}
        </>
    );
};

export default ModelSelect;