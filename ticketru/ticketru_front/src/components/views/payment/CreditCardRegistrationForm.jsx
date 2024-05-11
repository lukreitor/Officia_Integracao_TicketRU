import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { number, expirationDate, cvv, cardholderName } from 'card-validator';
import creditCardType from 'credit-card-type';
import InputGroup from 'react-bootstrap/InputGroup';

function CreditCardRegistrationForm({
    onSubmit,
    onCancel,
    initialValues,
    totalPrice
}) {
    const [formValues, setFormValues] = useState(initialValues || {});
    const [paymentToken, setPaymentToken] = useState(null);
    const [cardType, setCardType] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });

        if (name === 'number') {
            const detectedCard = creditCardType(value);
            if (detectedCard.length > 0) {
                setCardType(detectedCard[0].type);
            } else {
                setCardType('');
            }
        }

        if (name === 'expiration') {
            if (value.length === 2 && formValues.expiration.length === 1) {
                setFormValues({ ...formValues, [name]: value + '/' });
            } else if (
                value.length === 2 &&
                formValues.expiration.length === 3
            ) {
                setFormValues({ ...formValues, [name]: value.slice(0, 1) });
            } else {
                setFormValues({ ...formValues, [name]: value });
            }
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src =
            'https://api.gerencianet.com.br/v1/cdn/itauShopline/5c9fa448a4f48e454166b1a6';
        script.async = true;

        let interval; // Define interval here so it's accessible in the cleanup function.

        script.onload = () => {
            console.log('Script loaded');

            interval = setInterval(() => {
                if (window.ItauShopline) {
                    console.log('window.ItauShopline is defined');
                    clearInterval(interval);
                    setCanSubmit(true); // Once window.ItauShopline is defined, we can submit the form.
                }
            }, 1000);
        };

        script.onerror = () => {
            console.error('Error loading script');
        };

        document.body.appendChild(script);

        return () => {
            clearInterval(interval); // Now interval is defined and can be cleared.
        };
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('handleSubmit function was called');

        if (window.ItauShopline) {
            console.log('window.ItauShopline is defined in handleSubmit');

            window.ItauShopline.getPaymentToken(
                {
                    brand: formValues.brand,
                    number: formValues.number,
                    cvv: formValues.cvv,
                    expiration_month: formValues.expiration.split('/')[0],
                    expiration_year: formValues.expiration.split('/')[1],
                    reuse: true
                },
                async (error, result) => {
                    if (error) {
                        console.error(error);
                        return;
                    }

                    console.log('payment token', result);
                    if (result.token) {
                        setPaymentToken(result.token);
                        try {
                            let response = await fetch(
                                'http://localhost:8080/charge/create/',
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        value: totalPrice,
                                        paymentToken: result.token,
                                        name: formValues.cardholderName,
                                        cpf: localStorage.getItem('cpf'),
                                        email: localStorage.getItem('email')
                                    })
                                }
                            );
                            let data = await response.json();
                            if (data.status === 'success') {
                                // handle success response
                            } else {
                                // handle error response
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    }
                }
            );
        } else {
            console.log('window.ItauShopline is not defined in handleSubmit');
        }
    };

    const validateCardNumber = () => {
        const validationResult = number(formValues.number);
        return validationResult.isValid;
    };

    const validateExpirationDate = () => {
        const validationResult = expirationDate(formValues.expiration);
        return validationResult.isValid;
    };

    const validateCVV = () => {
        const validationResult = cvv(formValues.cvv);
        return validationResult.isValid;
    };

    const validateCardholderName = () => {
        const validationResult = cardholderName(formValues.cardholderName);
        return validationResult.isValid;
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-end mb-2">
                <div>
                    <h4>R$ {totalPrice} reais</h4>
                </div>
            </div>
            <Form.Group controlId="formCreditCardNumber">
                <Form.Label>Número do Cartão de Crédito</Form.Label>
                <InputGroup hasValidation>
                    <InputGroup.Text>
                        {cardType && (
                            <img
                                src={`./assets/brands/${cardType}.svg`}
                                alt="card type"
                                width={48}
                                height={48}
                            />
                        )}
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        name="number"
                        value={formValues.number}
                        placeholder="____ ____ ____ ____"
                        onChange={handleChange}
                        isInvalid={validateCardNumber()}
                    />
                    {!validateCardNumber() && (
                        <Form.Control.Feedback type="invalid">
                            Número do Cartão não é Valido
                        </Form.Control.Feedback>
                    )}
                </InputGroup>
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center">
                <Form.Group controlId="formCreditCardExpiration">
                    <Form.Label>Data de Validade</Form.Label>
                    <Form.Control
                        type="text"
                        name="expiration"
                        value={formValues.expiration}
                        onChange={handleChange}
                        placeholder="__/__"
                        maxLength="5" // MM/YY format
                        isInvalid={validateExpirationDate()}
                    />
                    {!validateExpirationDate() && (
                        <Form.Control.Feedback type="invalid">
                            Data de Validade Inválida
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group controlId="formCreditCardCVV" className="ms-3">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                        type="text"
                        name="cvv"
                        placeholder="___"
                        value={formValues.cvv}
                        onChange={handleChange}
                        isInvalid={validateCVV()}
                    />
                    {!validateCVV() && (
                        <Form.Control.Feedback type="invalid">
                            CVV Inválido
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
            </div>
            <Form.Group controlId="formCreditCardName" className="mb-1">
                <Form.Label>Nome do Titular</Form.Label>
                <Form.Control
                    type="text"
                    name="cardholderName"
                    value={formValues.name}
                    placeholder="Nome Completo: ex Lucas Martins da Silva Sena"
                    onChange={handleChange}
                    isInvalid={validateCardholderName()}
                />
                {!validateCardholderName() && (
                    <Form.Control.Feedback type="invalid">
                        Nome do Titular Inválido
                    </Form.Control.Feedback>
                )}
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center">
                <Button variant="primary" type="submit">
                    Salvar Cartão
                </Button>{' '}
                <Button
                    variant="success"
                    onClick={handleSubmit}
                    className="bg-e-gradient"
                    type="submit"
                >
                    Comprar
                </Button>
            </div>
        </Form>
    );
}

export default CreditCardRegistrationForm;
