import ProfilePhoto from './ProfilePhoto';
import UploadForm from './UploadForm';

const Profile = (props) => {
    return (
        <>
            <ProfilePhoto name={props.name} title={props.title} profileImg={props.profileImg}/>
            <UploadForm/>
        </>
    )
}

export default Profile;