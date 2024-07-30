import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const ViewProfileButton = ({ data }) => {
    const navigate = useNavigate();
    const id = data.id;

    const handleClick = () => {
        navigate(`/friend-profile/${id}`);
    }
    return (
        <Button color="primary" onClick={handleClick} size="sm">
            View Profile
        </Button>
    )
};

export default ViewProfileButton;