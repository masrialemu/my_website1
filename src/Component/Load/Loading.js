import React from "react";
import "./Loading.css";

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
