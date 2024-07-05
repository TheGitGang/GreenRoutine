import { useState } from 'react'
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import editIcon from '../assets/images/edit_icon.png'
import EditAboutModal from "./EditAboutModal";

const AboutCard = ({ user }) => {
    const [displayModal, setDisplayModal] = useState(false);

    const toggle = () => {
        setDisplayModal(!displayModal);
    }
    return (
        <Card className="centered-card p-3 w-50">
            <CardBody>
                <div className='d-flex'>
                    <CardTitle className="display-6">
                        About
                    </CardTitle> 
                    <Button className='edit-button' onClick={toggle}>
                        <img src={editIcon} height="20"/> {/* add conditional rendering to edit button based on this being the user's profile */}
                    </Button>
                    <EditAboutModal isOpen={displayModal} toggle={toggle} user={user}/>
                </div>
                <ul style={{listStyleType: 'none', padding: '0', margin: '0'}}>
                    <li>Pronouns: {user.pronouns}</li>
                    <li>Email: {user.email}</li>
                    <li>Bio: {user.bio ? user.bio : "No bio available"}</li>
                    <li>Date Joined: {user.dateJoined}</li>
                </ul>
            </CardBody>
        </Card>
    );
}

export default AboutCard;