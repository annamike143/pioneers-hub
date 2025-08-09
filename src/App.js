// --- The AOA-Infused StorySelling Engine v1.1 ---
// --- App.js - Main Application Structure for The Pioneer's Hub (FINAL) ---

import './App.css';
import VitalSignsDashboard from './VitalSignsDashboard'; 
import LivePioneerFeed from './LivePioneerFeed';
import CTASection from './CTASection';


function App() {
  return (
    <div className="App">
      <header className="header">
        <img src="/logo-wordmark.png" alt="SmartBot Logo" className="logo-wordmark" />
        
        <div className="header-buttons">
          <a href="https://app.smartbot.ph" target="_blank" rel="noopener noreferrer" className="login-button">
            Login
          </a>
          
          <a href="https://smartbot.ph" target="_blank" rel="noopener noreferrer" className="cta-button">
            Claim Your FREE Pioneer Slot
          </a>
        </div>
      </header>
      
      <main className="main-content">
        <VitalSignsDashboard /> 

        <div className="live-feed-section">
            <LivePioneerFeed />
            <CTASection />
        </div>
      </main>
    </div>
  );
}

export default App;