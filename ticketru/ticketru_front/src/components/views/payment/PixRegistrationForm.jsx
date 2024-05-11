import { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import copy from 'clipboard-copy';
import { DateTime } from 'luxon';
import PaymentConfirmation from './PaymentConfirmation';

function PixRegistrationForm({
    onSubmit,
    onCancel,
    initialValues,
    totalPrice,
    quantity
}) {
    const [formValues, setFormValues] = useState(initialValues || {});
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [copied, setCopied] = useState(false);
    const [locationValue, setLocationValue] = useState('');
    const [qrCodeId, setQrCodeId] = useState('');
    const [qrCodeImageUrl, setQrCodeImageUrl] = useState(null);
    const ra = localStorage.getItem('ra'); // Get RA from localStorage
    const [isPaid, setIsPaid] = useState(false); // Add a new state variable to store the payment status

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Disable the button
        setButtonDisabled(true);
        try {
            const response = await fetch(
                'http://localhost:8080/pix/copia-e-cola',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ valor: totalPrice })
                }
            );

            if (response.ok) {
                checkPixStatus();

                const data = await response.json();
                setLocationValue(data[0][0]);
                setQrCodeId(data[0][1]);

                // Store the current LocalDateTime in sessionStorage or localStorage
                sessionStorage.setItem(
                    'currentDateTime',
                    DateTime.local()
                        .toUTC()
                        .toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'")
                );
                // Store the current QR code ID in sessionStorage or localStorage as a string
                sessionStorage.setItem('id', data[0][1]);

                console.log(data[0][1]);

                // Fetch the QR code image using the qrcodeid
                const qrCodeResponse = await fetch(
                    `http://localhost:8080/pix/qrcode/${data[0][1]}`
                );

                if (qrCodeResponse.ok) {
                    // qrCode response is a base64 encoded string, save it in the session storage

                    // Read the response as a blob (binary data)
                    const qrCodeBlob = await qrCodeResponse.blob();

                    // Create a URL object from the blob data
                    const qrCodeImageUrl = URL.createObjectURL(qrCodeBlob);

                    // Save the QR code image URL in state
                    setQrCodeImageUrl(qrCodeImageUrl);

                    // Send the additional form data to the create endpoint
                    const createResponse = await fetch(
                        'http://localhost:8080/pedidos/create',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                quantidade: quantity,
                                ra: ra
                            })
                        }
                    );

                    if (createResponse.ok) {
                        // save the id in sessionstorage as idPedido
                        const data = await createResponse.json();
                        sessionStorage.setItem('idPedido', data.id);
                        console.log(data.id);
                    } else {
                        throw new Error(
                            'Request failed with status: ' +
                                createResponse.status
                        );
                    }
                } else {
                    throw new Error(
                        'Request failed with status: ' + qrCodeResponse.status
                    );
                }
            } else {
                throw new Error(
                    'Request failed with status: ' + response.status
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Function to format LocalDateTime to the required format
    const formatLocalDateTime2 = (dateTime) => {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const [
            { value: month },
            ,
            { value: day },
            ,
            { value: year },
            ,
            { value: hour },
            ,
            { value: minute },
            ,
            { value: second }
        ] = formatter.formatToParts(dateTime);

        return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
    };

    const formatLocalDateTime = (dateTime) => {
        console.log('const', dateTime);
        return DateTime.fromISO(dateTime).toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
    };

    // Updated checkPixStatus function
    const checkPixStatus = async () => {
        try {
            // Retrieve the stored current LocalDateTime from sessionStorage or localStorage

            //wait 10 seconds
            await new Promise((resolve) => setTimeout(resolve, 5000)); //t this point, 10 seconds have passed

            const currentDateTime = sessionStorage.getItem('currentDateTime');
            let date = new Date(currentDateTime); // create a Date object from the string

            date.setHours(date.getHours() - 3); // subtract 3 hours from the date

            const updatedDateTime = date.toISOString(); // convert the updated date back to an ISO string
            console.log(updatedDateTime);
            // or const currentDateTime = localStorage.getItem('currentDateTime');
            const endDateTime = DateTime.local()
                .toUTC()
                .toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
            console.log(endDateTime);

            // Retrieve the id from localStorage
            const id = sessionStorage.getItem('id');

            // Format the present LocalDateTime to the required format

            // Call the endpoint with the stored ID and formatted LocalDateTime values
            const response = await fetch(
                `http://localhost:8080/pix/charge-status/${id}/${updatedDateTime}/${endDateTime}`
            );

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                const status = data[0].status;
                console.log(status);

                if (status !== 'ATIVA') {
                    console.log('PIX pago"');

                    // call the endpoint to update the payment status: http://localhost:8080/pedidos/pay-pedido/idPedido, idPedido is the value stored in sessionStorage
                    let idPedido = sessionStorage.getItem('idPedido');
                    let ra = localStorage.getItem('ra');

                    // pay-pedido is POST with body, method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: idPedido })
                    const payResponse = await fetch(
                        `http://localhost:8080/pedidos/pay-pedido/${idPedido}`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: idPedido })
                        }
                    );

                    if (payResponse.ok) {
                        const data = await payResponse.json();
                        console.log(data);
                    }

                    // call the endpoint to update the saldo in the localStorage http://localhost:8080/pedidos/find-by-id/idPedido the id can be retrieved from sessionStorage as idPedido
                    const saldoResponse = await fetch(
                        `http://localhost:8080/users/saldo/${ra}`
                    );

                    setButtonDisabled(false);
                    setIsPaid(true);

                    if (saldoResponse.ok) {
                        const saldo = await saldoResponse.json(); // saldo is an integer, not an object
                        localStorage.setItem('saldo', saldo);
                        window.dispatchEvent(new Event('saldoUpdated')); // dispatch custom event

                        console.log(saldo);
                    }
                } else {
                    // If the status is still "ATIVA", recursively call the checkPixStatus function after a specific interval (e.g., 10 seconds)
                    setTimeout(checkPixStatus, 10000);
                }
            } else {
                throw new Error(
                    'Request failed with status: ' + response.status
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Periodically check the PIX status every 10 seconds (adjust the interval as needed)
    setInterval(() => {
        // Retrieve the stored QR code ID from sessionStorage or localStorage
        const qrCodeId = sessionStorage.getItem('qrCodeId');
        // or const qrCodeId = localStorage.getItem('qrCodeId');

        if (qrCodeId) {
            checkPixStatus(qrCodeId);
        }
    }, 20000);

    const handleCopyClick = () => {
        const pixCode = locationValue;
        copy(pixCode);
        setCopied(true);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-end mb-1">
                <h4>R$ {totalPrice} reais</h4>
            </div>
            <div className="text-center">
                {isPaid ? (
                    <>
                        <PaymentConfirmation className="mb-3" />
                    </>
                ) : (
                    <>
                        {qrCodeImageUrl && (
                            <img src={qrCodeImageUrl} alt="QR Code" />
                        )}

                        <p>Escaneie e pague no aplicativo do seu banco</p>
                    </>
                )}
            </div>
            <div className="text-center mt-4">
                <p className="">OU</p>
            </div>
            <Form.Group
                controlId="formPixKey"
                className="d-flex align-items-center"
            >
                <Form.Label className="me-2">Chave Pix</Form.Label>
                <Form.Control
                    type="text"
                    name="pixKey"
                    value={locationValue}
                    onChange={handleChange}
                    className="rounded-0"
                />
                {copied ? (
                    <Button
                        variant="success"
                        className="rounded-0 bg-e-gradient"
                        disabled
                    >
                        Copiado
                    </Button>
                ) : (
                    <Button
                        variant="primary"
                        className="rounded-0"
                        onClick={handleCopyClick}
                    >
                        Copiar
                    </Button>
                )}
            </Form.Group>
            {/* Display the copied location value */}
            {locationValue && (
                <div className="text-center">
                    <p>Copie e cole no aplicativo do seu banco:</p>
                </div>
            )}

            <div className="d-flex justify-content-center">
                <Button
                    type="submit"
                    variant="success"
                    size="lg"
                    className="bg-e-gradient"
                    disabled={isButtonDisabled}
                >
                    Gerar Pix
                </Button>
            </div>
        </Form>
    );
}

export default PixRegistrationForm;
