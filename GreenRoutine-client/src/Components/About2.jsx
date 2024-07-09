import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from './LocalStorageFunctions';

const About2 = () => {
    const [models, setModels] = useState([]);
    const [makes, setMakes] = useState([]);
    const [modelChoice, setModelChoice] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [ user, setUser ] = useState(getLocalStorage('userInfo1'));
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'modelChoice') setModelChoice(value);
        
    }

    useEffect(() => {
        getLocalStorage('user', user);
      }, [user]);

    useEffect(() => {
        fetch('/api/account/about2/2b1d0cd5-59be-4010-83b3-b60c5e5342da' /*+ user.makeChoice.ToString()*/)
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                console.log(data);
                setModels(data);
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
                                Name: {model.data.attributes.name} <br/>
                                Year: {model.data.attributes.year}
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