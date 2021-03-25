import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { CompanyContext } from "./CompanyProvider"

export const CompanyForm = () => {
    const history = useHistory()
    const { createCompany } = useContext(CompanyContext)
    

    const [currentCompany, setCurrentCompany] = useState({
        name: "",
        notes: ""
    })

    const changeCompanyState = (domEvent) => {
        const newCompanyState = Object.assign({}, currentCompany)
        newCompanyState[domEvent.target.name] = domEvent.target.value
        setCurrentCompany(newCompanyState)
    }

    return (
        <form className = "form--login">
            <h2 className = "companyForm__title">Add New Company</h2>
            <fieldset>
                <div className="form-group">
                    
                    <input placeholder = "Company Name" type = "text" name = "name" required autoFocus className = "form-control" value = {currentCompany.name} onChange={changeCompanyState} />
                    
                    <textarea id = "textField" placeholder = "Notes" name = "notes" required className = "form-control" value = {currentCompany.notes} onChange={changeCompanyState} />
                </div>
            </fieldset>

            <button type = "submit"
                onClick = {evt => {
                    evt.preventDefault()

                    const company = {
                        name: currentCompany.name,
                        notes: currentCompany.notes
                    }

                    createCompany(company)
                        .then(() => history.push("/companies"))
                }}
                className="btn btn-secondary">Add Company</button>
        </form>
    )
}