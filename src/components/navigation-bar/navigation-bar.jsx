import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/reducers/user/user";

import "./navigation-bar.scss";

export const NavigationBar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setUser(null));
        dispatch(setToken(null));
        localStorage.clear();
    }

    return (
        <Navbar expand="lg" >
            <Container>
                <Navbar.Brand as={Link} to="/">
                    MyFlix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="nav-bar" id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={handleLogout} >
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}