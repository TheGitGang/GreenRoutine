import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { useState, useEffect } from "react";
import profileImg from '../assets/images/ProfilePlaceholder.jpg'

const FriendProfilePhoto = ({ user, id }) => {
    const [userPhoto, setUserPhoto] = useState(null);
    const [error, setError] = useState('');

    const fetchUserPhoto = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Account/${id}/getUserPhoto`, {
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
        if (id) {
            fetchUserPhoto();
        }
    }, [id]);

    return (
        <>
          <Card className='w-100'>
            <div style={{padding: '1rem'}}>
              <CardImg 
                top 
                width="100%" 
                src={userPhoto ? userPhoto : profileImg} 
                alt="Profile photo" 
                className='profile-photo deep-green-card' 
              />
            </div>
            <CardBody className='lightgrey-card'>
              <CardTitle tag="h5">
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {user.userName}
              </CardSubtitle>
            </CardBody>
          </Card>
        </>
      )
};

export default FriendProfilePhoto;