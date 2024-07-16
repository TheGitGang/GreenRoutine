import { Label, Input, Form, Button, FormGroup } from 'reactstrap'
import { useState } from 'react';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const handleClick = async (event) => {
        event.preventDefault();
    try {
        const response = await fetch ('api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                query: query
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
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Enter search query'
                />
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
                            <div className="card" key={challenge.id}>
                            <h5 className="card-title">{challenge.name}</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Difficulty: {challenge.difficulty}</li>
                                <li className="list-group-item">Length: {challenge.length}</li>
                                <li className="list-group-item">Description: {challenge.description}</li>
                                <li className="list-group-item">Miles: {challenge.miles}</li>
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