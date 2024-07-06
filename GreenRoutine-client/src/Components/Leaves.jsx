import { useState, useEffect } from 'react';
import React from 'react';
import styled from 'styled-components';
import './Leaves.css'
import { getLocalStorage } from './LocalStorageFunctions';

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
  const userInfo = getLocalStorage('userInfo');
  return ( 
    <div id="square-tiles">
      <Square> Leaves: {userInfo.leaves} </Square>
      <Square>Hello </Square>
    </div>
  );
} 


export default Leaves;