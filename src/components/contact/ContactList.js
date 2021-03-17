import React, { useContext, useEffect } from "react"
import {useHistory} from "react-router-dom"
import {ContactContext} from "./ContactProvider.js"

export const ContactList = (props) => {
    const {contacts, getContacts, deleteContact} = useContext(ContactContext)
    const history = useHistory()

    useEffect(() => {
        getContacts()
    }, [])

    return (
        <article className = "contacts">
            <h1>My Contacts</h1>
            <button className = "contactButton" onClick= {() => {
                history.push({pathname: "contacts/new"})
            }}>
                Add New Contact
            </button>
            <hr />
            {
                contacts.map(c => {
                    return <section key = {`contact--${c.id}`} className = "contact">
                            <div className = "contact__name"><h2>{c.name}</h2></div>
                            <div className = "contact__company">Company: {c.company}</div>
                            <div className = "contact__email">Email: {c.email}</div>
                            <div className = "contact__phone">Phone Number: {c.phone_number}</div>
                            <div className = "contact__notes">Notes: {c.notes}</div>
                            <button className = "deleteContact" onClick = {() => {
                                deleteContact(c.id)
                            }}>Delete Contact</button>
                            <button className= "editContact" onClick = {() => {
                                history.push(`/contacts/${c.id}`)
                            }}>Edit Contact</button>
                    </section>
                })
            }
        </article>
    )
}