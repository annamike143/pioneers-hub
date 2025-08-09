// --- CTASection.js ---
import React from 'react';
import './CTASection.css';

const CTASection = () => {
  return (
    <div className="cta-section">
      <div className="cta-box primary-cta">
        <h3 className="cta-title">New Here? Join the Mission.</h3>
        <p className="cta-subtitle">Get your free Pioneer account with 1,000 subscriber slots. No trial. No credit card.</p>
        <a href="https://smartbot.ph" target="_blank" rel="noopener noreferrer" className="cta-button-large">
          Claim Your FREE Pioneer Slot
        </a>
      </div>
      <div className="cta-box secondary-cta">
        <h3 className="cta-title">Already a Pioneer?</h3>
        <p className="cta-subtitle">Upgrade to a Partner account to unlock your full potential and secure your slot permanently.</p>
        <a href="https://upgrade.smartbot.ph" target="_blank" rel="noopener noreferrer" className="upgrade-button">
          Upgrade to Partner
        </a>
      </div>
    </div>
  );
};

export default CTASection;