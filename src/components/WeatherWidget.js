import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Snowfall from "react-snowfall";
import { toastify } from "../toastify/toastify";
import WeatherData from "./WeatherData";
import {
  get_coordinates,
  get_city_by_coords,
  fetch_weather_by_city,
  get_random_city,
} from "../utils/fetchWeatherApi";

function WeatherWidget() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cityParam, setCityParam] = useState("");
  const [data, setData] = useState({
    city: null,
    temp: null,
    info: null,
    humidity: null,
    units: null,
  });
  const userCoords = useRef({
    lat: null,
    lon: null,
  });

  // On initial render, try to load based on user location
  useEffect(() => {
    if (userCoords.current.lat === null) {
      // Retrieve and set the user's coordinates
      fetch_weather_with_coords();
    }
  }, []);

  const fetch_weather_with_coords = async () => {
    // Making network calls, rending loading
    setLoading(true);
    toastify("Loading...");
    try {
      const coords = await get_coordinates();
      userCoords.current = {
        lat: coords.lat,
        lon: coords.lon,
      };
    } catch (error) {
      console.log(error);
      userCoords.current = {
        lat: false,
        lon: false,
      };
    }
    // Load random city if user denied location services
    if (userCoords.current.lat === false) {
      let randomCity = await get_random_city();
      if (!randomCity) {
        randomCity = "New York";
      }
      const data = await fetch_weather_by_city(randomCity);
      setData(data);
      setLoading(false);
    }
    // User allowed location services
    else {
      const city = await get_city_by_coords(userCoords.current);
      const data = await fetch_weather_by_city(city);
      setData(data);
      setLoading(false);
    }
  };

  const fetch_weather_search = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetch_weather_by_city(cityParam);
      setData(data);
    } catch (error) {
      toastify("Bad Input. Try again.");
      console.log(error);
    }
    setLoading(false);
    setCityParam("");
  };

  return (
    <section className="weather-widget">
      <button className="dashboardNavBut" onClick={() => navigate("/")}>
        Dashboard
      </button>

      <div className="widget-header">
        <h2>Weather</h2>
      </div>
      <p className="widget-label">Enter City or Zip</p>
      <form onSubmit={fetch_weather_search}>
        <input
          type="text"
          placeholder="Eugene..."
          onChange={(e) => setCityParam(e.target.value)}
          value={cityParam}
          required
        ></input>
        <button type="submit">Search</button>
      </form>
      <div className="location-services">
        <button onClick={fetch_weather_with_coords}>Use my location</button>
        <span className="enable-location-services">*Requires Permission</span>
      </div>
      <hr></hr>
      {loading ? (
        <Snowfall snowflakeCount={100} />
      ) : (
        <WeatherData data={data}></WeatherData>
      )}
    </section>
  );
}
export default WeatherWidget;
