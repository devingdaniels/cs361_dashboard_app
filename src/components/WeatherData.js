import React from "react";

function WeatherData({ data }) {
  return (
    <div className="weather-data">
      <p>
        <b>City: </b> {data.city}
      </p>
      <p>
        <b>Info: </b>
        {String(data.info).charAt(0).toUpperCase() + String(data.info).slice(1)}
      </p>
      <p>
        <b>Temperature: </b>
        {data.temp}
      </p>
      <p>
        <b>Humidity: </b>
        {data.humidity}
      </p>
    </div>
  );
}

export default WeatherData;
