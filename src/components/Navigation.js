import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import Logo from "../images/WTNY (1).png";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "../services/appAPI";
import "./Navigation.css";
function Navigation() {
  const { user } = useSelector((state) => state.user);
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  //logout user

  const handleLogout = () => {
    console.log("in handle logout");
    logoutUser().then(({ error }) => {
      if (!error) {
        console.log("logged Out succesfully");
      }
    });
  };

  return (
    <Navbar id="navbar" bg="" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={Logo} alt="WhenTheyNeedYou" />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
              {/* <Nav.Link>
                <Button className="btn btn-primary text-white">Home</Button>
              </Nav.Link> */}
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link className="btn btn-primary">Login</Nav.Link>
            </LinkContainer>
            {user && (
              <NavDropdown title={user.email} id="basic-nav-dropdown">
                <LinkContainer to="/new-article">
                  <NavDropdown.Item>New Article</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/articles/me">
                  <NavDropdown.Item>My Articles</NavDropdown.Item>
                </LinkContainer>

                {/* <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Button onClick={handleLogout} variant="outline-danger">
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
