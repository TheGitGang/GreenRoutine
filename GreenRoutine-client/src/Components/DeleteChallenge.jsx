/*import { useState, useEffect } from 'react';
import { AvailableChallenge } from './AvailableChallenge'

const DeleteChallenge = () => {

}

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
// export default Challenges;

