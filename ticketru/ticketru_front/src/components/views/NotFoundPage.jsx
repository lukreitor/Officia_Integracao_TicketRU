import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="not-found-wrapper">
            <Container fluid>
                <Row>
                    <Col>
                        <div className="not-found-content">
                            <div>
                                <h1 className="not-found-title">404</h1>
                                <h3 className="not-found-subtitle">
                                    Page not found
                                </h3>

                                <Button
                                    variant="seconday"
                                    size="lg"
                                    className="not-found-button"
                                >
                                    <Link to="/" className="not-found-link">
                                        Go back to home
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default NotFoundPage;
