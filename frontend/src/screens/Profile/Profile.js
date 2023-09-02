import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Col, Row, Button, Form } from 'react-bootstrap'
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import apiBaseUrl from '../../config/api';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMessage, setPicMessage] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate= useNavigate();

    const config = {
        headers: {
            Authorization: `Bearer ${Cookies.get('auth')}`
        },
        withCredentials: true
    }

    const submitHandler=async (e)=> {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords donot Match")
        }
        else if (!name.trim().length || !email.trim().length) {
            setError("Please Enter all Fields.")
        }
        else {
            setError(null);
            try {
                setLoading(true);
                const { data } = await axios.post(
                    `${apiBaseUrl}/api/users/profile`,
                    {
                        name,
                        pic,
                        email,
                        password
                    },
                    config
                )
                    setLoading(false);
                    localStorage.setItem("user", JSON.stringify(data));
            } catch (error) {
                setError(error.response.data.message);
                console.log(error);
                setLoading(false);

            }

        }

    }

    useEffect(() => {
        if (Cookies.get('user')) {
            const userFromCookie = JSON.parse(Cookies.get('user'));
            setUser(userFromCookie);
            setName(userFromCookie.name);
            setEmail(userFromCookie.email);
            setPic(userFromCookie.pic);
        } else {
            navigate('/login');
        }
    }, [navigate, setUser]);

  return (
      <MainScreen title="Profile">
        <div>
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {loading && <Loading />}
            <Row className='profileContainer'>
                <Col md={6}>
                      <Form onSubmit={submitHandler}>
                          <Form.Group className="mb-3" controlId="name">
                              <Form.Label>Full Name</Form.Label>
                              <Form.Control type="name" placeholder="Full Name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                              />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control type="email" placeholder="Enter email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                              />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>Password</Form.Label>
                              <Form.Control type="password" placeholder="Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                              />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="confirmPassword">
                              <Form.Label>Confirm Password</Form.Label>
                              <Form.Control type="password" placeholder="Confirm Password"
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                              />
                          </Form.Group>
                          {/* <Form.Group className="mb-3" >
                              <Form.Label>Profile Picture</Form.Label>
                              <Form.Control id="custom-file" type="file" label="Select Profile Picture" />
                          </Form.Group> */}
                          <Button variant="primary" type="submit">
                              Update
                          </Button>
                      </Form>
                </Col>
                <Col style={{
                    display:'flex',
                    alignItems: 'center',
                    justifyContent:'center'
                }}>
                      <img src={pic} alt={name} className="profilePic" />
                </Col>
            </Row>
        </div>
        </MainScreen>
  )
}

export default Profile
