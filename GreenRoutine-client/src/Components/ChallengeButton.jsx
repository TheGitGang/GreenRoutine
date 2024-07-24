import { useState } from "react";
import { Button } from "reactstrap";
import SendChallengeModal from "./SendChallengeModal";

const ChallengeButton = ({userId, data}) => {
    const [displayModal, setDisplayModal] = useState(false);

    const toggle = () => {
        setDisplayModal(!displayModal);
    }
     
    return (
        <>
            <Button size='sm' color="success"onClick={toggle}>Challenge!</Button>
            <SendChallengeModal isOpen={displayModal} toggle={toggle} userId={userId} data={data}/>
        </>
    );
};

export default ChallengeButton;