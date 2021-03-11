import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./components/ApplicationViews"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { NavBar } from "./components/nav/NavBar"


function JobHunt() {
    return (<>
        <Route render={() => {
            if (localStorage.getItem("jh_token")) {
                return <>
                    <Route exact path="/" render= {props => <NavBar {...props} />}>
                        


                    </Route>
                    <Route render={props => <ApplicationViews {...props} />} />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />


        <Route path="/register" render={props => <Register {...props} />} />


    </>
    )
}

export default JobHunt;
