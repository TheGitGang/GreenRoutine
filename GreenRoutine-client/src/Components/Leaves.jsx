import { useState, useEffect } from 'react';
import React from 'react';
import './Leaves.css'


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
      <div id="square">
      {userInfo || userInfo.leaves!== undefined ? (
        <div> Leaves: {userInfo.leaves} </div>): 
        <div> Leave: 0 </div>}
      </div>
      <button onClick={handleClick}>Add 10 points</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
} 


export default Leaves;