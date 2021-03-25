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

    if(currentCompany.user !== localStorage.getItem("jh_token")) {
        return(<h2>Cant do that. go back</h2>)
    }else {

    return (
        <form className = "form--login">
            <h2 className = "companyForm__title">Edit Existing Company</h2>
            <fieldset>
                <div className="form-group">
                    
                    <input type = "text" name = "name" required autoFocus className = "form-control" value = {currentCompany.name} onChange={changeCompanyState} />
                    
                    <textarea id = "textField" name = "notes" required className = "form-control" value = {currentCompany.notes} onChange={changeCompanyState} />
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
                className="btn btn-secondary">Save Company</button>
        </form>
    )
            }
}