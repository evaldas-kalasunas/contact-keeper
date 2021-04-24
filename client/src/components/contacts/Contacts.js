import React, { Fragment, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactContext from './../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
    const contactContext = useContext(ContactContext)

    const { contacts, filtered } = contactContext 

    const nodeRef = React.useRef(null)
    if (contacts.length === 0) {
        return <h4>Please add contact</h4>
    }
    return (
        <Fragment>
            <TransitionGroup>
                {filtered !== null ? filtered.map(contact => 
                (
                    <CSSTransition  key={contact.id}  nodeRef={nodeRef} timeout={500} classNames="item">
                        <div  ref={nodeRef}>
                            <ContactItem contact={contact}/>
                        </div>
                    </CSSTransition>
                ))   
                : contacts.map(contact => (
                    <CSSTransition  key={contact.id} nodeRef={nodeRef} timeout={500} classNames="item">
                        <div  ref={nodeRef}>
                            <ContactItem contact={contact}/>
                        </div>
                    </CSSTransition>
                    ))}
            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts
