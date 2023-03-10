import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";
import { useSignupUserMutation } from "../services/appAPI";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupUser, { isLoading, data, isError, error }] =
    useSignupUserMutation();
  const navigate = useNavigate();
  //handle Login
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   signupUser({ email, password });
  //handle Login
  const handleSignUp = (e) => {
    console.log(email);
    console.log(password);
    e.preventDefault();
    signupUser({ email, password }).then(({ error }) => {
      if (!error) {
        navigate("/");
      }
    });
    // axios
    //   .post("http://localhost:3000/users", { email, password })
    //   .then((res) => console.log(res.data))
    //   .catch((error) => console.log(error));
  };
  if (data) {
    console.log(data);
  }

  return (
    <Container>
      <Row>
        <Col md={5} className="signupbgContainer"></Col>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center"
        >
          <Form className="signupform" onSubmit={handleSignUp}>
            <h1 className="text-center">Create Account</h1>
            {isError && (
              <p className="alert alert-danger text-center">{error.data}</p>
            )}
            {/* <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.name)}
              />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isLoading}>
              SignUp
            </Button>
            <div>
              <p className="text-center">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
