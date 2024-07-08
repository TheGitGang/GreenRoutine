import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    // First useEffect to check authentication
    useEffect(() => {
        setLoading(true);
        const checkAuth = async () => {
            try {
                const response = await fetch('api/Account/IsUserAuthenticated', {
                    method: "GET"
                });
                console.log('IsUserAuthenticated response:', response);
                if (response.ok) {
                    console.log('User is authenticated');
                    setIsAuthenticated(true);
                    // console.log('IsAuth: ' + isAuthenticated);
                } else {
                    console.log('User is not authenticated');
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
                console.log('IsAuth: ' + isAuthenticated);
            }
        };
        checkAuth();
    }, []);

    // Second useEffect to fetch user info if authenticated
    useEffect(() => {
        console.log('2nd useEffect - isAuthenticated:', isAuthenticated, 'loading:', loading);
        if (!loading && isAuthenticated) {
            const fetchUserInfo = async () => {
                try {
                    const response = await fetch('pingauth', {
                        method: "GET"
                    });
                    console.log('pingauth response:', response);
                    if (response.ok) {
                        const data = await response.json();
                        setUserInfo(data);
                        console.log('User info fetched:', data);
                    } else {
                        setUserInfo(null);
                        console.log('Failed to fetch user info');
                    }
                } catch (error) {
                    setUserInfo(null);
                    console.error('Error fetching user info:', error);
                }
            };
            fetchUserInfo();
        }
    }, [isAuthenticated, loading]);

    // Third useEffect for debugging
    useEffect(() => {
        console.log('Current state:', { isAuthenticated, userInfo, loading });
    }, [isAuthenticated, userInfo, loading]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userInfo, loading, setIsAuthenticated, setUserInfo, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};