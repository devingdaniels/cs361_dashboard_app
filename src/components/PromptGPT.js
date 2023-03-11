import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { toastify } from "../toastify/toastify";
import DisplayResponse from "./DisplayResponse";

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
    <div className="gpt-container">
      <button className="dashboardNavBut" onClick={() => navigate("/")}>
        Dashboard
      </button>
      <div>
        <div className="widget-header">
          <h2>Prompt GPT</h2>
        </div>
        <p className="widget-label">Enter a short prompt</p>
        <form onSubmit={handleSubmit}>
          <textarea
            minLength={1}
            type="text"
            rows={5}
            style={{ padding: "6px", margin: "3px" }}
            value={prompt}
            onChange={(e) => setData(e.target.value)}
            placeholder="Prompt..."
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      {loading ? (
        <>
          <InfinitySpin width="200" color="#4fa94d"></InfinitySpin>
        </>
      ) : (
        <>
          <DisplayResponse
            response={response}
            clearResponse={clearResponse}
          ></DisplayResponse>
        </>
      )}
    </div>
  );
}

export default GPTprompt;
