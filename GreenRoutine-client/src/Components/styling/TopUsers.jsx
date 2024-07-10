import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { useState } from 'react';
import './TopUsers.css';
import { Col } from 'reactstrap';

const TopUser = ({ user, photo, rank }) => {
  const [displayModal, setDisplayModal] = useState(false);

  const toggle = () => {
      setDisplayModal(!displayModal);
  }

  const getClassName = () => {
    switch(rank) {
        case 0: 
            return 'First';
        case 1:
            return 'Second';
        case 2:
            return 'Third';
        default:
            return '';
            
    }
  }

    return (
      <Col className={`top-user ${getClassName()}`}>
        <div className='CardImage'>
        <h1>{rank + 1}</h1>
          <img src={photo} alt="Profile photo"/>
            <h3>{user.userName}</h3>
            <h3>{user.leaves} Leaves</h3>
        </div>
      </Col>
    )
}

export default TopUser;