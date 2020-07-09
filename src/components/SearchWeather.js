// import React from 'react';
// import { Line } from "chartjs-react";
// // import "./HourlyGraph.css";

// function SearchWeather(props){
//     return(
//         <div className="hourly_graph" style={{position: "relative", width:600, height: 300}}>
//             <Line
//                 options={{
//                     responsive: true,
//                     scales: {
//                         xAxes: [{
//                             gridLines: {
//                                 display:false
//                             }
//                         }],
//                         yAxes: [{
//                             gridLines: {
//                                 display:false
//                             }
//                         }]
//                     }
//                 }}
//                 data={props.current_data}
//             />
//         </div>
//     );

// }

// export default SearchWeather;



// import React from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";



// export default function SearchWeather() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/users">Users</Link>
//             </li>
//           </ul>
//         </nav>

//         {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//         <Switch>
//           <Route path="/FiveDay">
//             <FiveDay />
//           </Route>
//           <Route path="/searchweather">
//             <SearchWeather />
//           </Route>
//           <Route path="/">
//             <Daily />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// function Daily() {
//   return <h2>Daily</h2>;
// }

// function FiveDay() {
//   return <h2>FiveDay</h2>;
// }

// // function Users() {
// //   return <h2>Users</h2>;
// // }