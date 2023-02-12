import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarComponent from '../components/Navbar';
import FormComponent from '../components/Form';
import ListGroupComponent from '../components/ListGroup';

const Home = () => {
  const [tweets, setTweets] = useState<string[]>([]);
  const [newTweet, setNewTweet] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTweets([...tweets, newTweet]);
    setNewTweet('');
  };

  return (
    <Container fluid className="p-0">
      <NavbarComponent />
      <Row className="justify-content-center">
        <Col md={4}>
          <FormComponent
            newTweet={newTweet}
            handleSubmit={handleSubmit}
            setNewTweet={setNewTweet}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <ListGroupComponent tweets={tweets} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
