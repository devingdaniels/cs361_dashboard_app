import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

function WeatherWidget() {
  const navigate = useNavigate();
  // Component State variables
  const [cityParam, setCityParam] = useState("");
  const [data, setData] = useState({
    city: null,
    temp: null,
    info: null,
    humidity: null,
  });

  const code_this_function = () => {
    alert("Useing user location to determine local wearther...");
  };

  const make_API_call = async (e) => {
    // Set search param
    let searchParam = cityParam;
    if (!searchParam) {
      searchParam = "New York";
    } else {
      // User submitted form, prevent page reload
      e.preventDefault();
    }
    try {
      const key = process.env.REACT_APP_WEATHER_API_KEY;
      const reponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchParam}&appid=${key}&units=imperial`
      );
      // Parse
      const json = await reponse.json();
      // Set data
      const data = {
        city: searchParam,
        temp: json.main.temp,
        humidy: json.main.humidity,
        info: json.weather[0].description,
      };
      // Update state of data
      setData(data);
      // Reset input field
      setCityParam("");
    } catch (error) {
      console.log(error);
    }
  };

  // On initial render, load default city
  useEffect(() => {
    if (!cityParam) {
      make_API_call();
    }
  }, []);

  // Render

  return (
    <section>
      <button className="nav-button" onClick={() => navigate("/")}>
        Dashboard
      </button>
      <div className="widget-container">
        <div className="widget-header">
          <h2>Weather</h2>
        </div>
        <p className="widget-label">Search by city name or current location</p>
        <form onSubmit={make_API_call}>
          <input
            type="text"
            placeholder="Eugene..."
            onChange={(e) => setCityParam(e.target.value)}
            value={cityParam}
            required
          ></input>
          <button type="submit">Search</button>
        </form>
        <button onClick={code_this_function}>Use my location</button>
        <span className="enable-location-services">
          *Requires browser location services
        </span>
        <hr></hr>
        <p>Location: {data.city}</p>
        <p>Description: {data.info}</p>
        <p>Temperature: {data.temp} F</p>
        <p>Humidity: {data.humidy}</p>
      </div>
    </section>
  );
}

export default WeatherWidget;
