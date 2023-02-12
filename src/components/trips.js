import React from 'react';
import '../frontpage.css';
import image from '../img/test.jpg';
//import ReactDOM from 'react-dom';


export class Trips extends React.Component {
    render() {
      return (
        <div>
          <a href="">
            <img src={image}></img>
          </a>
          
          <h2 className='reiseNavn'>Reisenavn</h2>
        </div>
      
      )
    }

  }


//ReactDOM.render(<Trips />, document.getElementById('app'));
