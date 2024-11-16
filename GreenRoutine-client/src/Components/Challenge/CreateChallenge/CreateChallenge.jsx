import ReactDOM from 'react-dom/client';
import { DisplayMileageQuery } from '../../CarComponents/ChallengeTransportationOptions'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import './CreateChallenge.css';


const CreateChallenge = () => {

    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState(0);
    const [length, setLength] = useState({
        months: 0,
        days: 0,
        hours: 0
    });
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(0);
    const [miles, setMiles] = useState('0');
    const [electricValue, setElectricValue] = useState('0');
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
        const numericValue = Number(value);

        if (name === 'name') setName(value);
        if (name === 'difficulty') setDifficulty(Number(value));
        if (name === 'description') setDescription(value);
        if (name === 'category') setCategory(Number(value));
        if (name === 'miles') setMiles(value);
        if (name === 'electric') setElectricValue(value);
        if (name === 'months' || name === 'days' || name === 'hours') {
            if(numericValue < 0) {
                setLength(prevLength => ({
                    ...prevLength,
                    [name]: 0
                }));
            } else if (name === 'months' && numericValue > 6) {
                setLength(prevLength => ({
                    [name]: 6
                }));
            } else {
                setLength(prevLength => ({
                    ...prevLength,
                    [name]: numericValue
                }));
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //do error handling
            setError('');

            //converts months to days
            const totalDays = (length.months * 30) + length.days;
            const totalHours = length.hours;

            //makes sure length doesn't exceed allowed value
            if(totalDays > 838 || totalHours >= 24){
                setError('Length exceeds the maximum allowed value.');
                return;
            }
            const formattedHours = String(totalHours).padStart(2, '0');
            
            //string for timespan
            const lengthString = `${totalDays}.${formattedHours}:00:00`;

            const payload = {
                difficulty: difficulty,
                name: name,
                length: lengthString,
                description: description,
                miles: miles,
                electricValue: electricValue,
                categoryId: category
            }

            console.log(payload);

            try {
                const  response = await fetch('/api/Challenges/create', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
                if (response.ok)
                { 
                    console.log('Successful challenge submission');
                    setError("Successful challenge submission.");
                    navigate('/thankyou')
                } else {
                    console.error('Error with challenge submission')
                    setError("Error with challenge submission.")
                }
                
            } catch(error) {
                console.error(error);
                setError('Error with challenge submission.');
            
            }
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
                    <Label htmlFor='length'>Length of Time:</Label>
                    <div className='length-inputs'>
                        <Label htmlFor='months'>Months</Label>
                        <Input
                            type='number'
                            id='months'
                            name='months'
                            value={length.months}
                            onChange={handleChange}
                            placeholder='Months'
                            max={6}
                            min={0}
                            className='length-input'
                        />
                        <Label htmlFor='days'>Days</Label>
                         <Input
                            type='number'
                            id='days'
                            name='days'
                            value={length.days}
                            onChange={handleChange}
                            placeholder='Days'
                            min={0}
                            className='length-input'
                        />
                        <Label htmlFor='hours'>Hours</Label>
                         <Input
                            type='number'
                            id='hours'
                            name='hours'
                            value={length.hours}
                            onChange={handleChange}
                            placeholder='Hours'
                            min={0}
                            className='length-input'
                        />
                    </div>
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

                {category === 1 && (
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
                )}

                {category === 2 && (
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
                )} 
                
                <Button className='button'type='submit'>Submit</Button>
            </Form>
            </div>

            {error && <p className='error'>{error}</p>}
        </div>
    )
};

export default CreateChallenge;
