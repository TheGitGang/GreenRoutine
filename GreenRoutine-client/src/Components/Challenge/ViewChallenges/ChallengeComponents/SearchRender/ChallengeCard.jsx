import { Button, Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import Impact from '../Impact';
import ChallengeSignUp from '../ChallengeSignUp';
import CompleteChallengeButton from '../CompleteChallengeButton';

const ChallengeCard = ({item, userInfo, fetchChallenges }) => {
    console.log(item);
    const { challenge, status } = item;

    const renderAction = () => {
        switch(status) {
            case 'Completed':
                return <Impact />
            case 'Needs to be Completed':
                return <CompleteChallengeButton challengeId={challenge.id} userId={userInfo.id} fetchChallenges={fetchChallenges}/>
            case 'Available for sign up':
                return <ChallengeSignUp challenge={challenge.id} userId={userInfo.id} fetchChallenges={fetchChallenges}/>
            default:
                return null;
        }
    }
    return (
        <Card className="lightgrey-card spacer" key={challenge.id}>
        <CardBody>
        <CardTitle className="card-title lightgrey-card">{challenge.name}</CardTitle>
        </CardBody>
        <ListGroup className="list-group list-group-flush lightgrey-card">
            <ListGroupItem className="list-group-item lightgrey-card">Difficulty: {challenge.difficulty}</ListGroupItem>
            <ListGroupItem className="list-group-item lightgrey-card">Length: {challenge.length}</ListGroupItem>
            <ListGroupItem className="list-group-item lightgrey-card">Description: {challenge.description}</ListGroupItem>
            <ListGroupItem className="list-group-item lightgrey-card">Miles: {challenge.miles}</ListGroupItem>
        </ListGroup>
        {renderAction()}
    </Card>
    );
}
export default ChallengeCard;