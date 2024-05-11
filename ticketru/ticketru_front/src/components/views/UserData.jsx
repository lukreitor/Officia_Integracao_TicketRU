import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import axios from 'axios';

function UserData() {
    const [user, setUser] = useState(null);
    const [randomDogImage, setRandomDogImage] = useState('');

    const ra = localStorage.getItem('ra'); // Get RA from localStorage

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/users/find-by-ra/${ra}`
                );
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [ra]); // Add ra as a dependency to fetchUserData

    const fetchRandomDogImage = async () => {
        try {
            const response = await axios.get(
                'https://dog.ceo/api/breeds/image/random'
            );
            setRandomDogImage(response.data.message);
        } catch (error) {
            console.error('Error fetching random dog image:', error);
        }
    };

    useEffect(() => {
        fetchRandomDogImage();
    }, []);

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Card style={{ padding: '20px' }}>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <div className="d-flex justify-content-center p-0">
                                        <Image
                                            src="/assets/images/brasaooficialcolorido.png"
                                            fluid
                                            className="img-fluid smaller-image"
                                            style={{
                                                maxWidth: '100px',
                                                maxHeight: '100px'
                                            }}
                                        />
                                    </div>
                                    <div className="align-items-center d-flex justify-content-center flex-column p-0">
                                        <p className="p-0">
                                            Ministério da Educação
                                        </p>
                                        <p className="p-0">
                                            Universidade Tecnológica Federal do
                                            Paraná
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="d-flex justify-content-center">
                                        <Image
                                            src={randomDogImage}
                                            roundedCircle
                                            fluid
                                            style={{
                                                width: '50px',
                                                height: '50px'
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {user ? (
                                        <div className="d-flex justify-content-center align-items-center flex-column">
                                            <h4>
                                                {user.firstname} {user.lastname}
                                            </h4>
                                            <p>
                                                Bacharelado em Engenharia de
                                                Software
                                            </p>
                                            <p>5° Periodo</p>

                                            <p>Validity: 31/12/2024</p>
                                            <img
                                                src="https://barcode.tec-it.com/barcode.ashx?data=ABC-abc-1234&code=Code128&translate-esc=on"
                                                alt=""
                                                className="img-fluid"
                                            />
                                            <p className="bold">{user.ra}</p>
                                        </div>
                                    ) : (
                                        <p>Loading user data...</p>
                                    )}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default UserData;
