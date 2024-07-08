import React, { useState } from 'react';

const VehicleForm = () => {
    const [formData, setFormData] = useState({
        vehicleMake: '',
        vehicleModel: '',
        vehicleYear: '',
        distance: ''
    });
    const [estimate, setEstimate] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/CarbonInterface/get-estimate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'vehicle',
                distance_value: formData.distance,
                distance_unit: 'mi',
                vehicle_make: formData.vehicleMake,
                vehicle_model: formData.vehicleModel,
                vehicle_year: formData.vehicleYear
            })
        });

        const data = await response.json();
        setEstimate(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Vehicle Make:</label>
                    <input type="text" name="vehicleMake" value={formData.vehicleMake} onChange={handleChange} required />
                </div>
                <div>
                    <label>Vehicle Model:</label>
                    <input type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} required />
                </div>
                <div>
                    <label>Vehicle Year:</label>
                    <input type="number" name="vehicleYear" value={formData.vehicleYear} onChange={handleChange} required />
                </div>
                <div>
                    <label>Distance (miles):</label>
                    <input type="number" name="distance" value={formData.distance} onChange={handleChange} required />
                </div>
                <button type="submit">Get Estimate</button>
            </form>
            {estimate && (
                <div>
                    <h3>Carbon Emission Estimate:</h3>
                    <p>Carbon (g): {estimate.carbon_g}</p>
                    <p>Carbon (lb): {estimate.carbon_lb}</p>
                    <p>Carbon (kg): {estimate.carbon_kg}</p>
                    <p>Carbon (mt): {estimate.carbon_mt}</p>
                </div>
            )}
        </div>
    );
};

export default VehicleForm;


