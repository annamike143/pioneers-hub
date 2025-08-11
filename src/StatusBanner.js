// --- StatusBanner.js ---
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase';
import './StatusBanner.css';

const StatusBanner = () => {
    const [serverStatus, setServerStatus] = useState(null);

    useEffect(() => {
        const statusRef = ref(database, 'siteContent/serverStatus');
        const unsubscribe = onValue(statusRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setServerStatus(data);
            }
        });
        return () => unsubscribe();
    }, []);

    // Don't render anything until the status is loaded
    if (!serverStatus) {
        return null;
    }

    // Determine the CSS class based on the status from Firebase
    const bannerClass = `status-banner ${serverStatus.status.toLowerCase()}`;

    return (
        <div className={bannerClass}>
            <p>{serverStatus.message}</p>
        </div>
    );
};

export default StatusBanner;