import ReactDOM from 'react-dom/client';
import { DisplayMileageQuery } from './ChallengeTransportationOptions'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "reactstrap";


const CreateChallenge = () => {

    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [length, setLength] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleLoginClick = () => {
        navigate('/challenges')
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setName(value);
        if (name === 'difficulty') setDifficulty(value);
        if (name === 'length') setLength(value);
        if (name === 'description') setDescription(value);
        if (name === 'category') setCategory(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //do error handling
            setError('');
            const payload = {
                difficulty: difficulty,
                name: name,
                length: length,
                description: description,
                category: category
            }
            console.log(payload);
            fetch('/api/Challenges/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }).then((data) => {
                console.log(data);
                if (data.ok) {
                    setError("Successful challenge submission.")
                } else {
                    setError("Error with challenge submission.")
                }
            }).catch((error) => {
                console.error(error);
                setError('Error with challenge submission.')
            })
        }
    

    return (
        <div>
            <h3>Submit a Challenge</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name:</label>
                </div>
                <div>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='difficulty'>Difficulty:</label>
                </div>
                <div>
                    <input
                        type='text'
                        id='difficulty'
                        name='difficulty'
                        value={difficulty}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='length'>Length:</label>
                </div>
                <div>
                    <input
                        type='text'
                        id='length'
                        name='length'
                        value={length}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='description'>Description:</label>
                </div>
                <div>
                    <input
                        type='text'
                        id='description'
                        name='description'
                        value={description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='category'>Category:</label>
                </div>
                <div>
                    <input
                        type='text'
                        id='category'
                        name='category'
                        value={category}
                        onChange={handleChange}
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>

            {error && <p className='error'>{error}</p>}
        </div>
    )
};

export default CreateChallenge;




/*
const CreateChallenge = () => {
    return (
        <form>
            To create a challenge, please fill out the form below:
            <br/><br/>
            <label>Difficulty:
                <select /*onChange={handleChange}*//*>
    {
        [...Array(5)].map((_, i) => i + 1)
            .map(i => <option key={i} value={i}>{i}</option>)
    }
</select>
</label>
<br/><br/>
<label>Name
<br/>
<input type="text" />  
</label>
<br/><br/>
<label>Description
<br/>
<input type="text"  /> 
</label>
<br/><br/>
<label>
<select> Category
    <option >Transportation</option>
    <option />Electricity</option>
</select>
</label>
<br/><br/>
<DisplayMileageQuery />
</form>
)
};
*/



