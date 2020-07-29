import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

const WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
class Hourly extends Component {
  // parameter
  constructor(props) {
    // parameter
    super(props);
    // list of properties
    this.state = {
      data: [],
      location: "Charlotte",
      hours: [],
      temps: [],
      iconCodes: [],
    };
  }

  // function place to set up url
  fetchData = () => {
    const url = this.buildUrlApi();
    console.log("FETCH GOT HIT", this.state.location);
    axios.get(url).then((response) => {
      this.setState({
        data: response.data,
      });

      const currentData = this.currentData();
      //   console.log("currentData", currentData);
      const allHours = currentData.map((i) => i.dt_txt);
      const allIconCodes = currentData.map((i) => i.weather[0].icon);
      const allTemps = currentData.map((i) => i.main.temp);

      this.setState({
        hours: allHours,
        iconCodes: allIconCodes,
        temps: allTemps,
      });
    });
  };

  buildUrlApi = () => {
    const location = encodeURIComponent(this.state.location);
    const urlPrefix = "https://api.openweathermap.org/data/2.5/forecast?q=";
    const urlSuffix = "&APPID=925c61f658fda1558f8b418054264a22&units=imperial";

    return [urlPrefix, location, urlSuffix].join("");
  };

  currentData = () => {
    const urlDay = this.props.match.params.id;
    const urlDayIndex = WEEK.indexOf(urlDay);
    const now = this.nextDay(urlDayIndex);

    const data = this.state.data.list.filter((e) => {
      return moment(e.dt_txt).isSame(now, "day");
    });

    console.log("data", data);
    return data;
  };

  nextDay(x) {
    // gets the current day of the month(1-31)
    // adds the difference between today's day of the week (0-6) and the desired day of the week (0-6)
    // then uses mod to make sure the new value isn't more than 6
    const now = new Date();
    now.setDate(now.getDate() + ((x + (7 - now.getDay())) % 7));
    return now;
  }

  componentDidMount() {
    this.fetchData();
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("enter press here! ", event.target.value);
      this.setState(
        {
          location: event.target.value,
        },
        () => {
          this.fetchData();
        }
      );
    }
  };

  render() {
    const { hours, temps, iconCodes, displayIndex, location } = this.state;

    return (
      <div className="container-weather">
        <div style={{ backgroundColor: "tan" }} className={"widget"}>
          <div className="inline-input">
            <i className="mdi mdi-magnify"></i>
            <input
              className="location-input"
              style={{ color: "#000" }}
              defaultValue={location}
              type="text"
              onKeyPress={this.handleKeyPress}
            />
          </div>

          <div className="main-display">
            <div className="main-info">
              <div className="temp-measurement">
                {this.props.match.params.id}
              </div>
            </div>
          </div>

          <div>
            <div className="selection-panel">
              <div className="selection-row">
                {iconCodes.map((item, index) => {
                  const isSelected = displayIndex === index ? "selected" : "";
                  return (
                    <div
                      className={`selection-icons ${isSelected}`}
                      key={index + 1}
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
                {hours.map((item, index) => {
                  return (
                    <div className="selection-days" key={index + 1}>
                      {moment(item).format("LT")}
                    </div>
                  );
                })}
              </div>
              <div className="selection-row">
                {temps.map((temp, index) => {
                  return (
                    <div className="" key={index + 1}>
                      {temp} °F
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hourly;
