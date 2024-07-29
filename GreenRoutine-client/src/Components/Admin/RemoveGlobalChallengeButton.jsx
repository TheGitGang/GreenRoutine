import { useState } from "react";
import { Button } from "reactstrap";
import RemoveGlobalChallengeModal from "./RemoveGlobalChallengeModal";

const RemoveGlobalChallengeButton = ({data, handleRemoveSubmit }) => {
    const [displayModal, setDisplayModal] = useState(false);

    const toggle = () => {
        setDisplayModal(!displayModal)
    }

    return (
        <>
            <Button onClick={toggle}color="danger" size={'sm'}>Delete</Button>
            <RemoveGlobalChallengeModal isOpen={displayModal} toggle={toggle} data={data} handleRemoveSubmit={handleRemoveSubmit}/>
        </>
        
    )
};

export default RemoveGlobalChallengeButton;