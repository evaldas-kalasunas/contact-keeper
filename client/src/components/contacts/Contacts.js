import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactContext from './../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from './../layout/Spinner';

const Contacts = () => {
    const contactContext = useContext(ContactContext)

    const { contacts, filtered, getContacts, loading } = contactContext 

    useEffect(() => {
        getContacts()
        // eslint-disable-next-line
    }, [])

    const nodeRef = React.useRef(null)
    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Please add contact</h4>
    }
    return (
        <Fragment>
            {contacts !== null ? (
                <TransitionGroup>
                {filtered !== null ? filtered.map(contact => 
                (
                    <CSSTransition  key={contact._id}  nodeRef={nodeRef} timeout={500} classNames="item">
                        <div  ref={nodeRef}>
                            <ContactItem contact={contact}/>
                        </div>
                    </CSSTransition>
                ))   
                : contacts.map(contact => (
                    <CSSTransition  key={contact._id} nodeRef={nodeRef} timeout={500} classNames="item">
                        <div  ref={nodeRef}>
                            <ContactItem contact={contact}/>
                        </div>
                    </CSSTransition>
                    ))}
            </TransitionGroup>
            ) : <Spinner/>}
            
        </Fragment>
    )
}

export default Contacts
