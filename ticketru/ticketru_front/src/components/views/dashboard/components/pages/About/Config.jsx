import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsApple } from 'react-icons/bs';
import { BsAndroid2 } from 'react-icons/bs';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const Config = () => {
    return (
        <>
            <Row className="justify-content-center mb-2">
                <Col xs={12} className="text-center">
                    <Card style={{ backgroundColor: 'white' }}>
                        <Card.Body>
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="biometric-auth"
                                    label="Autenticação por biometria"
                                />
                                <Form.Check
                                    type="switch"
                                    id="automatic-auth"
                                    label="Autenticação automática"
                                />
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Config;
