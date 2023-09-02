import React from 'react'
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Header() {
  const navigate= useNavigate();            

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">NoteZipper</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </Nav>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Navbar.Brand>
              <Link to="/mynotes">My Notes</Link>
            </Navbar.Brand>
                <NavDropdown title="Settings" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => {
                Cookies.remove("user", { path: "/" });
                Cookies.remove("auth", { path: "/" });
                    navigate("/")
                  }}>Logout </NavDropdown.Item>
                </NavDropdown>       
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header
