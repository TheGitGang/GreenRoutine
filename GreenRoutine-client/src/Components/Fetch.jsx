import { useState, useEffect } from 'react';

const Fetch = () => {
    const [quotes, setQuotes] = useState([]);
    useEffect(() => {
        fetch('/api/Test')
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            // console.log(data);
            setQuotes(data);
        });
    }, []);

    const quotesJSX = quotes.map((quote, idx) => <li key={idx}>{quote}</li>);
    return (
        <>
        <p>Got {quotes.length} quotes from ASP.NET!</p>
        <ul>{quotesJSX}</ul>
        </>
    );
};

export default Fetch;
