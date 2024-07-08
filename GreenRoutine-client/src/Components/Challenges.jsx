import { useState, useEffect } from 'react';

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
    }, []);

    return (
        <>
            <p>There are {challenges.length} challenges in the DB</p>
            <div>
                {challenges.map((challenge, index) => (
                    <div className="card" key={index}>
                        <h5 className="card-title">{challenge.name}</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Difficulty: {challenge.difficulty}</li>
                            <li className="list-group-item">Length: {challenge.length}</li>
                            <li className="list-group-item">Description: {challenge.description}</li>
                        </ul>
                    </div>
                ))}
            </div>

        </>
    );
};
export default Challenges;


{/* <div>
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
</div> */}