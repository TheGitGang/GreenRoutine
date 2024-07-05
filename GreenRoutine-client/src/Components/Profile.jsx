import AboutCard from './AboutCard';
import ProfilePhoto from './ProfilePhoto';
import UploadForm from './UploadForm';
import './Profile.css'
import profileImg from '../assets/images/ProfilePlaceholder.jpg'
//dummy data
const dummyUser = {
    firstName: "Kevin",
    lastName: "Baranowski",
    username: "kevindbaranowski",
    pronouns: "He/Him",
    email: "kevindbaranowski@gmail.com",
    dateJoined: "7/1/2024",
    bio: "A web developer with a desire to build an application that can help reduce a user's impact on climate change.",
    leaves: 23485,
    lifetimeLeaves: 106765,
    currentStreak: 20,
    longestStreak: 77,
    numChallengesCompleted: 305,
    numChallengesCreated: 34,
    profileImg: profileImg
}

const Profile = () => { 
    return (
        <>
            <div className='flex-div'>
                <ProfilePhoto profileImg={dummyUser.profileImg} firstName={dummyUser.firstName} lastName={dummyUser.lastName} username={dummyUser.username}/>
                <AboutCard user={dummyUser}/>
            </div>
            <UploadForm/>   
        </>
    )
}

export default Profile;