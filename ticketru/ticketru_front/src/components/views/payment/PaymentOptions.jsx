import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import PixRegistrationForm from './PixRegistrationForm';
import CreditCardRegistrationForm from './CreditCardRegistrationForm';

function PaymentOptions() {
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
            setTotalPrice(newQuantity * 0.01); // preço de cada ficha é 10
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
        setTotalPrice((quantity + 1) * 0.01);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            setTotalPrice((quantity - 1) * 0.01);
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
        <div className="d-flex flex-column align-items-center">
            <Form>
                <div className="d-flex align-items-center">
                    <Button
                        variant="primary"
                        onClick={handleDecreaseQuantity}
                        className="bg-yellow plf-15"
                        style={{
                            borderRadius: '20%',
                            marginRight: '7px',
                            borderColor: 'transparent',
                            fontWeight: 'bolder'
                        }}
                    >
                        -
                    </Button>
                    <Form.Group
                        controlId="formQuantity"
                        style={{ marginRight: '1px' }}
                    >
                        <Form.Control
                            type="number"
                            value={quantity}
                            style={{
                                color: '#f6c500',
                                textAlign: 'center',
                                fontWeight: 'bolder',
                                fontSize: '1.5rem'
                            }}
                            onChange={handleQuantityChange}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        className="bg-yellow plf-15"
                        onClick={handleIncreaseQuantity}
                        style={{
                            borderRadius: '20%',
                            marginLeft: '5px',
                            borderColor: 'transparent',
                            fontWeight: 'bolder'
                        }}
                    >
                        +
                    </Button>
                </div>
            </Form>
            <br />
            <Button
                onClick={handleModalOpen}
                className="btn-lg bg-yellow rounded-5 plr-10"
                style={{ borderRadius: '10%', borderColor: 'transparent' }}
            >
                <span
                    className="plr-10 font-weight-bold"
                    style={{ fontSize: '1.4rem', fontWeight: 'bolder' }}
                >
                    Comprar
                </span>
            </Button>

            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton className="bg-yellow">
                    <Modal.Title>Métodos de Pagamento</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-light-gray">
                    <Form.Group controlId="formPaymentMethod">
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
                            label="Cartão de Crédito"
                            name="paymentMethod"
                            value="creditCard"
                            checked={paymentMethod === 'creditCard'}
                            onChange={handlePaymentMethodChange}
                        />
                    </Form.Group>

                    {paymentMethod === 'pix' && (
                        <PixRegistrationForm
                            totalPrice={totalPrice}
                            quantity={quantity}
                        />
                    )}
                    {paymentMethod === 'creditCard' && (
                        <CreditCardRegistrationForm totalPrice={totalPrice} />
                    )}

                    <br />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default PaymentOptions;
