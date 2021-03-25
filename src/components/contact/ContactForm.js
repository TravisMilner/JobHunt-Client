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
        <form className = "form--login">
            <h2 className = "contactForm__title">Add a New Contact</h2>
            <fieldset>
                <div className = "form-group">
                    
                    <input placeholder="Name" type = "text" name = "name" required autoFocus className = "form-control" value = {currentContact.name} onChange={changeContactState} />
                    
                    <input placeholder="Company" type = "text" name = "company" required autoFocus className = "form-control" value = {currentContact.company} onChange={changeContactState} />
                    
                    <input placeholder="Email" type = "text" name = "email" required autoFocus className = "form-control" value = {currentContact.email} onChange={changeContactState} />
                    
                    <input placeholder = "Phone Number" type = "text" name = "phone_number" required autoFocus className = "form-control" value = {currentContact.phone_number} onChange={changeContactState} />
                    
                    <textarea placeholder = "Notes" id = "textField" name = "notes" required autoFocus className = "form-control" value = {currentContact.notes} onChange={changeContactState} />
                </div>
            </fieldset>

            <button  id = "newButton" type = "submit" onClick = {evt => {
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
            className="btn btn-secondary">Save Contact</button>

        </form>
    )
        
}