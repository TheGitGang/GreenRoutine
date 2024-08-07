import './TopUsers.css';
import { Col } from 'reactstrap';
import { useState, useEffect } from 'react'


const TopUser = ({ user, rank }) => {
  const [userPhoto, setUserPhoto] = useState(null);
  const getClassName = () => {
    const fetchUserPhoto = async () => {
      const response = await fetch(`api/Account/${user.id}/getUserPhoto`, {
        method: "GET"
      });
      if (response.ok) {
        const data = await response.json();
        setUserPhoto(data.photo)
      } else {
        setError('Unable to fetch user photo')
      }
    }
    useEffect(() => {
      if (user.id) {
        fetchUserPhoto();
      }
    }, [user.id])
  
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
        <h1>{getClassName(rank)}</h1>
          <img src={userPhoto} className='CircularImage profile-photo'/>
            <h3>{user.userName}</h3>
            <h3>{user.leaves} Leaves</h3>
      </Col>
    )
}

export default TopUser;