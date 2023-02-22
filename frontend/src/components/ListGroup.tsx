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
