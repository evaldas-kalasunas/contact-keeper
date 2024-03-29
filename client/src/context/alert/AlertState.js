import React, { useReducer } from 'react'
import {v4 as uuid} from "uuid";

import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const AlertState = props => {
    const initialState = []

    const [state, dispatch] = useReducer(alertReducer, initialState)

    // Set Alert
    const setAlert = (message, type, timeout = 3000) => {
       const id = uuid()
       dispatch({
           type: SET_ALERT,
           payload: {message, type, id} 
        })

        setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout)
    }

    return (
        <AlertContext.Provider
        value={{
            // Anything to be accessible from state or actions
            alerts: state,
            setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState