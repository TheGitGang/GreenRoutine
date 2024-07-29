import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({element}) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const fetchIsAuthenticated = async () => {
            try {
                const response = await fetch('api/Account/IsUserAuthenticated', {
                    method: "GET"
                });

                if (response.ok) {
                    setIsAuthenticated(true)
                }
            } catch (e) {
                console.log(e)
            }
        };
        fetchIsAuthenticated();
    }, []);

    const fetchUserId = async () => {
        const response = await fetch('pingauth', {
            method: "GET"
        });

        if (response.ok) {
            const data = await response.json();
            setUserId(data.id);
        } else {
            console.log('Unable to get id')
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserId();
        } else {
            console.log('User is not authenticated')
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (userId) {
            const fetchIsAdmin = async () => {
                const response = await fetch(`api/RoleManagement/${userId}/IsUserAdmin`, {
                    method: "GET"
                })
                if (response.ok) {
                    const data = await response.json();
                    setIsAdmin(data.isAdmin);
                } else {
                    console.log('Unable to find admin status')
                }
                setLoading(false);
            }
            fetchIsAdmin();
        }
            
    }, [userId])

    if (loading) {
        return <div>Loading...</div>
    }

    return isAdmin ? element : <Navigate to='/unauthorized'/>
}

export default ProtectedRoute;