import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faExclamationTriangle,
    faTicketAlt
} from '@fortawesome/free-solid-svg-icons';

const NoTicketsAlert = () => {
    return (
        <Alert variant="danger" className="text-center">
            <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
            <h4 className="alert-heading mt-3">Sem Fichas!</h4>
            <p>
                Você está sem fichas. Não seja pego de surpresa, compre novas
                fichas agora!
            </p>
            <hr />
            <div className="mb-0">
                <FontAwesomeIcon icon={faTicketAlt} />{' '}
                <a href="/buy-tickets">Comprar Fichas</a>
            </div>
        </Alert>
    );
};

export default NoTicketsAlert;
