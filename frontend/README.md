# フロントエンド編

## 1. はじめに

はいどうも、フロントエンド編担当の田中善貴です。フロントエンドって聞いてぱっとしない方もいると思いますが要は見た目部分をぱぱっと作ってしまおう編です。

今回は2月に学んでもらった React を使ってフロントエンドを実装してもらう訳ですが、 React を開発したのはかの有名な Facebook です。バックエンド編でザッカーバーグが出てきたのは実は伏線だったのかもしれませんね。

バックエンド同様質問は受け付けます。Slackで@!田中善貴（田中以外のメンバー）までお願いします。

## 2. React アプリの起動

ターミナルを開いて、for-spring-training 上でコンテナ起動

```
docker-compose up
```

「localhost:3000」(http://localhost:3000)を開き以下の初期画面になっていたら正常です。

## 3. 初期画面の変更

では実際にフロントエンド開発をしていきましょう。

まずは下記コマンドを実行します。

```
frontend % npm install react-bootstrap bootstrap
```

このコマンドを実行することで React Bootstrap が使用できるようになります。

pages/Home.tsx
```ts
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // ここでログイン処理を行う

    // ログインに成功した場合
    navigate('/')
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col xs={6}>
          <Card>
            <Card.Header className="text-center font-weight-bold">Signup</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Signup
                </Button>
                <Button variant="secondary" className="ml-2" onClick={() => navigate('/login')}>
                  Login
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
```

pages/Login.tsx
```ts
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // ここでログイン処理を行う

    // ログインに成功した場合
    navigate('/')
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col xs={6}>
          <Card>
            <Card.Header className="text-center font-weight-bold">Login</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
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
```

pages/Signup.tsx
```ts
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // ここでサインアップ処理を行う

    // サインアップに成功した場合
    navigate('/')
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col xs={6}>
          <Card>
            <Card.Header className="text-center font-weight-bold">Signup</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Signup
                </Button>
                <Button variant="secondary" className="ml-2" onClick={() => navigate('/login')}>
                  Login
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
```

components/Form.tsx
```ts
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type FormProps = {
  newTweet: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setNewTweet: React.Dispatch<React.SetStateAction<string>>;
};

const FormComponent = ({ newTweet, handleSubmit, setNewTweet }: FormProps) => {
  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group controlId="formNewTweet">
        <Form.Control
          type="text"
          value={newTweet}
          onChange={(e) => setNewTweet(e.target.value)}
          placeholder="What's on your mind?"
        />
      </Form.Group>
      <Button type="submit">Post</Button>
    </Form>
  );
};

export default FormComponent;
```

components/ListGroup.tsx
```ts
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type ListGroupProps = {
  tweets: string[];
};

const ListGroupComponent = ({ tweets }: ListGroupProps) => {
  return (
    <ListGroup>
      {tweets.map((tweet, index) => (
        <ListGroup.Item key={index}>{tweet}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ListGroupComponent;
```

components/Navbar.tsx
```ts
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarComponent = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // ここでサインアウト処理を行う

    // サインアウトに成功した場合
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Nav className="ml-auto">
        <Button variant="danger" onClick={handleSignOut}>Sign Out</Button>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
```

## TwitterのUIコンポーネントを作成

Twitterのフロントエンドは、投稿（ツイート）、フィード、プロフィールなどのUIコンポーネントから構成されています。各コンポーネントを作成するために、ReactのFunctional Componentを使用します。

例えば、投稿（ツイート）コンポーネントを作成する場合は、次のようになります。

```js
import React from 'react';

const Tweet = (props) => {
  return (
    <div className="tweet">
      <h3>{props.username}</h3>
      <p>{props.text}</p>
      <p>{props.timestamp}</p>
    </div>
  );
};

export default Tweet;
```

手始めに「[localhost:3002/doc#/](http://localhost:3002/doc#/ )」を開いてバックエンド編で作成したAPIの一覧を見てみましょう。