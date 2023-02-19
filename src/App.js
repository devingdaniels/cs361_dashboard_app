import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import WeatherWidget from "./components/WeatherWidget";
import StockWidget from "./components/StockWidget";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/weather" element={<WeatherWidget />} />
        <Route path="/stocks" element={<StockWidget />} />
      </Routes>
    </>
  );
}

export default App;
