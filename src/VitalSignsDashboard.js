// --- VitalSignsDashboard.js (v3.1 - Corrected Animation) ---

import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import './VitalSignsDashboard.css';

// A custom component to handle the number animation (NEW, CORRECTED VERSION)
const AnimatedCounter = ({ value }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => Math.round(latest).toLocaleString());

    useEffect(() => {
        const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
        return controls.stop;
    }, [value]);

    return <motion.span>{rounded}</motion.span>;
};


const VitalSignsDashboard = () => {
  const [liveStatus, setLiveStatus] = useState({ totalPioneers: 0, totalCapacity: 100 });

  useEffect(() => {
    const statusRef = ref(database, 'liveStatus');
    const unsubscribe = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setLiveStatus(data);
    });
    return () => unsubscribe();
  }, []);

  const { totalPioneers, totalCapacity } = liveStatus;
  const availableSlots = totalCapacity - totalPioneers;
  const capacityDeployed = totalPioneers * 1000;
  const capacityPercentage = (totalPioneers / totalCapacity) * 100;

  return (
    <motion.div 
        className="vital-signs-dashboard"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
      <div className="data-pod">
        <h2 className="pod-title">Total Pioneers</h2>
        <div className="pod-data highlight-blue"><AnimatedCounter value={totalPioneers} /></div>
        <div className="pod-subtitle">Founding Members</div>
      </div>

      <div className="data-pod">
        <h2 className="pod-title">Available Pioneer Slots</h2>
        <div className="pod-data highlight-gold"><AnimatedCounter value={availableSlots} /></div>
        <div className="pod-subtitle">out of {totalCapacity} Total Capacity</div>
        <div className="progress-bar-container">
          <motion.div 
            className="progress-bar-fill" 
            initial={{ width: 0 }}
            animate={{ width: `${capacityPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </div>
      </div>

      <div className="data-pod">
        <h2 className="pod-title">Subscriber Capacity Deployed</h2>
        <div className="pod-data"><AnimatedCounter value={capacityDeployed} /></div>
        <div className="pod-subtitle">out of { (totalCapacity * 1000).toLocaleString() }</div>
      </div>
    </motion.div>
  );
};

export default VitalSignsDashboard;