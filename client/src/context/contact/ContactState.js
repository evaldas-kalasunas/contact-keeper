import React, { useReducer } from 'react'
import axios from 'axios'
import {v4 as uuid} from "uuid";
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    CONTACT_ERROR,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_CONTACTS
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState)

    // Get Contacts
    const getContacts = async () => {

        try {
            const res = await axios.get('/api/contacts')
            dispatch({ type: GET_CONTACTS, payload: res.data})
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.message
            })
        }
       
    }

    // Add Contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config)
            dispatch({ type: ADD_CONTACT, payload: res.data})
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.message
            })
        }
       
    }

    // Update Contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
            dispatch({ type: UPDATE_CONTACT, payload: res.data})
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.message
            })
        }
    }
    // Delete Contact
    const deleteContact = async id => {
        try {
             await axios.delete(`/api/contacts/${id}`)
             dispatch({ type: DELETE_CONTACT, payload: id})
            } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.message
            })
        }
    }

    // Clear Contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }

    // Set Current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact})
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT})
    }

    // Filter Contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text})
    }
    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER})
    }

    return (
        <ContactContext.Provider
        value={{
            // Anything to be accessible from state or actions
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            getContacts,
            addContact,
            updateContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            filterContacts,
            clearFilter,
            clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState