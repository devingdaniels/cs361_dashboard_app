import React from "react";

function DisplayResponse({ response, clearResponse }) {
  return (
    <div className="gpt-response-section">
      <p>{response}</p>
      <button className="clear-button" onClick={() => clearResponse()}>
        Clear
      </button>
    </div>
  );
}

export default DisplayResponse;
