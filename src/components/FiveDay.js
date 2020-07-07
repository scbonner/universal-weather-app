import React from 'react';

import Converter from './Converter';

import {
  Link,
  Route,
  Switch
} from 'react-router-dom';

const FiveDay = ({ match }) => (
  <div>
    <ul>
    {
        [...Array(5).keys()].map(n => {
            return <li key={n}>
                    <Link to={`${match.url}/${n+1}`}>
                      Message {n+1}
                    </Link>
                  </li>;
        })
    }
    </ul>
    <Switch>
      <Route path={`${match.url}/:id(\\d+)`} component={Converter} />
      <Route
        path={match.url}
        render={() => <h3>Please select a message</h3>}
      />
    </Switch>
  </div>
);

export default FiveDay;






// import React, {Component} from 'react';
// import {BrowserRouter, Link, Route} from "react-router-dom";
// // import "./WeeklyForecast.css";
// import SearchWeather from "./SearchWeather";

// class FiveDay extends Component {

//     render() {
//         const items = this.props.daily_weather;
//         const forecast_dates = this.props.forecast_dates;
//         let fc_dates_counter = 0;
//         const listItems = items.map(item =>
//         {
//             let days_div =  (
//                 <div key={item.dt} className="col-md-1">

//                         <div className="row">
//                             <Link to={`/${forecast_dates[fc_dates_counter]}`}>
//                                 <div className="fc-day col-md-12"> {this.props.convert_unix_to_date(item.dt)} </div>
//                             </Link>
//                             <div className="col-md-12"> 
//                             <img  src={ this.props.icon_address + item.weather[0].icon + ".png"} alt={item.weather[0].description} /> </div>
//                             <div className="fc-temp-font col-md-12"> <span className="fc-display" style={{paddingRight: '5px'}}> {parseFloat(item.temp.max).toFixed(0)} </span> <span className="fc-display" > {parseFloat(item.temp.min).toFixed(0)} </span> </div>
//                         </div>

//                 </div>

//             );

//             fc_dates_counter++;
//             return days_div;
//         });

//         return (
//             <div className="row">
//                 <BrowserRouter>
//                     {listItems}

//                     <Route path={`/:date`} render={
//                         ({match}) => ( <SearchWeather
//                                 current_data={this.props.sorted_forecast_data[match.params.date]} /> )
//                     } />
//                 </BrowserRouter>
//             </div>
//         );
//     }
// }

// export default FiveDay;