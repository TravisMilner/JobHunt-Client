import React, { createContext, useState } from "react"

export const ContactContext = createContext()

export const ContactProvider = (props) => {
    const [contacts, setContacts] = useState([])

    const getContacts = () => {
        return fetch("http://localhost:8000/contacts", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("jh_token")}`
            }
        })
        .then(res => res.json())
        .then(setContacts)
    }

    const createContact = (contact) => {
        return fetch("http://localhost:8000/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("jh_token")}`
            },
            body: JSON.stringify(contact)
        })
        .then(res => res.json())
        .then(getContacts)
    }

    const deleteContact = (contactId) => {
        return fetch(`http://localhost:8000/contacts/${contactId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("jh_token")}`
            }
        })
        .then(getContacts)
    }

    return(
        <ContactContext.Provider value = {{contacts, getContacts, createContact, deleteContact}} >
            {props.children}
        </ContactContext.Provider>
    )
}