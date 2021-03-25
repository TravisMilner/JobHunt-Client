import React, { useContext, useEffect, useRef, useState } from "react"
import {useHistory} from "react-router-dom"
import {ContactContext} from "./ContactProvider.js"

export const ContactList = (props) => {
    const {contacts, getContacts, deleteContact} = useContext(ContactContext)
    const history = useHistory()
    const [contact, setContact] = useState([])
    const cont = useRef()

    useEffect(() => {
        getContacts()
    }, [])
    
    return (
        <article className = "contacts">
            <h1 id = "contactHead">My Contacts</h1>
            <button id = "contactNew"className="btn btn-secondary" onClick= {() => {
                history.push({pathname: "contacts/new"})
            }}>
                Add New Contact
            </button>
            <hr />
            <div className = "job--card">
            {
                contacts.map(c => {
                    return <section key = {`contact--${c.id}`} className = "job">
                            <div className = "contact__name"><h2>{c.name}</h2></div>
                            <div className = "contact__company">Company: {c.company}</div>
                            {/* <div className = "contact__email">Email: {c.email}</div>
                            <div className = "contact__phone">Phone Number: {c.phone_number}</div>
                            <div className = "contact__notes">Notes: {c.notes}</div> */}
                            <button className="btn btn-secondary" onClick = {() => {
                                deleteContact(c.id)
                            }}>Delete Contact</button>
                            <button className="btn btn-secondary"onClick = {() => {
                                history.push(`/contacts/${c.id}`)
                            }}>Edit Contact</button>
                            <button className = "btn btn-secondary" value = {c.id} onClick = {() => {
                                setContact(c)
                                cont.current.showModal()
                            }}>Details</button>
                    </section>
                })
            }
            </div>
            <dialog ref = {cont} className = "job__notes">
                <ul>
                <li>Email: {contact.email}</li>
                <li>Phone: {contact.phone_number}</li>
                <li>Notes: {contact.notes}</li>
                </ul>
                <div>
                    <button onClick = {() => {
                        cont.current.close()
                    }}>
                        Close
                    </button>
                    </div> 
                    </dialog>
        </article>
    )
}