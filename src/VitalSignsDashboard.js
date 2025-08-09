// --- VitalSignsDashboard.js - The "Live" Component (v2) ---

import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase'; // We import our database connection
import './VitalSignsDashboard.css';

const VitalSignsDashboard = () => {
  // We now use "state" to hold our live data
  const [liveStatus, setLiveStatus] = useState({
    totalPioneers: 17, // Default starting value
    totalCapacity: 100, // Default starting value
  });

  useEffect(() => {
    // This code runs once when the component loads
    // It creates a "listener" to the 'liveStatus' part of our database
    const statusRef = ref(database, 'liveStatus');
    
    const unsubscribe = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLiveStatus(data); // When data changes in Firebase, update our state!
      }
    });

    // Cleanup function to stop listening when the component is closed
    return () => unsubscribe();
  }, []); // The empty array [] means this effect runs only once on mount

  const { totalPioneers, totalCapacity } = liveStatus;

  const freePioneers = totalPioneers; // We'll update this logic later
  const paidPartners = 0;

  const availableSlots = totalCapacity - totalPioneers;
  const capacityDeployed = totalPioneers * 1000;
  const capacityPercentage = (totalPioneers / totalCapacity) * 100;

  return (
    <div className="vital-signs-dashboard">
      <div className="data-pod">
        <h2 className="pod-title">Total Pioneers</h2>
        <div className="pod-data highlight-blue">{totalPioneers}</div>
        <div className="pod-subtitle">Founding Members</div>
      </div>

      <div className="data-pod">
        <h2 className="pod-title">Available Pioneer Slots</h2>
        <div className="pod-data highlight-gold">{availableSlots}</div>
        <div className="pod-subtitle">out of {totalCapacity} Total Capacity</div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${capacityPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="data-pod">
        <h2 className="pod-title">Subscriber Capacity Deployed</h2>
        <div className="pod-data">{capacityDeployed.toLocaleString()}</div>
        <div className="pod-subtitle">out of { (totalCapacity * 1000).toLocaleString() }</div>
      </div>
    </div>
  );
};

export default VitalSignsDashboard;