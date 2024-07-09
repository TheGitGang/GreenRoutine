import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// import { getLocalStorage, setLocalStorage } from './LocalStorageFunctions';

const About2 = () => {
    const [models, setModels] = useState([]);
    // const [makes, setMakes] = useState([]);
    const [modelChoice, setModelChoice] = useState([]);
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
},[])
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

    useEffect(() => {
        fetch(`/api/account/about2/${userInfo.makeChoice}`)
            .then((resp) => {
                return resp.json();
            })
            .then((data1) => {
                console.log(data1);
                console.log("hi");
                // console.log(userInfo.makeChoice)
                setModels(data1);
            });
    }, []);

    return (
        <>
             {/* {models.map((model) => (
                <div>{model.data.attributes.name}</div>
            ))}  */}
            {userInfo.makeChoice} 123
            <div>
                {models.map((model, index) => (
                    <div key={index}>
                        <br />
                        <label>
                            <input type="checkbox" name="modelChoice" value={model.data.id} /*onChange={handleChange}*/ />
                            Name: {model.data.attributes.name}
                        </label>
                    </div>))}
            </div>



        </>
    )
};

export default About2;