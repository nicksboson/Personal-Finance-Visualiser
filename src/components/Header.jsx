import React from 'react';

const Header = ({ flash }) => (
  <header className="header">
    <h1>💰 Personal Finance Visualizer</h1>
    <p>Track your income and expenses </p>
    {flash && (
      <div className={`alert alert-${flash.type} alert-dismissible fade show flash-in-header`} role="alert">
        {flash.message}
        <button type="button" className="btn-close" aria-label="Close" onClick={flash.onClose}></button>
      </div>
    )}
  </header>
);

export default Header; 