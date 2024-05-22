import { Navbar, Container, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';

function AdminNavbar() {
    const [showSidebar, setShowSidebar] = useState(false);

    const handleSidebarToggle = () => setShowSidebar(!showSidebar);

    const handleDocumentClick = (event) => {
        const sidebarEl = document.querySelector('.sidebar-wrapper');
        const toggleButtonEl = document.querySelector('.admin-navbar button');

        if (
            !sidebarEl.contains(event.target) &&
            !toggleButtonEl.contains(event.target)
        ) {
            setShowSidebar(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <>
            <Navbar
                bg="light"
                expand="lg"
                className="admin-navbar navbar-custom bg-image"
            >
                <Container>
                    <Button
                        variant="outline-secondary"
                        onClick={handleSidebarToggle}
                    >
                        <FaBars />
                    </Button>
                    <Navbar.Brand href="#home">
                        <img
                            src="assets/images/logo-ticket.png"
                            alt=""
                            style={{
                                height: '100px',
                                width: '100px'
                            }}
                        />
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <div className={`sidebar-wrapper ${showSidebar ? 'show' : ''}`}>
                <AdminSidebar showSidebar={showSidebar} />
            </div>
            <div className="content-wrapper">
                {/* Your content goes here */}
            </div>
        </>
    );
}

export default AdminNavbar;
