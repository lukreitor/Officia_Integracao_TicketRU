import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsApple } from 'react-icons/bs';
import { BsAndroid2 } from 'react-icons/bs';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const About = () => {
    const persons = [
        {
            title: 'Coordenador',
            name: 'Rógerio Ranthum',
            email: 'ranthum@utfpr.edu.br'
        },
        {
            title: 'Desenvolvedores',
            persons: [
                {
                    name: 'Brunno Marcel Ferreira Marins',
                    email: 'brunno_marcel@hotmail.com'
                },
                {
                    name: 'Paulo Ricardo da Silva',
                    email: 'prs92@outlook.com.br'
                }
            ]
        },
        {
            title: 'Colaboradores',
            persons: [
                {
                    name: 'Lucas Martins da Silva Sena',
                    email: 'lucassena@alunos.utfpr.edu.br'
                },
                {
                    name: 'Laura',
                    email: 'laura@alunos.utfpr.edu.br'
                },
                {
                    name: 'Bia',
                    email: 'bia@alunos.utfpr.edu.br'
                },
                {
                    name: 'Gabriel',
                    email: 'gabriel@alunos.utfpr.edu.br'
                },
                {
                    name: 'Sumida',
                    email: 'sumida@alunos.utfpr.edu.br'
                }
            ]
        },
        {
            title: 'Apoio',
            persons: [
                {
                    name: 'Diretoria de Gestão de Tecnologia da Informação UTFPR'
                },
                {
                    name: 'Diretoria de Gestão da Comunicação - UTFPR'
                }
            ]
        }
    ];

    return (
        <>
            <Container fluid style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <Row className="justify-content-center">
                    <Col xs={12} className="text-center">
                        <div className="d-flex justify-content-center align-items-center">
                            <span className="logo"></span>
                        </div>
                        <BsApple />
                        <BsAndroid2 />

                        <p>Versão: 1.2.0</p>
                    </Col>
                </Row>
                {persons.map((group, index) => (
                    <Row key={index} className="justify-content-center">
                        <Col xs={12} className="text-center">
                            <h2>{group.title}</h2>
                            {group.persons &&
                                group.persons.map((person, personIndex) => (
                                    <div
                                        key={personIndex}
                                        className="text-start"
                                    >
                                        <h3>{person.name}</h3>
                                        <p>{person.email}</p>
                                    </div>
                                ))}
                        </Col>
                    </Row>
                ))}
            </Container>
        </>
    );
};

export default About;
