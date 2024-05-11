import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { login } from './auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
const Login = () => {
    const isMdOrSm = useMediaQuery({ query: '(max-width: 768px)' }); // true if screen is md or sm

    const isAuthenticated = useSelector(
        (state) => state.auth.user.isAuthenticated
    );

    const [formData, setFormData] = useState({
        ra: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        console.log(formData.ra);

        event.preventDefault();

        try {
            const resultAction = await dispatch(
                login({ ra: formData.ra, password: formData.password })
            );
            console.log(resultAction);

            const statusCodeValue = resultAction.payload.statusCodeValue;

            if (statusCodeValue == '200') {
                localStorage.setItem('ra', formData.ra);

                const response = await fetch(
                    `http://localhost:8080/users/find-by-ra/${formData.ra}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                const data = await response.json();
                console.log(data);
                localStorage.setItem('firstname', data.firstname);
                localStorage.setItem('lastname', data.lastname);
                localStorage.setItem('email', data.email);
                localStorage.setItem('saldo', data.saldo);
                localStorage.setItem('role', data.role);
                localStorage.setItem('username', data.username);

                navigate('/dashboard');
                window.location.reload();
            } else {
                // Handle unauthorized access
                console.log('Unauthorized access');
                // Show an error message or perform any other necessary action
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: isMdOrSm
                    ? `url('./assets/images/login-background-3.png')`
                    : '',
                backgroundSize: isMdOrSm ? 'cover' : ''
            }}
        >
            <div
                style={{
                    flex: '1'
                }}
                className="div-flex-1"
            >
                <Link to="/">
                    <Button
                        variant="light"
                        className="rounded-pill"
                        style={{
                            position: 'absolute',
                            left: '10px',
                            top: '10px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '22px',
                            fontFamily: 'DM Sans'
                        }}
                    >
                        {!isMdOrSm && <span className="logo"></span>}
                    </Button>
                </Link>

                <Form
                    onSubmit={handleSubmit}
                    className={`text-center ${isMdOrSm ? 'shadow' : ''}`}
                    style={
                        isMdOrSm
                            ? {
                                  backgroundColor: '#f8f9fa',
                                  paddingTop: '25%',
                                  paddingBottom: '25%',

                                  marginLeft: '7%',
                                  marginRight: '7%'
                              }
                            : {}
                    }
                >
                    <Container>
                        {isMdOrSm && (
                            <div className="d-flex justify-content-center align-items-center">
                                <span className="logo"></span>
                            </div>
                        )}

                        {!isMdOrSm && (
                            <h2
                                style={{ fontFamily: 'Ubuntu' }}
                                className="text-warning"
                            >
                                LOGIN
                            </h2>
                        )}

                        <Form.Group
                            className="mb-3 mx-auto mw-400 text-start"
                            controlId="formBasicRa"
                        >
                            <Form.Label
                                className="my-label"
                                style={
                                    (isMdOrSm ? {} : {},
                                    { fontFamily: 'DM Sans' })
                                }
                            >
                                RA:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu ra"
                                name="ra"
                                value={formData.ra}
                                onChange={handleInputChange}
                                required
                                rounded
                                className="bg-light FormControl"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3 mx-auto mw-400 text-start"
                            controlId="formBasicPassword"
                        >
                            <Form.Label
                                bg="danger"
                                className="my-label"
                                style={{ fontFamily: 'DM Sans' }}
                            >
                                SENHA:
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                rounded
                                className="bg-light FormControl"
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            className="mb-3   bg-violet text-uppercase"
                            style={
                                !isMdOrSm
                                    ? {
                                          borderRadius: '10px',
                                          color: '#e9ecef', // change color when isMdOrSm is true
                                          fontSize: '1rem', // change fontSize when isMdOrSm is true
                                          boxShadow:
                                              '0px 0px 2px rgba(0, 0, 0, 0.6)',
                                          width: '60%',
                                          border: 'none',
                                          fontWeight: '700',
                                          letterSpacing: '4px',
                                          paddingBottom: '10px',
                                          paddingTop: '10px'
                                      }
                                    : {
                                          width: '100%',
                                          fontWeight: '700'
                                      }
                            }
                        >
                            Biometria
                        </Button>

                        <Button
                            type="submit"
                            className=" mx-auto mw-400 bg-violet  text-uppercase"
                            style={
                                !isMdOrSm
                                    ? {
                                          borderRadius: '10px',
                                          color: '#e9ecef', // change color when isMdOrSm is true
                                          fontSize: '1rem', // change fontSize when isMdOrSm is true
                                          boxShadow:
                                              '0px 0px 2px rgba(0, 0, 0, 0.6)',
                                          width: '60%',
                                          border: 'none',
                                          fontWeight: '700',
                                          letterSpacing: '4px',
                                          paddingBottom: '10px',
                                          paddingTop: '10px'
                                      }
                                    : {
                                          width: '100%',
                                          fontWeight: '700'
                                      }
                            }
                        >
                            Entrar
                        </Button>
                        <Nav.Link
                            as={Link}
                            to="/forgot-password"
                            align="center"
                            className="opacity-50 mt-3 align-center text-uppercase text-danger"
                            style={{
                                marginTop: '0px',
                                fontFamily: 'DM Sans',
                                fontSize: '0.7rem',
                                letterSpacing: '1px',
                                fontWeight: 'bold'
                            }}
                        >
                            recuperar a senha
                        </Nav.Link>
                    </Container>
                </Form>
            </div>
            <div
                className="d-none d-md-block"
                style={{
                    flex: '1',
                    background: "url('./assets/images/login-background.png')",
                    backgroundSize: 'cover',
                    height: '100vh'
                }}
            ></div>
        </div>
    );
};

export default Login;
