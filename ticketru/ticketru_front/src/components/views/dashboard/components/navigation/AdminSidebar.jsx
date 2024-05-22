import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BorderBottom, BoxArrowLeft } from 'react-bootstrap-icons';
import { FaUserAlt } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaUserGraduate } from 'react-icons/fa';
import { FaHistory } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { BsFillCupHotFill } from 'react-icons/bs';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import { BsGearFill } from 'react-icons/bs';

const AdminSidebar = ({ course, courses, active, setActive, showSidebar }) => {
    const sidebarRef = useRef(null);
    const [sidebarVisible, setSidebarVisible] = useState(showSidebar);
    const [collapsed, setCollapsed] = useState(false);

    const name =
        localStorage.getItem('firstname') +
        ' ' +
        localStorage.getItem('lastname');
    const ra = localStorage.getItem('ra');

    useEffect(() => {
        // add event listener to window
        window.addEventListener('click', handleOutsideClick);

        // cleanup function to remove event listener
        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (e) => {
        // check if the click was outside the sidebar
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setActive('');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    const handleDocumentClick = (event) => {
        const sidebarEl = document.querySelector('.sidebar-wrapper');
        const toggleButtonEl = document.querySelector('.admin-navbar button');

        if (
            !sidebarEl.contains(event.target) &&
            !toggleButtonEl.contains(event.target)
        ) {
            setSidebarVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleSidebarToggle = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        setSidebarVisible(showSidebar);
    }, [showSidebar]);

    return (
        <div style={{ position: 'relative' }}>
            <Sidebar
                collapsed={true}
                collapsedWidth="0px"
                hidden={!showSidebar}
                className="pro-sidebar d-flex flex-column"
                style={{
                    height: '100vh',
                    backgroundColor: '#f6c500 !important'
                }}
            >
                <Menu iconShape="square" className="flex-grow-1">
                    <div className="sidebar-header bg-white">
                        <div className="m">
                            <FaUserAlt
                                className="sidebar-header-icon text-yellow"
                                style={{
                                    marginRight: '15px',
                                    fontSize: '2.8rem'
                                }}
                            />
                        </div>
                        <div>
                            <div className="sidebar-header-name">{name}</div>
                            <div className="sidebar-header-ra">{`RA: ${ra}`}</div>
                        </div>
                    </div>

                    <MenuItem className="bg-light-gray fw-semibold">
                        Aluno
                    </MenuItem>

                    <MenuItem
                        component={<Link to="" />}
                        active={active === 'home'}
                        onClick={() => setActive('home')}
                        className="menu-item"
                    >
                        <FaHome className="me-2" size={20} /> Comprar Fichas
                    </MenuItem>

                    <MenuItem component={<Link to="studant-info" />}>
                        <FaUserGraduate className="me-2" size={20} />{' '}
                        Informações do Aluno
                    </MenuItem>

                    <MenuItem
                        component={<Link to="history" />}
                        active={active === 'history'}
                        onClick={() => setActive('history')}
                    >
                        <FaHistory className="me-2" size={20} /> Histórico de
                        Compras
                    </MenuItem>

                    <MenuItem className="bg-light-gray fw-semibold">
                        Restaurante
                    </MenuItem>

                    <MenuItem
                        component={<Link to="menu" />}
                        active={active === 'menu'}
                        onClick={() => setActive('menu')}
                    >
                        <BsFillMenuButtonWideFill className=" me-2" />
                        Cárdapio
                    </MenuItem>

                    <MenuItem
                        component={<Link to="history" />}
                        active={active === 'history'}
                        onClick={() => setActive('history')}
                    >
                        <BsFillCupHotFill className="me-2" size={20} />
                        Histórico de Refeições
                    </MenuItem>

                    <MenuItem className="bg-light-gray fw-semibold">
                        Sobre
                    </MenuItem>

                    <MenuItem
                        component={<Link to="Campus" />}
                        active={active === 'Campus'}
                        onClick={() => setActive('Campus')}
                    >
                        <BsFillJournalBookmarkFill className=" me-2" />
                        Campus
                    </MenuItem>

                    <MenuItem
                        component={<Link to="config" />}
                        active={active === 'config'}
                        onClick={() => setActive('config')}
                    >
                        <BsGearFill className="me-2" size={20} />
                        Configurações
                    </MenuItem>

                    <div
                        className="sidebar-footer bg-yellow mt-auto align-self-end position-absolute bottom-0 start-0 w-100 d-flex flex-column align-items-start"
                        style={{ borderTop: '2px solid black' }}
                    >
                        <Button
                            variant="link"
                            onClick={handleLogout}
                            className="d-flex align-items-center text-black"
                            style={{ fontSize: '1rem', fontWeight: '500' }}
                        >
                            <BoxArrowLeft className="me-2" size={20} />
                            Sair
                        </Button>

                        <p
                            className="align-self-center "
                            style={{
                                marginTop: '15%',
                                fontWeight: '400',
                                fontSize: '0.9rem'
                            }}
                        >
                            &copy; TicketRU 2023
                        </p>
                    </div>
                </Menu>
            </Sidebar>
            <Button
                variant="outline-secondary"
                onClick={handleSidebarToggle}
                style={{
                    width: '40px',
                    height: '40px',
                    position: 'absolute',
                    top: '10px',
                    right: '10px'
                }}
            >
                <FaBars />
            </Button>
        </div>
    );
};

AdminSidebar.defaultProps = {
    name: 'John Doe',
    ra: 123456,
    course: 'Computer Science',
    courses: [],
    active: '',
    setActive: () => {}
};

export default AdminSidebar;
