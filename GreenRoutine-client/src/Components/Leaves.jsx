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

  const handleClick = async () => {
      try {
        console.log(user);
          const response = await fetch('/api/account/add-leaves', {
              mode: 'cors',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                UserId: user.id,
                Points: 10
              })
          });

          if (response.ok) {
              const data = await response.json();
              console.log('Points added successfully:', data);
              setUser(data);
              setLocalStorage('userInfo', data);
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
      {user || user.leaves!== undefined ? (
        <Square> Leaves: {user.leaves} </Square>): 
        <Square> Leave: 0 </Square>}
        <Square>Hello </Square>
      <button onClick={handleClick}>Add 10 points</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
} 


export default Leaves;