import { useState, useEffect } from 'react';
import React from 'react';
import './Leaves.css'
import leafIcon from '../../assets/images/leaf.png'
import { useLeaves } from './LeavesContext';

const Leaves = () => {
    const [userInfo, setUserInfo] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const { leaves = 0, setLeaves } = useLeaves() || {};

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
            setLeaves(data.leaves);
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
    }, [isAuthenticated, setLeaves])

  return ( 
    <div id="square-tiles">
      <div id="square">
      {userInfo || leaves!== undefined ? (
        <div> 
            <img src={leafIcon} height='15'/> 
            : {leaves} </div>): 
        <div> <img src={leafIcon} height='15'/> : 0 </div>}
      </div>
    </div>
  );
} 


export default Leaves;