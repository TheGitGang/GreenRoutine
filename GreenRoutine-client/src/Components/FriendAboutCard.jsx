const FriendAboutCard = () => {
    return (
        <Card className="lightgrey-card p-3">
            <CardBody>
                <div className='d-flex'>
                    <CardTitle className="display-6">
                        About
                    </CardTitle>
                </div>
                <ul className="no-bullets-on-list">
                    <li>Pronouns: {user.pronouns ? user.pronouns : "No pronouns available"}</li>
                    <li>Email: {user.email}</li>
                    <li>Bio: {user.bio ? user.bio : "No bio available"}</li>
                    <li>Date Joined: {user.dateJoined}</li>
                </ul>
            </CardBody>
        </Card>
    )
};

export default FriendAboutCard;