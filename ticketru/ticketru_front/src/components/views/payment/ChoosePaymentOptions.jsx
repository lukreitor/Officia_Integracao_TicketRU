import React, { useState } from 'react';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import PixRegistrationForm from './PixRegistrationForm';
import CreditCardRegistrationForm from './CreditCardRegistrationForm';

function ChoosePaymentOptions() {
    const [quantity, setQuantity] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => setShowModal(false);
    const handleModalOpen = () => setShowModal(true);

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            setQuantity(newQuantity);
            setTotalPrice(newQuantity * 10); // preço de cada ficha é 10
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
        setTotalPrice((quantity + 1) * 10);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            setTotalPrice((quantity - 1) * 10);
        }
    };

    const handleClear = () => {
        setQuantity(0);
        setTotalPrice(0);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handlePay = () => {
        // implementar lógica de pagamento e envio para o backend aqui
    };

    return (
        <div>
            <h2>Opções de Pagamento</h2>

            <Form>
                <Form.Group controlId="formQuantity">
                    <Form.Label>Quantidade de Tickets</Form.Label>
                    <Form.Control
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                </Form.Group>

                <div>
                    <Button variant="primary" onClick={handleDecreaseQuantity}>
                        -
                    </Button>
                    <Button variant="secondary" disabled>
                        {quantity}
                    </Button>
                    <Button variant="primary" onClick={handleIncreaseQuantity}>
                        +
                    </Button>
                    <Button variant="danger" onClick={handleClear}>
                        Limpar
                    </Button>
                </div>

                <br />

                <Button variant="success" onClick={handlePay}>
                    Pagar R${totalPrice}
                </Button>
            </Form>

            <Button onClick={handleModalOpen}>Pagar</Button>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton className="bg-yellow">
                    <Modal.Title>Informações do Aluno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formPaymentMethod">
                        <Form.Label>Método de Pagamento</Form.Label>
                        <Form.Check
                            type="radio"
                            label="Pix"
                            name="paymentMethod"
                            value="pix"
                            checked={paymentMethod === 'pix'}
                            onChange={handlePaymentMethodChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Credit Card"
                            name="paymentMethod"
                            value="creditCard"
                            checked={paymentMethod === 'creditCard'}
                            onChange={handlePaymentMethodChange}
                        />
                    </Form.Group>

                    <br />

                    {paymentMethod === 'pix' && <PixRegistrationForm />}
                    {paymentMethod === 'creditCard' && (
                        <CreditCardRegistrationForm />
                    )}

                    <br />

                    <Button variant="success" onClick={handlePay}>
                        Pagar R${totalPrice}
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ChoosePaymentOptions;
