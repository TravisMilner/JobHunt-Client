import React, { useContext, useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import {JobContext} from "./JobProvider.js"
import "./Job.css"

export const JobForm = () => {
    const history = useHistory()
    const {createJob, getStatus, status} = useContext(JobContext)

    const [currentJob, setCurrentJob] = useState({
        name: "",
        date_of_app: "",
        status_id: "",
        notes: "",
        link: ""
        

    })

    useEffect(()=> {
        getStatus()
    }, [])

    const changeJobState = (domEvent) => {
        const newJobState = Object.assign({}, currentJob)
        newJobState[domEvent.target.name] = domEvent.target.value
        setCurrentJob(newJobState)
    }

    return (
        <form className = "form--login">
            <h2 className = "jobForm__title">Add a New Application</h2>
            <fieldset>
                <div className = "form-group">
                    
                    <input placeholder ="Job Title" type = "text" name = "name" required autoFocus className = "form-control"
                        value = {currentJob.name}
                        onChange= {changeJobState}
                    />
                    
                    <input placeholder = "Date of Application" type = "date" name = "date_of_app" required className = "form-control" value = {currentJob.date_of_app} onChange = {changeJobState} />
                    
                    <select id = "selectDrop" className = "statusCategoryDrop" onChange = {changeJobState} name = "status_id">
                        <option>Application Status Selection...</option>
                        {
                            status.map(s => <option key = {s.id} value = {s.id}>{s.label}</option>)
                            
                        }
                    </select>
                    
                    <textarea placeholder = "Notes" name = "notes" className = "textarea" id = "textField"value = {currentJob.notes} onChange = {changeJobState} />
                    
                </div>
            </fieldset>

            <button type = "submit"
                onClick = {evt => {
                    evt.preventDefault()

                    const job = {
                        name: currentJob.name,
                        date_of_app: currentJob.date_of_app,
                        status: parseInt(currentJob.status_id),
                        notes: currentJob.notes,
                        link: currentJob.link
                    }
                    createJob(job)
                        .then(() => history.push("/"))
                }}
                className="btn btn-secondary">Save Application</button>
        </form>
    )
}