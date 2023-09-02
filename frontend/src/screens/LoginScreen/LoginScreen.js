import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import './LoginScreen.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage';
import apiBaseUrl from '../../config/api';


const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate= useNavigate();


    
    
    

    const submitHandler= async (e) =>{
        e.preventDefault()
     
        try {
            const config={
                headers: {
                    "Content-type":"application/json"
                },
                withCredentials: true
            }
            setError(false);

            setLoading(true);
            const {data}= await axios.post(
                `${apiBaseUrl}/api/users/login`,
                {
                    email,
                    password,
                },
                config
            );
            if(data)
            {
                setLoading(false);
                navigate("/mynotes")
            }
            
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
            
        }
    }

    return (
        <MainScreen title="LOGIN">
            <div className='loginContainer'>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage> }
                {loading && <Loading/> }
                <Form onSubmit={submitHandler}>
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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            <Row className='py-3'>
                <Col>
                    New Customer ? <Link to="/register">Register Here</Link>
                </Col>

            </Row>
        </MainScreen>
    )
}

export default LoginScreen
