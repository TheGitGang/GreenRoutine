import React, { useState, useEffect } from 'react';
import fetchCarMakeInfo from './Fetch.jsx';

const MakeSelect = ({ user, userId, makeChoice, setMakeChoice }) => {
    const [makes, setMakes] = useState([]);
    const [error, setError] = useState('');

    const fetchCarMakeInfo = async () => {
        const response = await fetch('api/test/about', {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            setMakes(data);
            setError('Car make options set.')
        } else {
            setError('Could not set car make options')
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'makeChoice') setMakeChoice(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
            setError('');
            const payload = {
                Id: userId,
                makeChoice: makeChoice
            }
            const response = await fetch('/api/account/about', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            if (response.ok) {
                const data = await response.json();
                setError("Car make selection added successfully")
            } else {
                setError("Unable to add car make selection")
            }
        }
    
    useEffect(() => {
        fetchCarMakeInfo()
    }, [])


    return (
        <>
            <h4>Please select your vehicle make:</h4>
            <form>
                <select onChange={handleChange} name='makeChoice'>
                    {makes.map(make => (
                        <option key={make.data.id} value={make.data.id} >
                            {make.data.attributes.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleSubmit}>Click</button>
            </form>
            {/* {models && } */}
        </>
    );
};

export default MakeSelect;