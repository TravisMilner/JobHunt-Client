import React, { useContext, useEffect, useState, useRef } from "react"
import {CompanyContext} from "./CompanyProvider.js"
import {useHistory} from "react-router-dom"
import "../job/Job.css"

export const CompanyList = (props) => {
    const {company, getCompanies, deleteCompany} = useContext(CompanyContext)
    const history = useHistory()
    const [comp, setComp] = useState([])
    const compo = useRef()

    useEffect(() => {
        getCompanies()
    }, [])

    return (
        <article className="companies">
            <h1 id = "comp_head">My Companies</h1>
            <button className= "btn btn-secondary" id = "comp__new" onClick={() => {
                history.push({ pathname: "/companies/new"})
            }}>
                Add New Company
            </button>
            <hr />
            {
                company.map(c => {
                    return <section key = {`job--${c.id}`} className="job">

                        <div className = "company__name"><h2>{c.name}</h2></div>
                        <button className= "btn btn-secondary" value = {c.id} onClick = {() => {
                            setComp(c)
                            compo.current.showModal()
                        }}>Notes</button>
                        <button className= "btn btn-secondary"onClick = {() => {
                            deleteCompany(c.id)
                        }}>Delete Company</button>
                        <button className= "btn btn-secondary" onClick = {() => {
                            history.push(`/companies/${c.id}`)
                        }}>Edit Company</button>
                        
                    </section>
                })
            }
            <dialog ref = {compo} className = "job__notes"> {comp.notes}<div><button onClick={() => {
                compo.current.close()
            }}>Close</button></div></dialog>
        </article>
    )
}