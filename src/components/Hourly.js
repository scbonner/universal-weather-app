// import React, { Component } from 'react'
// import axios from 'axios';







// // class component
// class Hourly extends Component {
//   // parameter
//   constructor(props) {
//     // parameter
//     super(props);
//     // list of properties
//     this.state = {
//       data: [],
//       location: "Charlotte",
//       day: [],
//       hour: [],
//       temps: [],
//       weather: [],
//       icons: []
      
//     };
//   }

//   // function place to set up url
//   fetchData = () => {
//     const url = this.buildHourly();
//     console.log("api", url);

//     axios.get(url)
//     .then(response => {
//       this.setState({
//         data: response.data
//       });

//       const currentData = this.currentData();
//       const currentHour = [];
//     //   const hourInADay = [...12]
//       const currentDay = "Today";
//       // eslint-disable-next-line
//       const hoursFull = currentHour [new currentHour(currentData.dt_txt).getHour()];
//       const currentTemp = Math.round(currentData.main.temp);
//       const currentWeather =
//         currentData.weather[0].main === "Clouds"
//           ? "Cloudy"
//           : currentData.weather[0].main;
//       const currentIcon = this.convertWeatherIcons(currentData.weather[0].main);

      
//       const days = [];
//       const hours = [];
//       const temps = [];
//       const weather = [];
//       const icons = [];
//       for (let i = 0; i < this.state.data.list.length; i = i + 1) {
//         // eslint-disable-next-line
//         let hour = new hour(this.state.data.list[i].dt_txt);
//         // let day = dayOfWeek[hour.getHour()];
//         // hours.push(hour);
//         // hoursFull.push(hoursFull);
//         temps.push(Math.round(this.state.data.list[i].main.temp));

//         if (this.state.data.list[i].weather[0].main === "Clouds") {
//           weather.push("Cloudy");
//         } else {
//           weather.push(this.state.data.list[i].weather[0].main);
//         }

//         icons.push(
//           this.convertWeatherIcons(this.state.data.list[i].weather[0].main)
//         );
//       }

//       this.setState({
//         hours: [currentHour, ...hours.slice(1)],
//         days: [currentDay, ...days.slice(1)],
//         // daysFull: [currentDayFull, ...daysFull.slice(1)],
//         temps: [currentTemp, ...temps.slice(1)],
//         weather: [currentWeather, ...weather.slice(1)],
//         icons: [currentIcon, ...icons.slice(1)]
//       });
//     });
//   };

//   buildUrlApi = () => {
//     const location = encodeURIComponent(this.state.location);
//     const urlPrefix = "https://api.openweathermap.org/data/2.5/forecast?q=";
//     const urlSuffix = "&APPID=925c61f658fda1558f8b418054264a22&units=imperial";
    
     
//     return [urlPrefix, location, urlSuffix].join("");
//   };

//   currentData = () => {
//     const list = this.state.data.list;
//     const nearestHr = this.computeNearestHr();

//     return list.find(e => new Date(e.dt_txt).getHours() === nearestHr);
//   };

//   computeNearestHr = () => {
//     const currentTimeInHrs = new Date().getHours();
//     const constHrs = [0, 1, 2, 3, 4, 5, 6, 7];
//     const differences = constHrs.map(e => Math.abs(e - currentTimeInHrs));
//     const indexofLowestDiff = differences.indexOf(Math.min(...differences));

//     return constHrs[indexofLowestDiff];
//   };

//   convertWeatherIcons = weather => {
//     switch (weather) {
//       case "Clear":
//         return "circle-outline";
//       case "Clouds":
//         return "weather-cloudy";
//       case "Snow":
//         return "weather-snowy";
//       case "Rain":
//         return "weather-pouring";
//       case "Drizzle":
//         return "weather-pouring";
//       case "Thunderstorm":
//         return "weather-lightning-rainy";
//       default:
//         return "weather-cloudy";
//     }
//   };

//   componentDidMount() {
//     this.fetchData();
//   }

//   handleFocus = e => {
//     e.target.select();
//   }
  
//   changeLocation = e => {
//     e.preventDefault();
//     const inputLocation = this.locationInput.value;
//     this.setState(
//       {
//         location: inputLocation
//       },
//       () => {
//         this.fetchData();
//       }
//     );
//   };

//   setIndex = index => {
//     this.setState({
//       displayIndex: index
//     });
//   };

//   render() {
//     const {
// // eslint-disable-next-line
//     //   days,
//       hours,
//       temps,
//       weather,
//       icons,
//       displayIndex
//     } = this.state;

//     let background = "";
//     switch (weather[displayIndex]) {
//       case "Clear":
//         background = "clear";
//         break;
//       case "Cloudy":
//         background = "cloudy";
//         break;
//       case "Snow":
//         background = "snow";
//         break;
//       case "Rain":
//         background = "rain";
//         break;
//       case "Drizzle":
//         background = "rain";
//         break;
//       case "Thunderstorm":
//         background = "thunderstorm";
//         break;
//       default:
//         background = "cloudy";
//     }
    
//     return (

//     <div>
//       <div className={"widget ".concat(...background)}>
//         <form onSubmit={this.changeHour}>
//           <div className="inline-input">
//             <i className="mdi mdi-magnify"></i>
//             <input
//               className="location-input"
//               defaultValue={hours}
//               type="text"
//               onFocus={this.handleFocus}
//               ref={input => (this.locationInput = input)}
//             />
//           </div>
//         </form>

//         <div className="main-display">
//           <div className="main-info">
//             <div className="temp-measurement">{temps[displayIndex]}</div>
//             <div className="temp-unit">°F</div>
//           </div>

//           <div className="sub-info">
//             <div className="sub-info-title">{hours[displayIndex]}</div>

//             <div className="sub-info-text">{weather[displayIndex]}</div>
//             </div>
//           </div>
//         </div>
      
//       <div>
//         <div className="selection-panel">
//           <div className="selection-row">
//             {icons.map((item, index) => {
//               if (displayIndex === index) {
//                 return (
//                   <div
//                     className="selection-icons selected"
//                     key={index + 1}
//                     onClick={() => this.setIndex(index)}
//                   >
//                     <i className={"mdi mdi-".concat(item)} />
//                   </div>
//                 );
//               } else {
//                 return (
//                   <div
//                     className="selection-icons"
//                     key={index + 1}
//                     onClick={() => this.setIndex(index)}
//                   >
//                     <i className={"mdi mdi-".concat(item)} />
//                   </div>
//                 );
//               }
//             })}
//           </div>
//           <div className="selection-row">
//             {hours.map((item, index) => {
//               if (displayIndex === index) {
//                 return (
//                   <div
//                     className="selection-days selected"
//                     key={index + 1}
//                     onClick={() => this.setIndex(index)}
//                   >
//                     {item}
//                   </div>
//                 );
//               } else {
//                 return (
//                   <div
//                     className="selection-days"
//                     key={index + 1}
//                     onClick={() => this.setIndex(index)}
//                   >
//                     {item}
//                   </div>
//                 );
//               }
//             })}
          
//           </div>
//         </div>
//       </div>
//     </div>
 
//      );
//   }
// } 

 
// export default Hourly;

