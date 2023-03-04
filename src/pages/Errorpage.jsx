import React from "react";
import { Link } from "react-router-dom";
//import '../styles/Errorpage.css'

const ErrorPage = () => {

    return (
        <div className="container" >
            <h1> Something has gone wrong!</h1>
            <h2> Page that does not exist</h2>
            <Link to="/" className="route" > Click here to return to the front page</Link>
        </div>
    );
}

export default ErrorPage;