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
    const [userInfo, setUserInfo] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchIsAuthenticated = async () => {
            try {
                const response = await fetch('api/Account/IsUserAuthenticated', {
                    method: "GET"
                });

                if (response.ok) {
                    setIsAuthenticated(true)
                }
            } catch (error) {
                setError('An error occurred while fetching data.');
            }
        };
        fetchIsAuthenticated();
    }, []);

    const fetchUserInfo = async () => {
        const response = await fetch('pingauth', {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            setUserInfo(data);
            setError('User info set.')
        } else {
            setError('Could not set user info')
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserInfo();
        } else {
            setError('User is not authenticated.')
        }
    }, [isAuthenticated])

  const handleClick = async () => {
      try {
          const response = await fetch('/api/account/add-leaves', {
              mode: 'cors',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                UserId: userInfo.id,
                Points: 10
              })
          });

          if (response.ok) {
              const data = await response.json();
              setUserInfo(data);
              console.log('Points added successfully:', data);
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
      {userInfo || userInfo.leaves!== undefined ? (
        <Square> Leaves: {userInfo.leaves} </Square>): 
        <Square> Leave: 0 </Square>}
        <Square>Hello </Square>
      <button onClick={handleClick}>Add 10 points</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
} 


export default Leaves;