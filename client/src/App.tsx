import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  Jumbotron,
  Row,
  Col,
  Card,
} from 'react-bootstrap';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar bg="primary" variant="dark" className="hello-navbar">
        <Navbar.Brand href="#home">Sabeel</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar>
      <Container fluid>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>Sabeel is a community of enthuthiasts that share and maintain learning paths in many fields.</p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
        <h2>Most Favored Paths</h2>
        <Row>
          <Col>
            <Card style={{ width: '286px' }}>
              <Card.Img variant="top" src="http://via.placeholder.com/286x180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '286px' }}>
              <Card.Img variant="top" src="http://via.placeholder.com/286x180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '286px' }}>
              <Card.Img variant="top" src="http://via.placeholder.com/286x180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <h2>Latest Paths</h2>
        <Row>
          <Col>
            <Card style={{ width: '286px' }}>
              <Card.Img variant="top" src="http://via.placeholder.com/286x180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '286px' }}>
              <Card.Img variant="top" src="http://via.placeholder.com/286x180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '286px' }}>
              <Card.Img variant="top" src="http://via.placeholder.com/286x180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
