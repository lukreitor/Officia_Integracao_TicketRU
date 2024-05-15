import { Navbar } from 'react-bootstrap';

function AdminFooter() {
    return (
        <>
            <Navbar
                bg="light"
                expand="lg"
                className="bg-horizontal d-flex justify-content-center align-items-center"
            >
                <Navbar.Brand
                    href="https://utfpr.edu.br"
                    className=" d-flex align-items-center justify-content-center m-0 p-0"
                    target="_blank"
                >
                    <span style={{ fontWeight: '700', fontSize: '1.5rem' }}>
                        UTFPR
                    </span>
                </Navbar.Brand>
            </Navbar>
        </>
    );
}

export default AdminFooter;
