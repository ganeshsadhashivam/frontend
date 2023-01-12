import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users/login", { email, password })
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err.message));
  };

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

            <Button variant="primary" type="submit">
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
