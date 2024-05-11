import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { FaDollarSign, FaCheckCircle } from 'react-icons/fa';
import './PaymentConfirmation.css';

const PaymentConfirmation = () => {
    const [loading, setLoading] = useState(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            setShowSuccessMessage(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="payment-confirmation">
            {loading ? (
                <Spinner animation="border" variant="success" />
            ) : showSuccessMessage ? (
                <div className="confirmation-circle">
                    <FaDollarSign className="dollar-icon" />
                    <FaCheckCircle className="check-icon" />
                    <p className="confirmation-text">Pagamento Confirmado</p>
                </div>
            ) : null}
        </div>
    );
};

export default PaymentConfirmation;
