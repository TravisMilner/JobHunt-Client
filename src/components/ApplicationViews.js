import React from "react"
import { Route } from "react-router-dom"
import { JobForm } from "./job/JobForm"
import { JobList } from "./job/JobList"
import { JobProvider } from "./job/JobProvider"

export const ApplicationViews = () => {
   return( <> 
        <JobProvider>
           <Route exact path = "/">
              <JobList />
           </Route>
           <Route exact path = "/jobs/new">
              <JobForm />
           </Route>
        </JobProvider>
    
    
    </>
   )
}