
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import WeatherCard from "./WeatherCard";
// import moment from "moment";

// export default ({ dateTime }) => {
//   return (
//     <div className={`d-flex flex-col border rounded pd cursor-pointer`}>
//       <h4 className="m-0">{moment(dateTime * 1000).format("ddd, DD")}</h4>
//     </div>
//   );
// };


// const fetchWeatherData = () =>
//   axios.get(
//     "https://api.openweathermap.org/data/2.5/forecast/daily?id=1581129&APPID=f5021250979d6a49f4005170d1cf82a3&units=metric"
//   );

// export default function Home() {
//   const [city, setCity] = useState({});

//   const [daily, setDaily] = useState([]);

//   useEffect(() => {
//     fetchWeatherData().then(res => {
//       console.log(res);
//       setCity(res.data.city);
//       setDaily(res.data.list);
//     });
//   }, []);

//   return (
//     <div className="App">
//       <h1>Weather Forecast</h1>
//       <p>
//         Location:
//         <b>
//           {city.name}, {city.country}
//         </b>
//       </p>
//       <div className="d-flex">
//         {daily.map((day, i) => (
//           <WeatherCard
//             key={i}
//             className="mg"
//             dateTime={day.dt}
//             icon={day.weather[0].icon}
//             main={day.weather[0].main}
//             temp={day.temp.day}
//             feelsTemp={day.feels_like.day}
//           />
//         ))}
//       </div>
//     </div>
//   );




// import React, {Component} from 'react';
// // import "./CurrentWeather.css"

// class Daily extends Component {

//     convert_ms_to_kmh = value => (
//         parseFloat(value) * 3.6
//     )

//     capitalize_first_letter = value => (
//         value[0].toUpperCase() + value.slice(1)
//     )


//     render() {
//         const current_weather = this.props.current_weather;
//         return (
//             <div className="row">
//                 <div className="col-md-4">
//                     <h2>{this.props.city_name}</h2>
//                     <h5>{this.props.convert_unix_to_date(current_weather.dt, false)}</h5>
//                     <h5>{ this.capitalize_first_letter(current_weather.weather[0].description) }</h5>
//                     <img src={ this.props.icon_address + current_weather.weather[0].icon + "@2x.png"} alt={current_weather.weather[0].description} />
//                     <div className="row">
//                         <div className="col-md-3">
//                             <h1 className="cw-temp">{ parseFloat(this.props.showed_temperature).toFixed(0) }</h1>
//                         </div>
//                         <div className="col-md-3">
//                                     <span>
//                                         <a href="celsius" onClick={this.props.show_in_celsius} > &#176;C </a>
//                                         |
//                                         <a href="fahrenheit" onClick={this.props.show_in_fahrenheit} > &#176;F </a>
//                                     </span>
//                         </div>
//                         <div className="col-md-6">
//                             Click On Any Day To Show Graph
//                         </div>
//                     </div>


//                 </div>
//                 <div className="col-md-8">
//                     <h2>&nbsp;</h2>
//                     <h5>Humidity: {current_weather.humidity} %  </h5>
//                     <h5>Wind: { this.convert_ms_to_kmh(current_weather.wind_speed).toFixed(0) } km/h </h5>
//                 </div>
//             </div>
//         );
//     }
// }


// export default Daily;

