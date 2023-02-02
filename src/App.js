// Styling
import "./App.css";

// Routing
import { Route, Routes } from "react-router-dom";

// Import components
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import WeatherWidget from "./components/WeatherWidget";
import StockWidget from "./components/StockWidget";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/weather" element={<WeatherWidget />} />
        <Route path="/stocks" element={<StockWidget />} />
      </Routes>
    </div>
  );
}

export default App;
