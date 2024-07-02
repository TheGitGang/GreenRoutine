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
  
  const Navigation = (props) => {
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
                      <Link to='/leaderboard' className="nav-link">Leaderboard</Link>
                  </NavItem>
              </Nav>
              <Nav>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="dropdown-link">
                  Hello, {props.name}!
                </DropdownToggle>
                <DropdownMenu right >
                  <DropdownItem className="dropdown-link">
                      <Link to='/profile' className="dropdown-link">Profile</Link>
                  </DropdownItem>
                  <DropdownItem className="dropdown-link">
                      <Link to='/friends' className="dropdown-link">Friends</Link>
                  </DropdownItem>
                  <DropdownItem className="dropdown-link">
                      <Link to='/points' className="dropdown-link">Points</Link>
                  </DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem className="dropdown-link">
                      <Link to='/login' className="dropdown-link">Logout</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Navbar>
      )
  }
  
  export default Navigation;