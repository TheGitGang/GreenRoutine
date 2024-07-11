import FriendAboutCard from "./FriendAboutCard";

const FriendProfile = () => {
    return (
        <>
            <Row>
                <Col xs={3}>
                    <ProfilePhoto user={userInfo} userId={userInfo.id} photo={userPhoto} onPhotoUpload={handlePhotoUpload}/>
                </Col>
                <Col>
                    <FriendAboutCard user={userInfo} userId={userInfo.id} setUserInfo={setUserInfo} fetchUserInfo={fetchUserInfo}/>
                </Col>   
            </Row>
            <Row>
                <Col>
                    <UserStatisticsCard user={userInfo}/>
                </Col>
            </Row>
        </>
    )
};

export default FriendProfile;