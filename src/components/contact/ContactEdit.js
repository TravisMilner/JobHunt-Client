import React, { useContext, useEffect, useState} from "react"
import { useHistory } from 'react-router-dom'
import {ContactContext} from "./ContactProvider.js"

export const ContactEdit= (props) => {
    const history = useHistory()
    const {getContactById, editContact} = useContext(ContactContext)

    const [currentContact, setCurrentContact] = useState({
        name: "",
        company: "",
        email: "",
        phone_number: "",
        notes: ""
    })

    useEffect(() => {
        getContactById(props.match.params.cId)
            .then(setCurrentContact)
    }, [])

    const changeContactState = (domEvent) => {
        const newContactState = Object.assign({}, currentContact)
        newContactState[domEvent.target.name] = domEvent.target.value
        setCurrentContact(newContactState)
    }
    if(currentContact.user !== localStorage.getItem("jh_token")) {
        return(<h2>Can't do that. Please go back</h2>)
    }
    else {return (
        <form className = "form--login">
            <h2 className = "contactForm__title">Add a new Contact</h2>
            <fieldset>
                <div className = "form-group">
                    
                    <input type = "text" name = "name" required autoFocus className = "form-control" value = {currentContact.name} onChange={changeContactState} />
                    
                    <input type = "text" name = "company" required autoFocus className = "form-control" value = {currentContact.company} onChange={changeContactState} />
                    
                    <input type = "text" name = "email" required autoFocus className = "form-control" value = {currentContact.email} onChange={changeContactState} />
                    
                    <input type = "text" name = "phone_number" required autoFocus className = "form-control" value = {currentContact.phone_number} onChange={changeContactState} />
                    
                    <textarea id = "textField" name = "notes" required autoFocus className = "form-control" value = {currentContact.notes} onChange={changeContactState} />
                </div>
            </fieldset>

            <button id = "newButton" type = "submit" onClick = {evt => {
                evt.preventDefault()

                const contact = {
                    id: parseInt(props.match.params.cId),
                    name: currentContact.name,
                    company: currentContact.company,
                    email: currentContact.email,
                    phone_number: currentContact.phone_number,
                    notes: currentContact.notes

                }
                editContact(contact)
                    .then(()=> history.push("/contacts"))
            }}
            className="btn btn-secondary">Save Contact</button>

        </form>
    )}
}