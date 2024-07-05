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
  import { Link, useNavigate } from 'react-router-dom'
  import './Navigation.css'
  import { useState, useEffect } from 'react'

  import logo from '../assets/images/green_routine_logo.png'

  const Navigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState('');

    const navigate = useNavigate();

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
        setShouldNavigate(false)
        try {
            const response = await fetch('/logout', {
                method: "POST"
            })
            if (response.ok) {
                setIsAuthenticated(false);
                setUserInfo({});
                setError('User logged out successfully.')
                setShouldNavigate(true)
            } else {
                setError('Unable to logout.')
            }
        } catch (e) {
            console.error('Logout unsuccessful. ' + e)
        }
    }

    useEffect(() => {
        if (shouldNavigate && !isAuthenticated) {
            setShouldNavigate(false);
            navigate('/login');
        }
    }, [shouldNavigate, isAuthenticated]);

    if (isAuthenticated) {
        return (
            <Navbar color="success" light expand="md" className="fixed-top" id="navbar-margin">
                <NavbarBrand href="/">
                  <img src={logo} width="200
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
                        <UncontrolledDropdown>
                            <DropdownToggle nav caret className="dropdown-link">
                                Challenges
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem tag={Link} to='/challenges' className="dropdown-link">
                                    View Challenges
                                </DropdownItem>
                                <DropdownItem tag={Link} to='/challenges/create' className="dropdown-link">
                                    Create Challenges
                                </DropdownItem>
                                <DropdownItem tag={Link} to='/challenges/delete' className="dropdown-link">
                                    Delete Challenges
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
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
                    <DropdownItem tag={Link} to='/profile' className="dropdown-link">
                        Profile
                    </DropdownItem>
                    <DropdownItem tag={Link} to='/friends' className="dropdown-link">
                        Friends
                    </DropdownItem>
                    <DropdownItem className="dropdown-link">
                        <Link to='/leaves' className="dropdown-link">Leaves</Link>
                    </DropdownItem>
                    <DropdownItem onClick={handleLogoutClick} className="dropdown-link">
                        Logout
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
                      <img src={logo} width="200
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
                        <DropdownItem tag={Link} to='/login' className="dropdown-link">
                            Login
                        </DropdownItem>
                        <DropdownItem tag={Link} to='/register'className="dropdown-link">
                            Sign up
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                </Navbar>
        )
    }
      
  }
  
  export default Navigation;