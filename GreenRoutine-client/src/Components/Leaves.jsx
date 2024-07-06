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

const Leaves = () => {
  const [ user, setUser ] = useState(getLocalStorage('userInfo'));
  const [ error, setError] = useState('');

  useEffect(() => {
    setLocalStorage('user', user);
  }, [user]);

  const handleClick = async () => {
      try {
          const response = await fetch('http://localhost:5000/api/user/add-points', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                UserId: user.UserId,
                Points: 10
              })
          });
          if (response.ok) {
              const data = await response.json();
              setUser(data.User);
              console.log('Points updated:', data.User.points);
          } else {
              const errorData = await response.json();
              setError(errorData.Message);
              console.error('Error updating points:', errorData.Message);
          }
      } catch (error) {
          setError('An error occurred while updating points.');
          console.error('Error:', error);
      }
  };

  return ( 
    <div id="square-tiles">
      <Square> Leaves: {user.leaves} </Square>
      <Square>Hello </Square>
      <button onClick={handleClick}>Add 10 points</button>
    </div>
  );
} 


export default Leaves;