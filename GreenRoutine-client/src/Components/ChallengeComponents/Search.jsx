import { Label, Input, Form, Button, FormGroup } from 'reactstrap'
import { useState, useEffect } from 'react';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [categories, setCategories] = useState([]);
    const [difficulty, setDifficulty] = useState(null);
    const [category, setCategory] = useState(null);

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
        if (name === 'search') setQuery(value);
        if (name === 'difficulty') setDifficulty(Number(value));
        if (name === 'category') setCategory(Number(value));
    }

    const handleClick = async (event) => {
        event.preventDefault();
    try {
        const response = await fetch ('api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                query: query,
                categoryId: category,
                difficulty: difficulty
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            setResults(data);
        } else {
            const errorData = await response.json();
            console.log(errorData);
            console.log('error loading data');
        }
    } catch (error) {
        console.error('fetch error: ', error);
    }
    };

    return (
    <>
        <Form>
            <FormGroup>
                <Label for="search">
                Search
                </Label>
                <Input
                id="search"
                name="search"
                value={query}
                onChange={handleChange}
                placeholder='Enter search query'
                />
            </FormGroup>
            <FormGroup>
                <Label for="category">
                Category
                </Label>
               <Input id="category" name="category" type="select" value={category} onChange={handleChange}>
               <option value=''>Select a Category</option>
               {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="difficulty">
                Difficulty
                </Label>
               <Input id="difficulty" name="difficulty" type="select" value={difficulty} onChange={handleChange}>
                    <option value=''>Select a Difficulty</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </Input>
            </FormGroup>
            <Button onClick={handleClick} type='submit'>
            Search
            </Button>
        </Form>

        <div>
            {results.length > 0 && (
                <div>
                    <h2>Search Results: </h2>
                    {results.map((challenge) => (
                        <div key={challenge.id}>
                            <div className="card lightgrey-card" key={challenge.id}>
                            <h5 className="card-title lightgrey-card">{challenge.name}</h5>
                            <ul className="list-group list-group-flush lightgrey-card">
                                <li className="list-group-item lightgrey-card">Difficulty: {challenge.difficulty}</li>
                                <li className="list-group-item lightgrey-card">Length: {challenge.length}</li>
                                <li className="list-group-item lightgrey-card">Description: {challenge.description}</li>
                                <li className="list-group-item lightgrey-card">Miles: {challenge.miles}</li>
                            </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </>
    );
}

export default Search