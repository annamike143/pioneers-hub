// --- App.js (v2.0 - Command Center Layout) ---
import Roadmap from './Roadmap';
import StatusBanner from './StatusBanner';
import './App.css';
import VitalSignsDashboard from './VitalSignsDashboard'; 
import LivePioneerFeed from './LivePioneerFeed';
import CTASection from './CTASection';
// We will import the new components here soon
// import StatusBanner from './StatusBanner';
// import Roadmap from './Roadmap';


function App() {
  return (
    <div className="App">
      <StatusBanner />
      {/* We will add the Status Banner here */}
      
      <header className="header">
        <img src="/logo-wordmark.png" alt="SmartBot Logo" className="logo-wordmark" />
        <div className="header-buttons">
          <a href="https://app.smartbot.ph" target="_blank" rel="noopener noreferrer" className="login-button">
            Login
          </a>
          <a href="https://your-groovefunnels-signup-page.com" target="_blank" rel="noopener noreferrer" className="cta-button">
            Claim Your FREE Pioneer Slot
          </a>
        </div>
      </header>
      
      <div className="main-layout">
        <main className="main-content">
          {/* Main content like the dashboard and roadmap will go here */}
          <VitalSignsDashboard />
          <Roadmap />
        </main>

        <aside className="sidebar">
          {/* The "sticky" sidebar content will go here */}
          <LivePioneerFeed />
          <CTASection />
        </aside>
      </div>
    </div>
  );
}

export default App;