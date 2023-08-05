import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { toastify } from "../toastify/toastify";
import DisplayResponse from "./DisplayResponse";

function Davinci() {
  const navigate = useNavigate();
  const [prompt, setData] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    // Prevent page reload
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
      } catch (error) {
        console.log(error);
        alert("Check backend error log");
      }
      setData("");
      setLoading(false);
    }
  };

  return (
    <div className="gpt-container">
      <button className="dashboardNavBut" onClick={() => navigate("/")}>
        Dashboard
      </button>
      <div>
        <div className="widget-header">
          <h2>Davinci</h2>
        </div>
        <p className="widget-label">Ask Davinci Anything</p>
        <form onSubmit={handleSubmit}>
          <textarea
            minLength={1}
            type="text"
            rows={5}
            style={{ padding: "6px", margin: "3px" }}
            value={prompt}
            onChange={(e) => setData(e.target.value)}
            placeholder="Example: Tell me a cookie recipe, what does React.js useEffect do, how many cups in a gallon"
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
            clearResponse={() => setResponse("")}
          ></DisplayResponse>
        </>
      )}
    </div>
  );
}

export default Davinci;
