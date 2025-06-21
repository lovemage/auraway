import React from 'react';
import './FloatingAiButton.css';

const FloatingAiButton = ({ onClick }) => {
  const imageUrl = process.env.PUBLIC_URL + '/images/asset/ai-n.jpg';

  return (
    <button
      className="floating-ai-button-new"
      onClick={onClick}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <span className="ai-button-new-label">AI營養師</span>
    </button>
  );
};

export default FloatingAiButton; 