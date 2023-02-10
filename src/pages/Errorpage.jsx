import React from "react";
import { Link } from "react-router-dom";
//import '../styles/Errorpage.css'

const ErrorPage = () => {

    return (
        <div className="container" >
            <h1>Nå har det skjedd noe feil her!</h1>
            <h2>Du er på en side som ikke eksisterer.</h2>
            <Link to="/" className="route" >Trykk her for å gå tilbake til forsiden</Link>
        </div>
    );
}

export default ErrorPage;