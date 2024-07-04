import React, { useEffect, useState } from 'react';

const DataComponent = () => {
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5299/api/test');
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
        }
        catch (error) {
            setError('Error fetching data');
        }
    };
    fetchData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if(!data) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Data from API</h1>
            <p>Comic Number: {data.num}</p>
            <p>Img: <img src={data.img}/></p>
        </div>
    );

}

export default DataComponent;