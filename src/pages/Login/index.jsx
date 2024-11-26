import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Card, CardBody, CardTitle, Container } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

import { toast } from "react-toastify";

import { login } from "../../service/auth.service";
import "../../styles/components/_login.css";

const Login = () => {
  const [master, setMaster] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(master);

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      toast.success(response.message);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleValueChange = ({ name, value }) => {
    setMaster((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container className="container-centered">
      <Card className="login-card shadow rounded">
        <CardBody>
          <CardTitle tag="h4" className="login-title text-center mb-4">
            Welcome Back!
          </CardTitle>
          <AvForm onValidSubmit={handleSubmit}>
            <AvField
              name="username"
              label="Username"
              type="text"
              placeholder="Enter your username"
              errorMessage="Please enter a valid username"
              validate={{ required: { value: true } }}
              onChange={(e) => handleValueChange(e.target)}
              className="login-input"
            />
            <AvField
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              errorMessage="Please enter your password"
              validate={{ required: { value: true } }}
              onChange={(e) => handleValueChange(e.target)}
              className="login-input"
            />
            <Button block className="login-button mt-3">
              Login
            </Button>
          </AvForm>
          <p className="login-footer text-center mt-4">
            Forgot your password? <a href="/reset">Reset it</a>
          </p>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Login;
