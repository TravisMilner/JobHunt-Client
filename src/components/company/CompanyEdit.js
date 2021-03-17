import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { CompanyContext } from "./CompanyProvider"

export const CompanyEdit = (props) => {
    const history = useHistory()
    const { editCompany, getCompanyById } = useContext(CompanyContext)

    const [currentCompany, setCurrentCompany] = useState({
        name: "",
        notes: ""
    })

    useEffect(() => {
        getCompanyById(props.match.params.companyId)
        .then(setCurrentCompany)
    }, [])

    const changeCompanyState = (domEvent) => {
        const newCompanyState = Object.assign({}, currentCompany)
        newCompanyState[domEvent.target.name] = domEvent.target.value
        setCurrentCompany(newCompanyState)
    }

    return (
        <form className = "companyForm">
            <h2 className = "companyForm__title">Add New Company</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor = "name">Name of Company:</label>
                    <input type = "text" name = "name" required autoFocus className = "form-control" value = {currentCompany.name} onChange={changeCompanyState} />
                    <label htmlFor = "notes">Notes:</label>
                    <textarea name = "notes" required className = "form-control" value = {currentCompany.notes} onChange={changeCompanyState} />
                </div>
            </fieldset>

            <button type = "submit"
                onClick = {evt => {
                    evt.preventDefault()

                    const company = {
                        id: parseInt(props.match.params.companyId),
                        name: currentCompany.name,
                        notes: currentCompany.notes
                    }

                    editCompany(company)
                        .then(() => history.push("/companies"))
                }}
                className= "companySaveButton">Save Company</button>
        </form>
    )
}