
import React, { useState, useEffect } from 'react';

function VehicleMake() {
    const [makes, setMakes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/CarbonInterface/vehicle_makes')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setMakes(data);
            })
            .catch(e => {
                console.error('Error fetching vehicle makes:', e);
                setError(e.message);
            });
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (makes.length === 0) return <div>Loading...</div>;

    return (
        <select>
            {makes.map(make => (
                <option key={make.data.id} value={make.data.id}>
                    {make.data.attributes.name}
                </option>
            ))}
        </select>
    );
}

export default VehicleMake;


