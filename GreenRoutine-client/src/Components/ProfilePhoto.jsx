import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import UploadProfilePhotoModal from './UploadProfilePhotoModal';
import { useState } from 'react';

const ProfilePhoto = ({ user, photo }) => {
  const [displayModal, setDisplayModal] = useState(false);

  const toggle = () => {
      setDisplayModal(!displayModal);
  }
  console.log("Profile photo: " + user.id)

    return (
      <>
        <Card className='w-100'>
          <CardImg top width="100%" src={photo} alt="Profile photo" onClick={toggle} className='cursor-pointer' />
          <CardBody>
            <CardTitle tag="h5">{user.firstName} {user.lastName}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">{user.userName}</CardSubtitle>
          </CardBody>
        </Card>
        <UploadProfilePhotoModal isOpen={displayModal} toggle={toggle}/>
      </>
    )
}

export default ProfilePhoto;