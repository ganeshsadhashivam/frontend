import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useLoginUserMutation } from "../services/appAPI";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginUser, { isLoading, data, isSuccess, isError, error }] =
    useLoginUserMutation();
  const handleLogin = (e) => {
    e.preventDefault();

    loginUser({ email, password }).then(({ error }) => {
      if (!error) {
        navigate("/");
      }
    });
    // if (isSuccess) {
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 100);

    //   axios
    //     .post("http://localhost:3000/users/login", { email, password })
    //     .then(({ data }) => console.log(data))
    //     .catch((err) => console.log(err.message));
  };
  if (data) {
    console.log(data);
  }

  return (
    <Container>
      <Row>
        <Col md={5} className="loginbgContainer"></Col>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center "
          id="loginbgcolor"
        >
          <Form className="loginform" onSubmit={handleLogin}>
            <h1 className="text-center">Login</h1>
            {isError && (
              <p className="alert alert-danger text-center">{error.data}</p>
            )}
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
              Login
            </Button>
            <div>
              <p className="text-center">
                Don't have an account <Link to="/signup">SignUp</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
