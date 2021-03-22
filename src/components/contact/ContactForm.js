import React, { useContext, useState} from "react"
import { useHistory } from 'react-router-dom'
import {ContactContext} from "./ContactProvider.js"

export const ContactForm = () => {
    const history = useHistory()
    const {createContact} = useContext(ContactContext)

    const [currentContact, setCurrentContact] = useState({
        name: "",
        company: "",
        email: "",
        phone_number: "",
        notes: ""
    })

    const changeContactState = (domEvent) => {
        const newContactState = Object.assign({}, currentContact)
        newContactState[domEvent.target.name] = domEvent.target.value
        setCurrentContact(newContactState)
    }
    

    return (
        <form className = "contactForm">
            <h2 className = "contactForm__title">Add a new Contact</h2>
            <fieldset>
                <div className = "form-group">
                    <label htmlFor = "name">Name:</label>
                    <input type = "text" name = "name" required autoFocus className = "form-control" value = {currentContact.name} onChange={changeContactState} />
                    <label htmlFor = "company">Company:</label>
                    <input type = "text" name = "company" required autoFocus className = "form-control" value = {currentContact.company} onChange={changeContactState} />
                    <label htmlFor = "email">Email:</label>
                    <input type = "text" name = "email" required autoFocus className = "form-control" value = {currentContact.email} onChange={changeContactState} />
                    <label htmlFor = "phone_number">Phone Number:</label>
                    <input type = "text" name = "phone_number" required autoFocus className = "form-control" value = {currentContact.phone_number} onChange={changeContactState} />
                    <label htmlFor = "notes">Notes:</label>
                    <textarea name = "notes" required autoFocus className = "form-control" value = {currentContact.notes} onChange={changeContactState} />
                </div>
            </fieldset>

            <button type = "submit" onClick = {evt => {
                evt.preventDefault()

                const contact = {
                    name: currentContact.name,
                    company: currentContact.company,
                    email: currentContact.email,
                    phone_number: currentContact.phone_number,
                    notes: currentContact.notes

                }
                createContact(contact)
                    .then(()=> history.push("/contacts"))
            }}
            className = "contactButton">Save Contact</button>

        </form>
    )
        
}