"use client";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";

function RegisterForms() {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm();

  const submitHandler = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("/api/user/registerUser", data);
      console.log(response);
      reset();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="registerWrapper" style={{ padding: "40px 0px" }}>
        <Container>
          <Row>
            <div className="pageHeading">
              <h2 className="text-center">Registration Form</h2>
            </div>
          </Row>
          <Row>
            <Col md={4}></Col>
            <Col md={4}>
              <Form onSubmit={handleSubmit(submitHandler)}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Akshay Shejwal"
                    {...register("name", { required: true })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="sample@mail.com"
                    {...register("email", { required: true })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="conformpassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", { required: true })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="submit">
                  <Button type="submit">Submit</Button>
                </Form.Group>
              </Form>
            </Col>
            <Col md={4}></Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default RegisterForms;
