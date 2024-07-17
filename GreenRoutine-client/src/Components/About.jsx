import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from './LocalStorageFunctions';
import Calendar from 'react-calendar'
import CustomCalendar from "./About2.jsx";

import 'react-calendar/dist/Calendar.css';

const About = () => {

    return (
        <div className="About">
            <h1>Challenge Calendar</h1>
            <CustomCalendar />
        </div>
    );
    /*
    const [makes, setMakes] = useState([]);
    const [makeChoice, setMakeChoice] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [userInfo1, setUserInfo1] = useState({});

    const [ user, setUser ] = useState(getLocalStorage('userInfo'));

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'makeChoice') setMakeChoice(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //do error handling
        setError('');
        console.log("hi1")
        const payload = { makeChoice: makeChoice, Id: user.id, }
        console.log(payload);
        fetch('/api/account/about', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then((data) => {
            console.log(data);
            if (data.ok) {
                // setUser(data.User);
                setLocalStorage('userInfo1', data);

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
        navigate('/test/' /*+ makeChoice.toString()*//*)
    }
    useEffect(() => {
        setLocalStorage('user', user);
    }, [user]);

    useEffect(() => {
        fetch('/api/test/about')
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                console.log(data);
                setMakes(data);
            });
    }, []);

    return (
        <>
            <h1>This is a vehicle make selection page!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {makes.map((make, index) => (
                        <div key={index}>
                            <br />
                            <label>
                                <input type="checkbox" name="makeChoice" value={make.data.id} onChange={handleChange} />
                                Name: {make.data.attributes.name}
                            </label>
                        </div>
                    ))}

                </div>
                {<button type='submit'>Submit</button>}
            </form>
        </>
    )
};
*/
};
export default About;