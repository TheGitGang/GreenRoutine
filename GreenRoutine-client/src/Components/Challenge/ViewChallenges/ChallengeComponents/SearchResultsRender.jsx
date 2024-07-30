import { Button, Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import Impact from './Impact';
import ChallengeSignUp from './ChallengeSignUp';
import CompleteChallengeButton from './CompleteChallengeButton';

const SearchResultsRender = (results) => {
    for( var result of results)
    {
        if(result.status == "Completed")
        {
            return (
                <Card className="lightgrey-card spacer" key={index}>
                <CardBody>
                <CardTitle className="card-title lightgrey-card">{challenge.name}</CardTitle>
                </CardBody>
                <ListGroup className="list-group list-group-flush lightgrey-card">
                    <ListGroupItem className="list-group-item lightgrey-card">Difficulty: {challenge.difficulty}</ListGroupItem>
                    <ListGroupItem className="list-group-item lightgrey-card">Length: {challenge.length}</ListGroupItem>
                    <ListGroupItem className="list-group-item lightgrey-card">Description: {challenge.description}</ListGroupItem>
                    <ListGroupItem className="list-group-item lightgrey-card">Miles: {challenge.miles}</ListGroupItem>
                </ListGroup>
                   <Impact />
            </Card>
            );
        } else if (result.status == "Needs to be Completed"){
            return (
                <Card className="lightgrey-card spacer" key={index}>
                <CardBody>
                <CardTitle className="card-title lightgrey-card">{challenge.name}</CardTitle>
                </CardBody>
                <ListGroup className="list-group list-group-flush lightgrey-card">
                    <ListGroupItem className="list-group-item lightgrey-card">Difficulty: {challenge.difficulty}</ListGroupItem>
                    <ListGroupItem className="list-group-item lightgrey-card">Length: {challenge.length}</ListGroupItem>
                    <ListGroupItem className="list-group-item lightgrey-card">Description: {challenge.description}</ListGroupItem>
                    <ListGroupItem className="list-group-item lightgrey-card">Miles: {challenge.miles}</ListGroupItem>
                </ListGroup>
                <CompleteChallengeButton challengeId={challenge.challengeId} userId={user.id} fetchChallenges={fetchChallenges}/>
            </Card>
            );
        } else if (results.status == "Available for sign up")
        {
            return (
                <Card className="lightgrey-card spacer" key={index}>
                <CardBody>
                <CardTitle className="card-title lightgrey-card">{challenge.name}</CardTitle>
                </CardBody>
                <ListGroup className="list-group list-group-flush lightgrey-card">
                    <ListGroupItem className="list-group-item lightgrey-card">Difficulty: {challenge.difficulty}</ListGroupItem>
                    <ListGroupItem className="list-group-item lightgrey-card">Length: {challenge.length}</ListGroupItem>
                    <ListGroupItem className="list-group-item lightgrey-card">Description: {challenge.description}</ListGroupItem>
                    <ListGroupItem className="list-group-item lightgrey-card">Miles: {challenge.miles}</ListGroupItem>
                </ListGroup>
                <ChallengeSignUp challenge={challenge.challengeId} userId={userInfo.id} fetchChallenges={fetchChallenges}/>
            </Card>
            );

        }
    }
    

    // return (
    //     <div>
    //         {results.length > 0 && (
    //             <div>
    //                 <br/>
    //                 <h2>Search Results: </h2>
    //                 {results.map((challenge) => (
    //                     <div key={challenge.id}>
    //                         <div className="card lightgrey-card" key={challenge.id}>
    //                         <h5 className="card-title lightgrey-card">{challenge.name}</h5>
    //                         <ul className="list-group list-group-flush lightgrey-card">
    //                             <li className="list-group-item lightgrey-card">Difficulty: {challenge.difficulty}</li>
    //                             <li className="list-group-item lightgrey-card">Length: {challenge.length}</li>
    //                             <li className="list-group-item lightgrey-card">Description: {challenge.description}</li>
    //                             <li className="list-group-item lightgrey-card">Miles: {challenge.miles}</li>
    //                         </ul>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         )} 
    //     </div>
    // );
}

export default SearchResultsRender;