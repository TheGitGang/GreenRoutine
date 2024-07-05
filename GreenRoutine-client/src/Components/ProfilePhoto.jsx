import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const ProfilePhoto = ({ profileImg, firstName, lastName, username }) => {
    return (
    <Card style={{ width: '18rem' }}>
      <CardImg top width="100%" src={profileImg} alt="Profile photo" />
      <CardBody>
        <CardTitle tag="h5">{firstName} {lastName}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{username}</CardSubtitle>
      </CardBody>
    </Card>
    )
}

export default ProfilePhoto;