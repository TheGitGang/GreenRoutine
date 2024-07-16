import { useState, useEffect } from 'react';
//import { AvailableChallenge } from './AvailableChallenge'
import { useNavigate } from "react-router-dom";

const DeleteChallenge = () => {
    const [challenges, setChallenges] = useState([]);
    const [id, setId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'id') setId(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        //do error handling
        setError('');

        const payload = { id: id, }

        // console.log(payload);


        fetch('/api/Challenges/delete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(payload)
        }).then((data) => {
            // console.log(data);


            if (data.ok) {
                setError("Successful challenge submission.")
            } else {
                setError("Error with challenge submission.")
            }
        }).catch((error) => {
            console.error(error);
            setError('Error with challenge submission.')
        })

        navigate('/thankyou')
    }

    useEffect(() => {
        fetch('/api/Challenges')
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                // console.log(data);
                setChallenges(data);
            });

    }, []);




    return (
        <div>
            <h1>
                Delete Options
            </h1>

            <form onSubmit={handleSubmit}>
                {/* <div>
                    {challenges.map((challenge, index) => (
                        <div key={index}>
                            <br />
                            <label>
                                <input type="checkbox" name="id" value={challenge.id} onChange={handleChange} />
                                Name: {challenge.name}, Difficulty: {challenge.difficulty}, Length: {challenge.length}, Description: {challenge.description}
                            </label>
                        </div>
                    ))}

                </div> */}
                
                <div>
                {challenges.map((challenge, index) => (
                        <div key={index}>
                            <br />
                            <label>
                                <input type="radio" name="id" value={challenge.id} onChange={handleChange} />
                                Name: {challenge.name}, Difficulty: {challenge.difficulty}, Length: {challenge.length}, Description: {challenge.description}, Miles: {challenge.miles}
                            </label>
                        </div>
                    ))}
                   
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
};


export default DeleteChallenge;

{/* <input

                        type="radio"
                        id="option1"
                        value="1"
                        checked={
                            selectedValue ===
                            "option1"
                        }
                        onChange={() =>
                            handleRadioChange(
                                "option1"
                            )
                        }
                    />
                    <label htmlFor="option1">
                        1
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        id="option2"
                        value="2"
                        checked={
                            selectedValue ===
                            "option2"
                        }
                        onChange={() =>
                            handleRadioChange(
                                "option2"
                            )
                        }
                    />
                    <label htmlFor="option2">
                        2
                    </label>
                </div>

                <div>
                    <input
                        type="radio"

                        id="third challenge"
                        value="3 e"

                        checked={
                            selectedValue ===
                            3
                        }
                        onChange={() =>
                            handleRadioChange(
                                3
                            )
                        }
                    />
                    <label htmlFor="option3">

                        red
                    </label> */}

/*
<div>
<div>
    <h1>
        Delete Options
    </h1>
    <div>
        <div>
            <div>
                <input
                    type="radio"
                    id="option1"
                    value="option1"
                    checked={
                        selectedValue ===
                        "option1"
                    }
                    onChange={() =>
                        handleRadioChange(
                            "option1"
                        )
                    }
                />
                <label htmlFor="option1">
                    ReactJS
                </label>
            </div>

            <div>
                <input
                    type="radio"
                    id="option2"
                    value="option2"
                    checked={
                        selectedValue ===
                        "option2"
                    }
                    onChange={() =>
                        handleRadioChange(
                            "option2"
                        )
                    }
                />
                <label htmlFor="option2">
                    NextJs
                </label>
            </div>

            <div>
                <input
                    type="radio"
                    id="option3"
                    value="option3"
                    checked={
                        selectedValue ===
                        "option3"
                    }
                    onChange={() =>
                        handleRadioChange(
                            "option3"
                        )
                    }
                />
                <label htmlFor="option3">
                    React Native
                </label>
            </div>
        </div>
    </div>
</div>
</div>
*/
// const Challenges = () => {
//     const [challenges, setChallenges] = useState([]);
//     useEffect(() => {
//         fetch('/api/Challenges')
//             .then((resp) => {
//                 return resp.json();
//             })
//             .then((data) => {
//                 console.log(data);
//                 setChallenges(data);
//             });
//     });


//     // let availableChallengesJSX = challenges.map(challenge => {
//     //     return <AvailableChallenge /*key={challenge.id} challenge={challenge}*/ />;
//     // });

//     // const AvailableChallenge = data => {
//     //     let { Id, Name, Difficulty, Length, Description } = data.challenge;
//     //     return (<p></p>);
//     // }


//     return (
//         <>
//             <p>There are {challenges.length} challenges in the DB</p>
//             <p>{JSON.stringify(challenges)}</p>
//             {/* <p>{availableChallengesJSX}</p> */}
//             <div>
//                 {challenges.map((challenge, index) => (
//                     <div key={index}>
//                         Name: {challenge.name}, Difficulty: {challenge.difficulty}, Length: {challenge.length}, Description: {challenge.description}
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// };

