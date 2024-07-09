import { useState, useEffect } from 'react';
import React from 'react';
import styled from 'styled-components';
import './Leaderboard.css';
const Square = styled.div`
  width: 1000px;
  height: 50px;
  background-color: #B0EC92;
  margin: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 25px;
`;


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
            {users.map(user => (
                <div key={user.id}>
                    <Square>{user.userName}, Leaves: {user.leaves}</Square>
                </div>
            ))}
        </div>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
} 



export default Leaderboard;