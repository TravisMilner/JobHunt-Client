import React, { useContext, useEffect } from "react"
import {CompanyContext} from "./CompanyProvider.js"
import {useHistory} from "react-router-dom"

export const CompanyList = (props) => {
    const {company, getCompanies, deleteCompany} = useContext(CompanyContext)
    const history = useHistory()

    useEffect(() => {
        getCompanies()
    }, [])

    return (
        <article className="companies">
            <h1>My Companies</h1>
            <button className="companyButton" onClick={() => {
                history.push({ pathname: "/companies/new"})
            }}>
                Add New Company
            </button>
            <hr />
            {
                company.map(c => {
                    return <section key = {`job--${c.id}`} className="job">

                        <div className = "company__name"><h2>{c.name}</h2></div>
                        <div className = "job__notes">Notes: {c.notes}</div>
                        <button className = "deleteCompany" onClick = {() => {
                            deleteCompany(c.id)
                        }}>Delete Company</button>
                        
                    </section>
                })
            }
        </article>
    )
}