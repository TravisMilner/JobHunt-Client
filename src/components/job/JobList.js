import React, { useContext, useEffect } from "react"
import { JobContext } from "./JobProvider.js"
import {useHistory} from "react-router-dom"

export const JobList = (props) => {
    const {jobs, getJobs, deleteJob} = useContext(JobContext)
    const history = useHistory()

    useEffect(() => {
        getJobs()
    }, [])

    return (
        <article className="jobs">
            <h1>Job Applications</h1>
            <button className="jobsButton" onClick={() => {
                history.push({ pathname: "/jobs/new"})
            }}>
                Add New Application
            </button>
            <hr />
            {
                jobs.map(job => {
                    return <section key = {`job--${job.id}`} className="job">

                        <div className = "job__name"><h2>{job.name}</h2></div>
                        <div className = "job__date_of_app">Date of Application: {job.date_of_app}</div>
                        <div className = "job__status">Status: {job.status.label}</div>
                        <div className = "job__notes"> Notes: {job.notes} </div>
                        <div className = "job__link"> Link: {job.link}</div>
                        <button className = "deleteJob" onClick = {() => {
                            deleteJob(job.id)
                        }}>Delete Application</button>
                    </section>
                })
            }
        </article>
    )
}