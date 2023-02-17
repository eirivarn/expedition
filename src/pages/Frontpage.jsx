import React from "react";
//import ReactDOM from 'react-dom';
import {Trips} from '../components/trips.js';

const FrontPage = () => {
    return (
        <div id="body">
            <button id="shareTrip" className="button" type="button"> Del din egen reise! </button>
            <div className="flex_images">
                <h2 className="header2">Reiseruter</h2>
                <div className="front_grid">
                    < Trips />
                    < Trips />
                    < Trips />
                    < Trips />
                    < Trips />
                    < Trips />
                    < Trips />
                    < Trips />
                </div>
                <div className="front_grid">
                    
                </div>
            </div>
            
            
        </div>
        
    )
}



export default FrontPage;
