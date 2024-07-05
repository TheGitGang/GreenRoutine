import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';
  import { Link } from 'react-router-dom'
  import './Navigation.css'
  import { useState, useEffect } from 'react'
  
  const Navigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState({});
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

    useEffect(() => {
        if (isAuthenticated) {
            const fetchUserInfo = async () => {
                const response = await fetch('pingauth', {
                    method: "GET"
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                    console.log(data);
                    setError('User info set.')
                } else {
                    setError('Could not set user info')
                }
            }
            fetchUserInfo();
        } else {
            setError('User is not authenticated.')
        }
    }, [isAuthenticated])

    const handleLogoutClick = async () => {
        await fetch('/logout', {
            method: "POST"
        }).then((data) => {
            if (data.ok) {
                setIsAuthenticated(false);
                setUserInfo({});
                setError('User logged out successfully.')
                window.location.href = '/'
            } else {
                setError('Unable to logout.')
            }
        })
    }

    if (isAuthenticated) {
        return (
            <Navbar color="success" light expand="md" className="fixed-top" id="navbar-margin">
                <NavbarBrand href="/">
                  <img src="src/assets/images/Green Routine Logo Higher Quality.png" width="200
                  " height="35"/>
                </NavbarBrand>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <Link to='/' className="nav-link">Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/about' className="nav-link">About</Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/challenges' className="nav-link">Challenges</Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/challenges/create' className="nav-link">Create Challenge</Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/leaderboard' className="nav-link">Leaderboard</Link>
                    </NavItem>
                </Nav>
                <Nav>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className="dropdown-link">
                    Hello, {userInfo.firstName} {userInfo.lastName}!
                  </DropdownToggle>
                  <DropdownMenu end >
                    <DropdownItem className="dropdown-link">
                        <Link to='/profile' className="dropdown-link">Profile</Link>
                    </DropdownItem>
                    <DropdownItem className="dropdown-link">
                        <Link to='/friends' className="dropdown-link">Friends</Link>
                    </DropdownItem>
                    <DropdownItem className="dropdown-link">
                        <Link to='/leaves' className="dropdown-link">Leaves</Link>
                    </DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem className="dropdown-link">
                        <Link to='/login' className="dropdown-link" onClick={handleLogoutClick}>Logout</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Navbar>
        )
    } else {
        return (
                <Navbar color="success" light expand="md" className="fixed-top" id="navbar-margin">
                    <NavbarBrand href="/">
                      <img src="src/assets/images/Green Routine Logo Higher Quality.png" width="200
                      " height="35"/>
                    </NavbarBrand>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <Link to='/' className="nav-link">Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/about' className="nav-link">About</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/challenges' className="nav-link">Challenges</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/challenges/create' className="nav-link">Create Challenge</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/leaderboard' className="nav-link">Leaderboard</Link>
                        </NavItem>
                    </Nav>
                    <Nav>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret className="dropdown-link">
                        Account
                      </DropdownToggle>
                      <DropdownMenu end >
                        <DropdownItem className="dropdown-link">
                            <Link to='/login' className="dropdown-link">Login</Link>
                        </DropdownItem>
                        <DropdownItem className="dropdown-link">
                            <Link to='/register' className="dropdown-link">Sign up</Link>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                </Navbar>
        )
    }
      
  }
  
  export default Navigation;