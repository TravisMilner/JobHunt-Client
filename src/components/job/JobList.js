import React, { useContext, useEffect, useRef, useState} from "react"
import { JobContext } from "./JobProvider.js"
import {useHistory} from "react-router-dom"
import "./Job.css"

export const JobList = (props) => {
    const {jobs, getJobs, deleteJob, getJobById} = useContext(JobContext)
    const [job, setJob] = useState([])
    const history = useHistory()
    const note = useRef()

    useEffect(() => {
        getJobs()
    }, [])

    return (
        <article className="jobs">
            <h1 id = "jobs__head">My Job Applications</h1>
            <button className="btn btn-secondary" id = "jobs__new" onClick={() => {
                history.push({ pathname: "/jobs/new"})
            }}>
                Add New Application
            </button>
            <hr />
            <div className = "job--card">
            {
                jobs.map(job => {
                    return <section key = {`job--${job.id}`} className="job">

                        <div className = "job__name"><h2>{job.name}</h2></div>
                        <div className = "job__date_of_app">Date of Application: {job.date_of_app}</div>
                        <div className = "job__status">Status: {job.status.label}</div>
                        
                        <button className="btn btn-secondary" value = {job.id} onClick={() => {
                            setJob(job)
                            note.current.showModal()
                        }}>Notes</button>
                        {/* <div className = "job__link"> Link: {job.link}</div> */}
                        <button className="btn btn-secondary" onClick = {() => {
                            deleteJob(job.id)
                        }}>Delete Application</button>
                        <button className="btn btn-secondary" onClick = {() => {
                            console.log(props)
                            history.push({pathname: `/jobs/${job.id}`})
                        }}>Edit Application</button>
                    </section>
                })
            }
            </div>
            <dialog ref={note} className = "job__notes">{job.notes} <div><button onClick={() => {
                            note.current.close()
                        }}>Close</button></div> </dialog>
        </article>
        
    )
}