import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios"; // axiosをインポートする
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // APIエンドポイントにPOSTリクエストを送信する
      const response = await axios.post("http://localhost:3002/users/login", { email, password });
      // ログインに成功した場合、ホームページにリダイレクトする
      navigate('/');
    } catch (error) {
      // ログインに失敗した場合、エラーメッセージを表示するなどの処理を行う
      console.error(error);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col xs={6}>
          <Card>
            <Card.Header className="text-center font-weight-bold">Login</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Login
                </Button>
                <Button variant="secondary" className="ml-2" onClick={() => navigate('/signup')}>
                  Sign up
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
