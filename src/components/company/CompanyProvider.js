import React, { createContext, useState } from "react"

export const CompanyContext = createContext()

export const CompanyProvider = (props) => {
    const [company, setCompanies] = useState([])

    const getCompanies = () => {
        return fetch("http://localhost:8000/companies", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("jh_token")}`
            }
        })
        .then(res => res.json())
        .then(setCompanies)
    }

    const createCompany = (company) => {
        return fetch("http://localhost:8000/companies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("jh_token")}`
            },
            body: JSON.stringify(company)
        })
        .then(res => res.json())
        .then(getCompanies)
    }

    const deleteCompany = (companyId) => {
        return fetch(`http://localhost:8000/companies/${companyId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("jh_token")}`
            }
        })
        .then(getCompanies)
    }

    const getCompanyById = (id) => {
        return fetch(`http://localhost:8000/companies/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("jh_token")}`
            }
        })
        .then(res => res.json())
    }

    const editCompany = (compObj) => {
        return fetch(`http://localhost:8000/companies/${compObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("jh_token")}`
            },
            body: JSON.stringify(compObj)
        })
        .then(getCompanies)
        
    }






    return(
        <CompanyContext.Provider value = {{company, getCompanies, createCompany, deleteCompany, getCompanyById, editCompany}} >
            {props.children}
        </CompanyContext.Provider>
    )
}