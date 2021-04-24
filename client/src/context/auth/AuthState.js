import React, { useReducer } from 'react'
import AuthContext from './authContext';
import authtReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

   // Register User

   // Load User

   // Login User

   // Logout User

   // Clear Errors

    return (
        <AuthContext.Provider
        value={{
            // Anything to be accessible from state or actions
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState