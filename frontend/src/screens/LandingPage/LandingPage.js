import React, { useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import "./LandingPage.css"
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const LandingPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      navigate('/mynotes')
    }
  }, [])
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title"> Welcome to Note Zipper</h1>
              <p className="subtitle">One safe place for all your notes.</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button size="lg" className="landingbutton" variant="outline-primary">
                  Sign Up
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage
