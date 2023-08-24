import React, { useState } from 'react'
import MainScreen from '../../components/MainScreen'
import ErrorMessage from '../../components/ErrorMessage';
import { Button, Form } from 'react-bootstrap'
import axios from 'axios';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState("https://icon-library.com/images/admin-user-icon/admin-user-icon-4.jpg");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null)
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const submitHandler = async (e)=>
  {
    e.preventDefault();
    if(password !== confirmPassword)
    {
      setMessage("Passwords donot Match")
    } 
    else if(!name.trim().length || !email.trim().length || !password.trim().length)
    {
      setMessage("Please Enter all Fields.")
    }
    else
    {
      setMessage(null);
      try {
        const config={
          headers: {
            "Content-type":"application/json",
          },
        };
        setLoading(true);
        const { data }= await axios.post(
        "/api/users",
        {
          name,
          pic,
          email,
          password
        },
        config
        );
        setLoading(false);
        localStorage.setItem("userInfo",JSON.stringify(data));
        navigate("/mynotes")

        
      } catch (error) {
        setError(error.response.data.message);
        console.log(error);
        setLoading(false);
        
      }

    }

  }
  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading/>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="name" placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control id="custom-file" type="file"  label="Select Profile Picture"  />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </MainScreen>
  )
}

export default RegisterScreen
