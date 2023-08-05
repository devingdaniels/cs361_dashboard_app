import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import WeatherWidget from "./components/WeatherWidget";
import Davinci from "./components/Davinci";
import "./styles/App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/weather" element={<WeatherWidget />} />
        <Route path="/prompt" element={<Davinci />} />
      </Routes>
    </>
  );
}

export default App;
