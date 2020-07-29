import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import ConvCelFaren from "./components/ConvCelFaren";
import Time from "./components/Time";
import Hourly from "./components/Hourly";

// class component
class App extends React.Component {
  constructor(props) {
    super(props);

    // list of properties for this.state
    this.state = {
      data: [],
      location: "Chicago",
      days: [],
      daysFull: [],
      temps: [],
      // minTemps: [],
      // maxTemps: [],
      weather: [],
      displayIndex: 0,
      icons: [],
      iconCodes: [],
      // iconsPdays: []
    };
  }

  // function place to set up url
  fetchData = () => {
    const url = this.buildUrlApi();
    console.log("api", url);

    // get designated url response
    axios.get(url).then((response) => {
      this.setState({
        data: response.data,
      });

      const currentData = this.currentData();
      console.log("currentData", currentData);
      const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayOfWeekFull = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const currentDay = new Date(currentData.dt_txt);
      const toDay = dayOfWeek[currentDay.getDay()];
      const currentDayFull =
        dayOfWeekFull[new Date(currentData.dt_txt).getDay()];
      const currentTemp = Math.round(currentData.main.temp);
      // eslint-disable-next-line
      // const currentMinTemp = Math.round(currentData.main.temp_min);
      // // eslint-disable-next-line
      // const currentMaxTemp = Math.round(currentData.main.temp_max);
      const currentWeather =
        currentData.weather[0].main === "Clouds"
          ? "Cloudy"
          : currentData.weather[0].main;
      const currentIcon = this.convertWeatherIcons(currentData.weather[0].main);
      const currentIconCode = currentData.weather[0].icon;
      const days = [];
      const daysFull = [];
      const temps = [];
      // const minTemps = [];
      // const maxTemps = [];
      const weather = [];
      const icons = [];
      const iconCodes = [];

      for (let i = 0; i < this.state.data.list.length; i = i + 8) {
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

        iconCodes.push(this.state.data.list[i].weather[0].icon);
      }

      this.setState({
        days: [toDay, ...days.slice(1)],
        daysFull: [currentDayFull, ...daysFull.slice(1)],
        temps: [currentTemp, ...temps.slice(1)],
        weather: [currentWeather, ...weather.slice(1)],
        icons: [currentIcon, ...icons.slice(1)],
        iconCodes: [currentIconCode, ...iconCodes.slice(1)],
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

    return list.find((e) => new Date(e.dt_txt).getHours() === nearestHr);
  };

  computeNearestHr = () => {
    const currentTimeInHrs = new Date().getHours();
    const constHrs = [0, 3, 6, 9, 12, 15, 18, 21];
    const differences = constHrs.map((e) => Math.abs(e - currentTimeInHrs));
    const indexofLowestDiff = differences.indexOf(Math.min(...differences));

    return constHrs[indexofLowestDiff];
  };

  convertWeatherIcons = (weather) => {
    switch (weather) {
      case "Clear":
        return "weather-clear";
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

  handleFocus = (e) => {
    e.target.select();
  };

  changeLocation = (e) => {
    e.preventDefault();
    const inputLocation = this.locationInput.value;
    this.setState(
      {
        location: inputLocation,
      },
      () => {
        this.fetchData();
      }
    );
  };

  setIndex = (index) => {
    this.setState({
      displayIndex: index,
    });
  };

  render() {
    const {
      location,
      days,
      daysFull,
      temps,
      // minTemps,
      // maxTemps,
      weather,
      iconCodes,
      displayIndex,
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
      <div className="container-weather">
        <div className={"widget ".concat(...background)}>
          <form onSubmit={this.changeLocation}>
            <div className="inline-input">
              <i className="mdi mdi-magnify"></i>
              <input
                className="location-input"
                defaultValue={location}
                type="text"
                onFocus={this.handleFocus}
                ref={(input) => (this.locationInput = input)}
              />
            </div>
          </form>

          <div className="main-display">
            <div className="main-info">
              <div className="temp-measurement">{temps[displayIndex]}</div>
              <div className="temp-unit">°F</div>
            </div>

            {/* <div className="main-display">
          <div className="main-info">
            <div className="temp-measurement">{temps[displayIndex]}</div>
            <div className="temp-unit">°C</div>
          </div> */}

            <div className="sub-info">
              <div className="sub-info-title">
                <NavLink
                  activeClassName="selected"
                  className="selection-days"
                  to={`/${daysFull[displayIndex]}`}
                  // onClick={() => this.setIndex(index)}
                >
                  {daysFull[displayIndex]}
                </NavLink>
              </div>

              <div className="sub-info-text">{weather[displayIndex]}</div>

              {/* <div className="sub-info-text"> 
               <span className="max-temp">
                <i className="mdi mdi-arrow-up" />
                {maxTemps[displayIndex]}
                °F
               </span>
               <span className="min-temp">
                <i className="mdi mdi-arrow-down" />
                {minTemps[displayIndex]}
                °F
              </span> 
          </div>  */}
            </div>
          </div>

          <div className="selection-panel">
            <div className="selection-row">
              {iconCodes.map((item, index) => {
                const isSelected = displayIndex === index ? "selected" : "";
                return (
                  <div
                    className={`selection-icons ${isSelected}`}
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    <img
                      alt=""
                      src={`http://openweathermap.org/img/wn/${item}@2x.png`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="selection-row">
              {days.map((item, index) => {
                const isSelected = displayIndex === index ? "selected" : "";
                return (
                  <div
                    className={`selection-days ${isSelected}`}
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>

          <Time />
          <ConvCelFaren />
        </div>
      </div>
    );
  }
}

function MainApp() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/:id" component={Hourly} />
      </Switch>
    </Router>
  );
}

export default MainApp;
