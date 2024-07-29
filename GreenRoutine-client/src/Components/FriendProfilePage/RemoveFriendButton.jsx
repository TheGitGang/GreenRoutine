import { Button } from "reactstrap";
import { useState } from "react";
import RemoveFriendModal from "./RemoveFriendModal";

const RemoveFriendButton = ({ data, userId, handleRemoveFriendSubmit }) => {
    const [displayModal, setDisplayModal] = useState(false)
    const name = data.name;
    const friendId = data.id;
    
    const toggle = () => {
        setDisplayModal(!displayModal)
    }

    return (
        <>
            <Button 
                size='sm' 
                color="danger" 
                onClick={toggle} 
            >
                Remove
            </Button>
            <RemoveFriendModal 
                isOpen={displayModal} 
                toggle={toggle} 
                name={name} 
                friendId={friendId} 
                userId={userId} 
                handleRemoveFriendSubmit={handleRemoveFriendSubmit} 
            />
        </>
        
    )
}

export default RemoveFriendButton;