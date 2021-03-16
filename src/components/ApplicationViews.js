import React from "react"
import { Route } from "react-router-dom"
import { CompanyForm } from "./company/CompanyForm"
import { CompanyList } from "./company/CompanyList"
import { CompanyProvider } from "./company/CompanyProvider"
import { ContactList } from "./contact/ContactList"
import { ContactForm } from "./contact/ContactForm"
import {  ContactProvider } from "./contact/ContactProvider"
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
        <CompanyProvider>
           <Route exact path = "/companies">
              <CompanyList />
           </Route>
           <Route exact path = "/companies/new">
              <CompanyForm />
           </Route>
        </CompanyProvider>
        <ContactProvider>
           <Route exact path = "/contacts">
              <ContactList />
           </Route>
           <Route exact path = "/contacts/new">
              <ContactForm />
           </Route>
        </ContactProvider>
    
    
    </>
   )
}