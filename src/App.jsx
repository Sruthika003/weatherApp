import { useEffect, useState } from 'react'
import './App.css'
import searchIcon from "./assets/weather/search.png";
import clearIcon from "./assets/weather/clear.png";
import drizzleIcon from "./assets/weather/drizzle.jpeg";
import humidityIcon from "./assets/weather/Humidity.png";
import rainIcon from "./assets/weather/Rain.png";
import snowIcon from "./assets/weather/Snow.png";
import windIcon from "./assets/weather/Wind.png";
import cloudyIcon from "./assets/weather/cloudy.png";

const WeatherDetials = ({ icon, temp, city, country, lat, log, humidity, windSpeed }) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="image" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="coord">
        <div>
          <span className="lat">latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity} %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="Wind-Speed" className="icon" />
          <div className="data">
            <div className="Windspeed">{windSpeed} Km/hr</div>
            <div className="text">Wind-Speed</div>
          </div>
        </div>
      </div>
     
    </>
  )
}
function App() {
  let api_key = "a2ec6168846fa7938568d64bc633f980";

  const [text, setText] = useState("chennai");
  const [icon, setIcon] = useState(clearIcon);
  const [temp, setTemp] = useState(20);
  const [city, setCity] = useState("chennai");
  const [country, setCountry] = useState("IN");
  const [log, setLog] = useState(0);
  const [lat, setLat] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const[error, setError]=useState(null);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudyIcon,
    "02n": cloudyIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon
  };
  const search = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.error("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setTemp(data.main.temp);
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || cloudyIcon);
      setCityNotFound(false);
    } catch (error) {
      console.error("An error occoured:", error.message);
      setError("An error occurred while fetching weather data.")
    } finally {
      setLoading(false);
    }
  }

  const handlerCity = (e) => {
    setText(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  }
  useEffect(function(){
    search();
  }, []);

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className="city-input" placeholder="Search City" onChange={handlerCity} value={text} onKeyDown={handleKeyDown} />
          <div className="search-icon" onClick={() => search()}>
            <img src={searchIcon} alt="search" />
          </div>
        </div>
       {!loading  && !cityNotFound&& <WeatherDetials icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} windSpeed={windSpeed} />}
        {loading && <div className="loading-message">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {cityNotFound && <div className="citynotfound">City not found</div>}
      <p>Designed By React App</p>
      </div>
    </>
  )
}

export default App
