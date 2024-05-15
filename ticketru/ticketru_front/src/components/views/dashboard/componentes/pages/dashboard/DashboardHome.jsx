import { Container } from 'react-bootstrap';

import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import UserData from '../../../../UserData';
import PaymentOptions from '../../../../payment/PaymentOptions';
import { BiBarcode } from 'react-icons/bi';

function DashboardHome() {
    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => setShowModal(false);
    const handleModalOpen = () => setShowModal(true);

    return (
        <div className="bg-white d-flex flex-column">
            {/*<Container className="header py-3 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img
                        src="assets/images/favicon.png"
                        alt="Logo"
                        width={40}
                    />
                    <div className="header-text ml-2">Saldo de fichas</div>
                </div>
                <div className="ticket-count">0</div>
    </Container> */}

            <Container className="main-content d-flex align-items-center justify-content-center flex-grow-1">
                <div className="image-wrapper">
                    <img
                        src="assets/images/favicon.png"
                        alt="Logo"
                        className="center-image"
                        width={75}
                    />
                    <PaymentOptions />
                </div>
            </Container>

            <Container className="footer py-3">
                <Button className="bg-secondary" onClick={handleModalOpen}>
                    {' '}
                    <BiBarcode
                        className="mr-2"
                        style={{ borderColor: 'transparent' }}
                    />
                    {/* or <BiBarcode className="mr-2" /> */}
                </Button>
            </Container>

            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Informações do Aluno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserData />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DashboardHome;
