// import React, { Component } from 'react'



// class Hourly extends Component {
 
//     constructor() {
//         super();
//         this.state = {
//             hour: []
//         };
//     }
//     componentDidMount() {
//         fetch('https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=35&lon=139')
//         // callback on resolution / rejection of promise 
//           .then(response => response.json())
//           .then(responseData => {
//               this.setState({hour: responseData.weatherdata});
//           })
//         //   Attaches a callback for only the rejection of the Promise.@returns — A Promise for the completion of the callback.
//           .catch(error => {
//               console.log('Error fetching/parsing data', error);
//           });


//     }




// render() {
//     return(
//         <div>
//             <div className="main-header">
//                 <div className='inner'>
//                     <h1 className="main-title">Hourly Responses</h1>
                
//                 </div>
//             </div>
//         </div>

//     )
// }
// };

// export default Hourly;