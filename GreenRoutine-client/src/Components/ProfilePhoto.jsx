import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const ProfilePhoto = (props) => {
    return (
    <Card style={{ width: '18rem' }}>
      <CardImg top width="100%" src={props.profileImg} alt="Profile photo" />
      <CardBody>
        <CardTitle tag="h5">{props.name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{props.title}</CardSubtitle>
      </CardBody>
    </Card>
    )
}

export default ProfilePhoto;