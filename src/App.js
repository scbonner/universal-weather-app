import React from "react";

import axios from 'axios';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      location: "Charlotte",
      days: [],
      daysFull: [],
      temps: [],
      minTemps: [],
      maxTemps: [],
      weather: [],
      icons: [],
      displayIndex: 0
    };
  }

  fetchData = () => {
    const url = this.buildUrlApi();
    console.log("api", url);

    axios.get(url).then(response => {
      this.setState({
        data: response.data
      });

      const currentData = this.currentData();
      const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayOfWeekFull = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      const currentDay = "Today";
      const currentDayFull =
        dayOfWeekFull[new Date(currentData.dt_txt).getDay()];
      const currentTemp = Math.round(currentData.main.temp);
      // const currentMinTemp = Math.round(currentData.main.temp_min);
      // const currentMaxTemp = Math.round(currentData.main.temp_max);
      const currentWeather =
        currentData.weather[0].main === "Clouds"
          ? "Cloudy"
          : currentData.weather[0].main;
      const currentIcon = this.convertWeatherIcons(currentData.weather[0].main);

      const days = [];
      const daysFull = [];
      const temps = [];
      // const minTemps = [];
      // const maxTemps = [];
      const weather = [];
      const icons = [];
      for (let i = 0; i < this.state.data.list.length; i = i + 7) {
        let date = new Date(this.state.data.list[i].dt_txt);
        let day = dayOfWeek[date.getDay()];
        let dayFull = dayOfWeekFull[date.getDay()];
        days.push(day);
        daysFull.push(dayFull);
        temps.push(Math.round(this.state.data.list[i].main.temp));
        // minTemps.push(Math.round(this.state.data.list[i].main.temp_min));
        // maxTemps.push(Math.round(this.state.data.list[i].main.temp_max));

        if (this.state.data.list[i].weather[0].main === "Clouds") {
          weather.push("Cloudy");
        } else {
          weather.push(this.state.data.list[i].weather[0].main);
        }

        icons.push(
          this.convertWeatherIcons(this.state.data.list[i].weather[0].main)
        );
      }

      this.setState({
        days: [currentDay, ...days.slice(1)],
        daysFull: [currentDayFull, ...daysFull.slice(1)],
        temps: [currentTemp, ...temps.slice(1)],
        // minTemps: [currentMinTemp, ...minTemps.slice(1)],
        // maxTemps: [currentMaxTemp, ...maxTemps.slice(1)],
        weather: [currentWeather, ...weather.slice(1)],
        icons: [currentIcon, ...icons.slice(1)]
      });
    });
  };

  buildUrlApi = () => {
    const location = encodeURIComponent(this.state.location);
    const urlPrefix = "https://api.openweathermap.org/data/2.5/forecast?q=";
    const urlSuffix = "&APPID=f85311cfd835af0ddbba1d6d1784427f&units=imperial";
    
     
    return [urlPrefix, location, urlSuffix].join("");
  };

  currentData = () => {
    const list = this.state.data.list;
    const nearestHr = this.computeNearestHr();

    return list.find(e => new Date(e.dt_txt).getHours() === nearestHr);
  };

  computeNearestHr = () => {
    const currentTimeInHrs = new Date().getHours();
    const constHrs = [0, 3, 6, 9, 12, 15, 18, 21];
    const differences = constHrs.map(e => Math.abs(e - currentTimeInHrs));
    const indexofLowestDiff = differences.indexOf(Math.min(...differences));

    return constHrs[indexofLowestDiff];
  };

  convertWeatherIcons = weather => {
    switch (weather) {
      case "Clear":
        return "circle-outline";
      case "Clouds":
        return "weather-cloudy";
      case "Snow":
        return "weather-snowy";
      case "Rain":
        return "weather-pouring";
      case "Drizzle":
        return "weather-pouring";
      case "Thunderstorm":
        return "weather-lightning-rainy";
      default:
        return "weather-cloudy";
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  handleFocus = e => {
    e.target.select();
  }
  
  changeLocation = e => {
    e.preventDefault();
    const inputLocation = this.locationInput.value;
    this.setState(
      {
        location: inputLocation
      },
      () => {
        this.fetchData();
      }
    );
  };

  setIndex = index => {
    this.setState({
      displayIndex: index
    });
  };

  render() {
    const {
      location,
      days,
      daysFull,
      temps,
      // maxTemps,
      // minTemps,
      weather,
      icons,
      displayIndex
    } = this.state;

    let background = "";
    switch (weather[displayIndex]) {
      case "Clear":
        background = "clear";
        break;
      case "Cloudy":
        background = "cloudy";
        break;
      case "Snow":
        background = "snow";
        break;
      case "Rain":
        background = "rain";
        break;
      case "Drizzle":
        background = "rain";
        break;
      case "Thunderstorm":
        background = "thunderstorm";
        break;
      default:
        background = "cloudy";
    }

    return (
      <div className={"widget ".concat(...background)}>
        <form onSubmit={this.changeLocation}>
   <div className="inline-input">
            <i className="mdi mdi-magnify"></i>
            <input
              className="location-input"
              defaultValue={location}
              type="text"
              onFocus={this.handleFocus}
              ref={input => (this.locationInput = input)}
            />
          </div>
        </form>

        <div className="main-display">
          <div className="main-info">
            <div className="temp-measurement">{temps[displayIndex]}</div>
            <div className="temp-unit">°F</div>
          </div>

          <div className="sub-info">
            <div className="sub-info-title">{daysFull[displayIndex]}</div>

            <div className="sub-info-text">{weather[displayIndex]}</div>

            {/* <div className="sub-info-text">
              <span className="max-temp">
                <i className="mdi mdi-arrow-up" />
                {maxTemps[displayIndex]}
                °C
              </span>
              <span className="min-temp">
                <i className="mdi mdi-arrow-down" />
                {minTemps[displayIndex]}
                °C
              </span>
            </div> */}
          </div>
        </div>

        <div className="selection-panel">
          <div className="selection-row">
            {icons.map((item, index) => {
              if (displayIndex === index) {
                return (
                  <div
                    className="selection-icons selected"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    <i className={"mdi mdi-".concat(item)} />
                  </div>
                );
              } else {
                return (
                  <div
                    className="selection-icons"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    <i className={"mdi mdi-".concat(item)} />
                  </div>
                );
              }
            })}
          </div>
          <div className="selection-row">
            {days.map((item, index) => {
              if (displayIndex === index) {
                return (
                  <div
                    className="selection-days selected"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    {item}
                  </div>
                );
              } else {
                return (
                  <div
                    className="selection-days"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    {item}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}
/*Arrow Function
ChangeCityName=(newName)=> {
  this.setState({cityName:newName})
  console.log(this.state.cityName)
}

  render() {
    return(
      <div>
        <Title ChangeCityName={this.ChangeCityName}/>
      </div>
      
    );
}}

<<<<<<< HEAD
export default App;


// export default function App() {
//   return (
//     <div>
//       <Route path="/" component={Title} />
//     </div>
//   );
// }

// Adding of components
// import SetQuery from './SetQuery'
// import Search from './Search'
// import Query from './Query'
// import Weather from './Weather'


    

// const api = {
//     key: "f85311cfd835af0ddbba1d6d1784427f",
//     base: "http://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml",
// }

// function App() {
//   const [query, setQuery] = useState('');
//   const [weather, setWeather] = useState({});

//   const search = evt => {
//       if (evt.key === "Enter")
//         fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
//           .then(res => res.json())
//           .then(result => {
//             setWeather(result);
//             setQuery('');
//             console.log(result);
//       });
//     }

//   const search = evt => {
//         if (evt.key === "Enter")
//           fetch(`${api.base}weather?q=${query}&units=imperal&APPID=${api.key}`)
//             .then(res => res.json())
//             .then(result => setWeather(result));
//         }
//     }

//     const dateBuilder = (d) => {
//       let months = [
//         'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
//       ];
//       let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//       let day = days[d.getDay()];
//       let date = d.getDay();
//       let month = months[d.getMonth()];
//       let year = d.getFullYear();

//       return `${day} ${date} ${month} ${year}`

           
      
//     }

//     return (
//         <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
//             <main>
//                 <div className="search-box">
//                     <input 
//                         type="text"
//                         className="search-bar"
//                         placeholder="Search..."
//                         onChange={e => setQuery(e.target.value)}
//                         value={query}
//                         onKeyPress={search}
//                         />
//                     </div>
//                     {(typeof weather.main != "undefined") ? (
//                     <div>
//                     <div className="location-box">
//                         <div className="location">{weather.name}, {weather.sys.country}</div>
//                         <div className="date">{dateBuilder(new Date())}</div>
//                     </div>
//                     <div className="weather-box"></div>
//                       <div className="temp">
//                         {Math.round(weather.main.temp)}°C
//                     </div>
//                     <div className="weather">{weather.weather[0].main}</div>
//                 </div>
              
//               ) : ('')}
    
//             </main>
//         </div>

//     );
// }


// export default App;
=======
export default App; */
>>>>>>> 9d85dcb24179548dc351e6d3d88aab6bbe2f270f
