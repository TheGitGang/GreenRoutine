import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import UploadProfilePhotoModal from './UploadProfilePhotoModal';
import profileImg from '../../assets/images/ProfilePlaceholder.jpg'
import { useEffect, useState } from 'react';

const ProfilePhoto = ({ user, onPhotoUpload }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [error, setError] = useState("");

  const toggle = () => {
    setDisplayModal(!displayModal);
  }

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

  return (
    <>
      <Card className='w-100'>
        <div style={{padding: '1rem'}}>
          <CardImg 
            top 
            width="100%" 
            src={userPhoto ? userPhoto : profileImg} 
            alt="Profile photo" 
            onClick={toggle} 
            className='cursor-pointer profile-photo deep-green-card' 
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
      <UploadProfilePhotoModal 
        isOpen={displayModal} 
        toggle={toggle} 
        userId={user.id} 
        onPhotoUpload={onPhotoUpload} 
        fetchUserPhoto={fetchUserPhoto}
      />
    </>
  )
}

export default ProfilePhoto;