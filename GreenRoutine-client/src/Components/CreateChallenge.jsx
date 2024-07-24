import ReactDOM from 'react-dom/client';
import { DisplayMileageQuery } from './ChallengeTransportationOptions'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import './CreateChallenge.css';


const CreateChallenge = () => {

    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [length, setLength] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [miles, setMiles] = useState('');
    const [electricValue, setElectricValue] = useState('');
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState('');

    const handleLoginClick = () => {
        navigate('/challenges')
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/Category/categories');
                const data = await response.json();
                setCategories(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setName(value);
        if (name === 'difficulty') setDifficulty(value);
        if (name === 'length') setLength(value);
        if (name === 'description') setDescription(value);
        if (name === 'category') setCategory(value);
        if (name === 'miles') setMiles(value);
        if (name === 'electric') setElectricValue(value);
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
                category: category,
                electricValue: electricValue,
                miles: miles
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
            navigate('/thankyou')
        }

    if (loading){
        return <Spinner style={{ width: '3rem', height: '3rem '}}/>
    }

    return (
        <div className="challengeSubmit lightgrey-card">
            <h3 className='title'>Submit a Challenge</h3>
            <div className='form'>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor='name'>Name:</Label>
                    <Input
                        type='text'
                        id='name'
                        name='name'
                        value={name}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='difficulty'>Difficulty:</Label>
                    <Input
                        type='select'
                        id='difficulty'
                        name='difficulty'
                        onChange={handleChange}
                    >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='length'>Length:</Label>
                    <Input
                        type='text'
                        id='length'
                        name='length'
                        value={length}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='description'>Description:</Label>
                    <Input
                        type='text'
                        id='description'
                        name='description'
                        value={description}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='category'>Category:</Label>
                    <Input
                        type='select'
                        id='category'
                        name='category'
                        value={category}
                        onChange={handleChange}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </Input>
                    
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='miles'>Miles:</Label>
                    <Input
                        type='text'
                        id='miles'
                        name='miles'
                        value={miles}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='electric'>Electric Value:</Label>
                    <Input
                        type='text'
                        id='electric'
                        name='electric'
                        value={electricValue}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button className='button'type='submit'>Submit</Button>
            </Form>
            </div>

            {error && <p className='error'>{error}</p>}
        </div>
    )
};

export default CreateChallenge;
