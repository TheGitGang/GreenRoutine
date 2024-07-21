import React, { createContext, useState, useContext } from 'react';

const LeavesContext = createContext();

export const LeavesProvider = ({ children }) => {
    const [ leaves, setLeaves ] = useState(0);

    return (
        <LeavesContext.Provider value={{ leaves, setLeaves }}>
            {children}
        </LeavesContext.Provider>
    );
};

export const useLeaves = () => useContext(LeavesContext);