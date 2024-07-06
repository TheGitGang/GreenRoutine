import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const About = () => {
    const [makes, setMakes] = useState([]);
    const [makeChoice, setMakeChoice] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'makeChoice') setMakeChoice(value); 
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //do error handling
            setError('');
            console.log("hi1")
            const payload = {
                makeChoice: makeChoice
            }
            console.log(payload);
            fetch('/api/test/about', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }).then((data) => {
                console.log(data);
                if (data.ok) {
                    setError("Successful make submission.")
                } else {
                    setError("Error with make submission.")
                }
            }).catch((error) => {
                console.error(error);
                setError('Error with make submission.')
            })
            navigate('/about2')
        }

    useEffect(() => {
        fetch('/api/test/about')
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
            <form onSubmit={handleSubmit}>
                <div>
                    {makes.map((make, index) => (
                        <div key={index}>
                            <br />
                            <label>
                                <input type="checkbox" name="makeChoice" value={make.data.id} onChange={handleChange} />
                                Name: {make.data.attributes.name}
                            </label>
                        </div>
                    ))}

                </div>
                { <button type='submit'>Submit</button> }
            </form>
        </>
    )
};

export default About;