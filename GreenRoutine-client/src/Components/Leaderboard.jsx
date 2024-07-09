import { useState, useEffect } from 'react';
import React from 'react';
import './Leaderboard.css';
import profileImg from '../assets/images/ProfilePlaceholder.jpg'
import TopUsers from './styling/TopUsers';
import { Col, Row } from 'reactstrap';

const dummyUser = {
    profileImg: profileImg
}



const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/Users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError('An error occurred while fetching leaderboard');
                console.error('Error:', error);
            }
        };

        fetchUsers();
    }, []); 

 const topThreeUsers = users.slice(0,3);

  return ( 
    <div id="square-tiles">
        <div className="topThreeBackground">
            <Row>
                    {topThreeUsers.map((user, index) => (
                        <TopUsers user={user} photo={dummyUser.profileImg} rank={index} key={index}/>
                    ))}
            </Row>
        </div>
        <div>
            {users.slice(3).map((user, index) => (
                <div key={user.id} className="square">
                            <div className="cell">{index + 4 }</div>
                            <div className="cell">{user.userName}</div>
                            <div className="rightCell">{user.leaves} Leaves</div>
                </div>
            ))}
        </div>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
} 



export default Leaderboard;