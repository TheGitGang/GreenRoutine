import { useState, useEffect } from 'react';
import React from 'react';
import styled from 'styled-components';
import './Leaves.css'
import { getLocalStorage, setLocalStorage } from './LocalStorageFunctions';

const Square = styled.div`
  width: 200px;
  height: 50px;
  background-color: #B0EC92;
  margin: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 16px;
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
                <div className="card" key={user.id}>
                    <h5 className="card-title">{user.userName}</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Leaves: {user.leaves}</li>
                    </ul>
                </div>
            ))}
        </div>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
} 



export default Leaderboard;