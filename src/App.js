import React, { useState } from 'react'
import {
    BrowserRouter,
    Route
} from 'react-router-dom'


// Adding of components
import Result from './Result'
import SetQuery from './SetQuery'
import Search from './Search'
import Query from './Query'
import Weather from './Weather'


    

const api = {
    key: "f85311cfd835af0ddbba1d6d1784427f",
    base: "https://openweathermap.org/forecast5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
      if (evt.key === "Enter")
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => setWeather(result));
            setWeather(result);
            setQuery('');
            console.log(result);
      };
    }

//   const search = evt => {
//         if (evt.key === "Enter")
//           fetch(`${api.base}weather?q=${query}&units=imperal&APPID=${api.key}`)
//             .then(res => res.json())
//             .then(result => setWeather(result));
//         }
//     }

    const dateBuilder = (d) => {
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      let day = days[d.getDay()];
      let date = d.getDay();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`

    }

    return (
        <div className="App">
            <main>
                <div className="search-box">
                    <input 
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                        />
                    </div>
                    {(typeof weather.main != "undefined") ?(
                    <div>
                    <div className="location-box">
                        <div className="location">{weather.name}, {weather.sys.country}</div>
                        <div className="date">{dateBuilder(new Date())}</div>
                    </div>
                    <div className="weather-box"></div>
                      <div className="temp">
                        {Math.round(weather.main.temp)}°C
                    </div>
                    <div className="weather">{weather.weather[0].main}</div>
                </div>
              
              ) : ('')}
    
            </main>
        </div>

    );


export default App;
