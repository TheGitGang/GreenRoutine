import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


const CustomCalendar = () => {
    const [markedDates, setMarkedDates] = useState([]);

    useEffect(() => {
        const fetchMarkedDates = async () => {
            try {
                const response = await fetch('/api/UserChallenge/dates');
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setMarkedDates(data); 
                } else {
                    console.error('Failed to fetch marked dates');
                }
            } catch (error) {
                console.error('Error fetching marked dates:', error);
            }
        };

        fetchMarkedDates();
    }, []);

    const tileClassName = ({ date, view }) => {
        // Add class to tile if the date is in the markedDates array
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0]; // Convert date to YYYY-MM-DD format
            if (markedDates.includes(dateString)) {
                return 'highlight';
            }
        }
        return null;
    };

    return (
        <div>
            <Calendar
                tileClassName={tileClassName}
            />
            <style>
                {`
                    .highlight {
                        background-color: yellow !important;
                    }
                `}
            </style>
        </div>
    );
};

export default CustomCalendar;
// import { getLocalStorage, setLocalStorage } from './LocalStorageFunctions';
/*
const About2 = () => {
    const [models, setModels] = useState([]);
    // const [makes, setMakes] = useState([]);
    const [modelChoice, setModelChoice] = useState([]);
    const [makeChoice, setMakeChoice] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // const [ user, setUser ] = useState(getLocalStorage('userInfo1'));

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     if (name === 'modelChoice') setModelChoice(value);

    // }


    const [userInfo, setUserInfo] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     const fetchIsAuthenticated = async () => {
    //         try {
    //             const response = await fetch('api/Account/IsUserAuthenticated', {
    //                 method: "GET"
    //             });

    //             if (response.ok) {
    //                 setIsAuthenticated(true)
    //             }
    //         } catch (error) {
    //             setError('An error occurred while fetching data.');
    //         }
    //     };
    //     fetchIsAuthenticated();
    //     console.log(isAuthenticated)
    // }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'modelChoice') setModelChoice(value);
    }

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
useEffect(() => {
    setIsAuthenticated(true)
    fetchUserInfo();
    // fetchCarModelInfo();

},[])
useEffect(() => {
    setIsAuthenticated(true)
    // fetchUserInfo();
    fetchCarModelInfo();

},[userInfo, models])

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         fetchUserInfo();
    //     } else {
    //         setError('User is not authenticated.')
    //     }
    // }, [isAuthenticated])



    if (!userInfo) {
        return <p>Loading...</p>;
    }

    // useEffect(() => {
    //     fetchUserInfo();
    //     console.log(userInfo);});

    // useEffect(() => {
    //     fetchUserInfo();
    //     console.log(userInfo);
    //     getLocalStorage('user', user);
    //   }, [user]);

   /* useEffect(() => {

        fetch(`/api/account/about2/${userInfo.makeChoice}`)
            .then((resp) => {
                return resp.json();
            })
            .then((data1) => {
                // console.log(data1);
                // console.log("hi");
                // console.log(userInfo.makeChoice)
                setModels(data1);
            });
    }, []);*//*

    const fetchCarModelInfo = async () => {
        const response = await fetch(`/api/account/about2/${userInfo.makeChoice}`, {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            // setUserInfo(data);
            setModels(data);
            // console.log(data)
            setError('User info set.')
        } else {
            setError('Could not set user info')
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //do error handling
        setError('');
        console.log("hi1")
        const payload = { modelChoice: modelChoice, Id: userInfo.id, }
        console.log(payload);
        console.log("ty")
        fetch('/api/account/about2', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then((data) => {
            console.log(data);
            if (data.ok) {
                // setUser(data.User);
                // setLocalStorage('userInfo1', data);

                setError("Successful make submission.")
            } else {
                setError("Error with make submission.")
            }
        }).catch((error) => {
            console.error(error);
            setError('Error with make submission.')
        })
        // console.log("hi34")
        console.log(makeChoice)
        console.log()
        navigate('/test' /*+ makeChoice.toString()*//*)
    }
    
    return (
        <>
             {/* {models.map((model) => (
                <div>{model.data.attributes.name}</div>
            ))}  *//*}
            {userInfo.makeChoice} 123
            <form onSubmit={handleSubmit}>

            {models.map((model, index) => (
                    <div key={index}>
                        <br />
                        <label>
                            <input type="checkbox" name="modelChoice" value={model.data.id} onChange={handleChange} />
                            Name: {model.data.attributes.name}
                            Year: {model.data.attributes.year}
                        </label>
                    </div>))}
                    {<button type='submit'>Submit</button>}
              </form>
        



        </>
    )
};
*/
