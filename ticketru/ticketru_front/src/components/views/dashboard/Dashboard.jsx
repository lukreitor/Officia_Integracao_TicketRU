import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import AdminNavbar from './components/navigation/AdminNavbar';
import { Outlet } from 'react-router-dom';
import AdminFooter from './components/navigation/AdminFooter';
import NoTicketsAlert from './components/pages/Studant/NoTicketsAlert';

function Dashboard() {
    const [saldo, setSaldo] = useState(
        parseInt(localStorage.getItem('saldo')) || 0
    );
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => setShowModal(false);

    useEffect(() => {
        const handleSaldoUpdate = () => {
            setSaldo(localStorage.getItem('saldo') || '0');
        };

        window.addEventListener('saldoUpdated', handleSaldoUpdate); // listen to custom event

        const updatedSaldo = parseInt(localStorage.getItem('saldo')) || 0;
        setSaldo(updatedSaldo);

        // Show alert only once when saldo is 0
        if (updatedSaldo === 0 && !showAlert) {
            setShowAlert(true);
            setShowModal(true);
        }

        return () => {
            window.removeEventListener('saldoUpdated', handleSaldoUpdate); // remove listener
        };
    }, [showAlert]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}
        >
            <AdminNavbar className="position-absolute top-0 start-50 translate-middle-x" />
            <Container className="header py-3 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img
                        src="assets/images/favicon.png"
                        alt="Logo"
                        width={40}
                    />
                    <div
                        className="header-text ml-2"
                        style={{ fontWeight: 'bolder' }}
                    >
                        Saldo de fichas
                    </div>
                </div>
                <div
                    className="ticket-count text-yellow"
                    style={{ fontWeight: '700', fontSize: '1.2rem' }}
                >
                    {saldo}
                </div>
            </Container>
            <Container
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ paddingBottom: '60px', flex: 1 }}
            >
                <Row>
                    <Col md={12}>
                        <div className="mt-1 text-center">
                            {/* The page content goes here */}
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </Container>
            <AdminFooter className="position-absolute bottom-0 start-0 w-100" />

            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="alert-heading mt-3">
                        Suas Fichas Abacaram
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NoTicketsAlert />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Dashboard;
