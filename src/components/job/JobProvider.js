import React, {useState} from "react"

export const JobContext = React.createContext()

export const JobProvider = (props) => {
    const [jobs, setJobs] = useState([])

    const getJobs = () => {
        return fetch("http://localhost:8000/jobs", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("jh_token")}`
            }
        })
        .then(res => res.json())
        .then(setJobs)
    }



    return(
        <JobContext.Provider value = {{ jobs, getJobs}} >
            {props.children}
        </JobContext.Provider>
    )
}



