import {useState, useEffect} from 'react';

const Challenges = () => {
    const [challenges, setChallenges] = useState([]);
    useEffect(() => {
        fetch('/api/Challenges')
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            console.log(data);
            setChallenges(data);
        });
    });
    return (
        <>
        <p>There are {challenges.length} challenges in the DB</p>
        <p>{JSON.stringify(challenges)}</p>
        </>
    );
};
export default Challenges;