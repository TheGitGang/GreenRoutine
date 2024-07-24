import ReactDOM from 'react-dom/client';
import { DisplayMileageQuery } from './ChallengeTransportationOptions'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import './CreateChallenge.css';


const CreateChallenge = () => {

    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState(0);
    const [length, setLength] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(0);
    const [miles, setMiles] = useState('');
    const [electricValue, setElectricValue] = useState('');
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

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
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setName(value);
        if (name === 'difficulty') setDifficulty(Number(value));
        if (name === 'length') setLength(value);
        if (name === 'description') setDescription(value);
        if (name === 'category') setCategory(Number(value));
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
                miles: miles,
                electricValue: electricValue,
                categoryId: category
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
                        value={difficulty}
                        onChange={handleChange}
                    >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
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
                        <option value='0'>Select a category</option>
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
