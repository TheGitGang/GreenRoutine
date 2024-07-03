import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { DisplayMileageQuery } from './ChallengeTransportationOptions'


const CreateChallenge = () => {
    return (
        <form>
            To create a challenge, please fill out the form below:
            <br/><br/>
            <label>Difficulty:
                <select /*onChange={handleChange}*/>
                    {
                        [...Array(5)].map((_, i) => i + 1)
                            .map(i => <option key={i} value={i}>{i}</option>)
                    }
                </select>
            </label>
            <br/><br/>
            <label>Name
                <br/>
                <input type="text" /*value={Name} *//>  
            </label>
            <br/><br/>
            <label>Description
            <br/>
                <input type="text" /*value={Name}*/ /> 
            </label>
            <br/><br/>
            <label>
            <select> Category
                    <option /*value="transportation"*/>Transportation</option>
                    <option /*value="electricity"*/>Electricity</option>
                </select>
            </label>
            <br/><br/>
            <DisplayMileageQuery />
        </form>
    )
};

export default CreateChallenge;


 