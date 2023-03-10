import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import WeatherWidget from "./components/WeatherWidget";
import PromptGPT from "./components/PromptGPT";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/weather" element={<WeatherWidget />} />
        <Route path="/prompt" element={<PromptGPT />} />
        <Route path="/image" element={<WeatherWidget />} />
      </Routes>
    </>
  );
}

export default App;
