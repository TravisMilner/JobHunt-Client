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






    return(
        <CompanyContext.Provider value = {{company, getCompanies}} >
            {props.children}
        </CompanyContext.Provider>
    )
}