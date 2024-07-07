import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from './LocalStorageFunctions';

const About2 = () => {
    const [models, setModels] = useState([]);
    const [modelChoice, setModelChoice] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'modelChoice') setModelChoice(value);
        
    }

    useEffect(() => {
        fetch('/api/test/about2')
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                console.log(data);
                setMakes(data);
            });
    }, []);

    return (
        <>
            <h1>This is a vehicle make selection page!</h1>
            <form /*onSubmit={handleSubmit}*/>
                <div>
                    {models.map((model, index) => (
                        <div key={index}>
                            <br />
                            <label>
                                <input type="checkbox" name="modelChoice" value={model.data.id} onChange={handleChange} />
                                Name: {model.data.attributes.name}
                            </label>
                        </div>
                    ))}

                </div>
                { <button type='submit'>Submit</button> }
            </form>
        </>
    )
};

export default About2;