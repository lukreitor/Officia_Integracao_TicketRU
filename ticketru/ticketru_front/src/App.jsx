import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import store from '../src/components/views/auth';
import React, { useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './assets/styles/style.css';

import { ProSidebarProvider } from 'react-pro-sidebar';

import { library } from '@fortawesome/fontawesome-svg-core';
//import { fas } from "@fortawesome/pro-solid-svg-icons";
//import { far } from "@fortawesome/pro-regular-svg-icons";
//import { fal } from "@fortawesome/pro-light-svg-icons";
import { fab } from '@fortawesome/free-brands-svg-icons';

import Login from './components/views/Login';
import SpinnerComponent from './components/views/Spinner';
import Dashboard from './components/views/dashboard/Dashboard';
import DashboardHome from './components/views/dashboard/components/pages/dashboard/DashboardHome';
import UserData from './components/views/UserData';
import PaymentHistory from './components/views/dashboard/components/pages/dashboard/PaymentHistory';
import Menu from './components/views/dashboard/components/pages/RU/Menu';
import Lunch from './components/views/dashboard/components/pages/RU/Meal';
import Dinner from './components/views/dashboard/components/pages/RU/Meal';
import Config from './components/views/dashboard/components/pages/About/Config';
import Campus from './components/views/dashboard/components/pages/About/Campus';

library.add(fab);

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        // simulate loading time
        setTimeout(() => setIsLoading(false), 2000);
    }, []);

    return isLoading ? (
        <SpinnerComponent color="warning" />
    ) : (
        <BrowserRouter>
            <ProSidebarProvider>
                <Provider store={store}>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        {isLoggedIn && (
                            <Route path="dashboard" element={<Dashboard />}>
                                <Route path="" element={<DashboardHome />} />

                                <Route
                                    path="studant-info"
                                    element={<UserData />}
                                />
                                <Route
                                    path="history"
                                    element={<PaymentHistory />}
                                />
                                <Route path="menu" element={<Menu />}></Route>
                                <Route
                                    path="config"
                                    element={<Config />}
                                ></Route>
                                <Route path="campus" element={<Campus />} />
                            </Route>
                        )}

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Provider>
            </ProSidebarProvider>
        </BrowserRouter>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

export default App;
