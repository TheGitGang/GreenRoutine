import './TopUsers.css';
import { Col } from 'reactstrap';

const TopUser = ({ user, photo, rank }) => {
  const getClassName = () => {
    switch(rank) {
        case 0: 
            return 'First';
        case 1:
            return 'Second';
        case 2:
            return 'Third';
        default:
            return '';
            
    }
  }

    return (
      <Col className={`top-user ${getClassName()}`}>
        <div className='CardImage'>
        <h1>{getClassName(rank)}</h1>
          <img src={photo} className='CircularImage'/>
            <h3>{user.userName}</h3>
            <h3>{user.leaves} Leaves</h3>
        </div>
      </Col>
    )
}

export default TopUser;