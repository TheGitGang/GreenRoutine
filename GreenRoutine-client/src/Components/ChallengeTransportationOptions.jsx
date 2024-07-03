//Show mileage on form
const DisplayMileageQuery = () => {
    return (
        <div>
            <label>How far did you travel?
                <input size="5" type="text" value="Distance" /> 
            </label>
            <label>
                <select>
                    <option value="Miles">miles</option>
                    <option value="Kilometers">kms</option>
                </select>
            </label>
        </div>
    );
};

//Show either mileage on create challenge form or show mileage on already created challenge list
const CategoryIsTransportation = (props) => {
    const isCategoryTransportation = props.isCategoryTransportation;
    if (isCategoryTransportation) {
     return <DisplayMileageQuery />;
    }
    /* else display created challenges with mileage */
};

export { DisplayMileageQuery };
// and changes to ROUTES AND NAVIGATION