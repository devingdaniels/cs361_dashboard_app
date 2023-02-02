import React, { useState } from "react";
// Helper functions;
import { useNavigate } from "react-router-dom";

function StockWidget() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const make_API_call = async () => {
    const KEYWORD = "AAPL";
    const key = process.env.REACT_APP_STOCK_API_KEY;
    const API_ENDPOINT = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${KEYWORD}&apikey=${key}`;
    const url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=CNY&apikey=${key}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
    } catch (error) {}
  };

  return (
    <section>
      <button className="nav-button" onClick={() => navigate("/")}>
        Dashboard
      </button>
      <div className="widget-container">
        <h2>Stock Widget</h2>
        <button onClick={make_API_call}>Search</button>
      </div>
    </section>
  );
}

export default StockWidget;
