import { Label, Input, Form, Button, FormGroup } from 'reactstrap'
import { useState, useEffect } from 'react';
import SearchResultsRender from './SearchResultsRender';
import ChallengeCard from './SearchRender/ChallengeCard'

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [categories, setCategories] = useState([]);
    const [difficulty, setDifficulty] = useState();
    const [category, setCategory] = useState();
    const [userInfo, setUserInfo] = useState({}); 
    const [error, setError] = useState(''); 

    const fetchChallenges = async () => {
        try {
            // Fetching all challenges
            if(userInfo.id){
                const allChallengesResponse = await fetch('/api/Challenges');
                if (allChallengesResponse.ok) {
                    const allChallengesData = await allChallengesResponse.json();
                    setChallenges(allChallengesData);
                    setError('All challenges set');
                } else {
                    setError('Could not set all challenges');
                }

                if(userInfo.id){
                    const userChallengesResponse = await fetch(`/api/UserChallenge/${userInfo.id}`);
                    if (userChallengesResponse.ok){
                        const userChallengesData = await userChallengesResponse.json();
                        setUserChallenges(userChallengesData);
                        setError('userChallenge set');
                    } else {
                        setError('Could not set userChallenges');
                    }
                }
            }
        } catch (error) {
            setMessage(error.message);
        }
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

    useEffect(() => {
        const fetchUserInfo = async () => {
        const response = await fetch('pingauth', {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            setUserInfo(data);
            setError('User info set.')
        } else {
            setError('Could not set user info')
        }
        }
            fetchUserInfo();
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
                categoryId: category? category: null,
                difficulty: difficulty? difficulty : null,
                userId: userInfo.id
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
                    <br/>
                    <h2>Search Results: </h2>
                    {results.map((item, index) => (
                        <ChallengeCard key={index} item={item} userInfo={userInfo} fetchChallenges={fetchChallenges}/>
                    ))}
                    
                    {console.log(results)}
                </div>
            )} 
            {/* {results.Length > 0 ? (
                <>
                    {console.log(results)}
                    <SearchResultsRender results={results}/>
                </>
                ): (
                    <>
                <h2>No challenges match your query</h2>
                {console.log(results)}
                </>
                
            )} */}
            
        </div>
    </>
    );
}

export default Search;