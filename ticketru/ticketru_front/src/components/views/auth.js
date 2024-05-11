import {
    createSlice,
    createAsyncThunk,
    configureStore
} from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';

import { useNavigate } from 'react-router-dom';

function handleLoginSuccess() {
    const navigate = useNavigate();
    window.location.reload();
    navigate('/');
}

const initialState = {
    user: {
        isAuthenticated: false,
        token: null
    }
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ ra, password }) => {
        const response = await fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ ra, password })
        });

        const data = await response.json();

        localStorage.setItem('token', data.message.token);

        return data.message.token;
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('token');
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user.isAuthenticated = true;
                state.user.token = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user.isAuthenticated = false;
                state.user.token = null;
                localStorage.removeItem('token');
            });
    }
});

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(createSagaMiddleware())
});

export default store;
