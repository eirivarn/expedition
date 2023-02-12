import React from "react";
//import ReactDOM from 'react-dom';
import {Trips} from '../components/trips.js';

const Frontpage = () => {
    return (
        <div id="body">
            <h1>Frontpage</h1>
            <button className="newRoute" type="button"> Del din egen reise! </button>
            <h2 className="header2">Reiseruter</h2>
            <div className="front_grid">
                < Trips />
                < Trips />
                < Trips />
                < Trips />
            </div>
            <div className="front_grid">
                < Trips />
                < Trips />
                < Trips />
                < Trips />
            </div>
            
        </div>
        
    )
}



export default Frontpage;