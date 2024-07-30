
import React, { useState, useEffect } from 'react';

function VehicleMake() {
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');

  useEffect(() => {
    fetch('https://localhost:5001/api/CarbonInterface/vehicle_makes')
      .then(response => response.json())
      .then(data => setVehicleMakes(data))
      .catch(error => console.error('Error fetching vehicle makes:', error));
  }, []);

  const handleChange = (event) => {
    setSelectedMake(event.target.value);
  };

  return (
    <div>
      <label htmlFor="vehicle-make">Select Vehicle Make: </label>
      <select id="vehicle-make" value={selectedMake} onChange={handleChange}>
        <option value="">--Select a make--</option>
        {vehicleMakes.map((make, index) => (
          <option key={index} value={make}>
            {make}
          </option>
        ))}
      </select>
    </div>
  );
}

export default VehicleMake;

