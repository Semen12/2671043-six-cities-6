import React from 'react';
import './loading-screen.css';

export const LoadingScreen: React.FC = () => (
  <div className="loading-screen">
    <div className="spinner" />
    <span className="loading-text">Loading...</span>
  </div>
);

export default LoadingScreen;
