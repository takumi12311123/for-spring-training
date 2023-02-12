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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTweet(e.target.value)}
          placeholder="What's on your mind?"
        />
      </Form.Group>
      <Button type="submit">Post</Button>
    </Form>
  );
};

export default FormComponent;
