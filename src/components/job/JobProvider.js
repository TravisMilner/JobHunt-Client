import React, {useState} from "react"

export const JobContext = React.createContext()

export const JobProvider = (props) => {
    const [jobs, setJobs] = useState([])
    const [status, setStatuses] = useState([])

    const getJobs = () => {
        return fetch("http://localhost:8000/jobs", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("jh_token")}`
            }
        })
        .then(res => res.json())
        .then(setJobs)
    }

    const createJob = (job) => {
        return fetch("http://localhost:8000/jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("jh_token")}`
            },
            body: JSON.stringify(job)
        })
        .then(res => res.json)
        .then(getJobs)
    }

    const getStatus = () => {
        return fetch("http://localhost:8000/statuses", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("jh_token")}`
            }
        })
        .then(res => res.json())
        .then(setStatuses)
    }

    const deleteJob = (jobId) => {
        return fetch(`http://localhost:8000/jobs/${jobId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("jh_token")}`
            }
        })
        .then(getJobs)
    }

    const editJob = (jobObj) => {
        return fetch(`http://localhost:8000/jobs/${jobObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("jh_token")}`
            },
            body: JSON.stringify(jobObj)
        })
        .then(getJobs)
    }

    const getJobById = (id) => {
        return fetch(`http://localhost:8000/jobs/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("jh_token")}`
            }
        })
        .then(res => res.json())
    }



    return(
        <JobContext.Provider value = {{ jobs, getJobs, createJob, getStatus, status, deleteJob, editJob, getJobById}} >
            {props.children}
        </JobContext.Provider>
    )
}



