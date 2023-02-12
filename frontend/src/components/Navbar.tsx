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
