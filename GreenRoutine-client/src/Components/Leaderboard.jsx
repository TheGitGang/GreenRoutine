import { useState, useEffect } from 'react';
import React from 'react';
import './Leaderboard.css';


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

  return ( 
    <div id="square-tiles">
        <div>
            {users.map((user, index) => (
                <div key={user.id} className="square">
                            <div className="cell">{index + 1}</div>
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