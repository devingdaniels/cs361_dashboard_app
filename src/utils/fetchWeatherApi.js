const key = process.env.REACT_APP_WEATHER_API_KEY;

const fetch_weather_by_city = async (city) => {
  try {
    const reponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`
    );
    // Parse
    const json = await reponse.json();
    // Set data
    const data = {
      city: city,
      temp: json.main.temp,
      humidity: json.main.humidity,
      info: json.weather[0].description,
    };
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("error");
  }
};

const get_city_by_coords = async (coords) => {
  try {
    const reponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.lon}&appid=${key}`
    );
    // Returns name of city
    const json = await reponse.json();
    const city = json[0].name;
    return city;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const get_coordinates = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const get_random_city = async () => {
  try {
    const reponse = await fetch("http://localhost:8000");
    const data = await reponse.text();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  get_coordinates,
  get_city_by_coords,
  fetch_weather_by_city,
  get_random_city,
};
