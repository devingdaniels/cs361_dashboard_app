import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { toastify } from "../toastify/toastify";

function GPTprompt() {
  const navigate = useNavigate();
  const [prompt, setData] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (prompt === "") {
      toastify("Empty prompt, please try again");
    } else {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:3541/api/prompt", {
          prompt: prompt,
        });
        const data = response.data;
        setResponse(data.text);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
      setData("");
    }
  };

  const clearResponse = () => {
    setResponse("");
  };

  return (
    <div className="widget-container">
      <button className="dashboardNavBut" onClick={() => navigate("/")}>
        Dashboard
      </button>
      <div className="widget-header">
        <h2>Prompt GPT</h2>
      </div>
      <p className="widget-label">Enter a short prompt</p>
      <button onClick={clearResponse}>Clear Response</button>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          value={prompt}
          onChange={(e) => setData(e.target.value)}
          placeholder="Prompt..."
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {loading ? (
        <>
          <InfinitySpin width="200" color="#4fa94d"></InfinitySpin>
        </>
      ) : (
        <>
          <p>{response}</p>
        </>
      )}
    </div>
  );
}

export default GPTprompt;
