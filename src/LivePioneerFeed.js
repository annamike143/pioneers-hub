// --- LivePioneerFeed.js - The "Live" Component (v2) ---

import React, { useState, useEffect } from 'react';
import { ref, onValue, query, limitToLast } from 'firebase/database';
import { database } from './firebase';
import './LivePioneerFeed.css';

const LivePioneerFeed = () => {
    const [pioneers, setPioneers] = useState([]);

    useEffect(() => {
        // This query gets the most recent 10 pioneers from the database
        const pioneersRef = query(ref(database, 'pioneers'), limitToLast(10));
        
        const unsubscribe = onValue(pioneersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert the Firebase object into an array we can display
                const pioneersList = Object.keys(data)
                    .map(key => ({
                        id: key,
                        ...data[key]
                    }))
                    .reverse(); // Show the newest ones first
                setPioneers(pioneersList);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="live-feed">
            <h2 className="feed-title">Live Pioneer Feed</h2>
            <div className="feed-list">
                {pioneers.map((pioneer) => (
                    <div className="feed-item" key={pioneer.id}>
                        <div className="feed-avatar">
                            <img src="/logo-mascot.png" alt="SmartBot Mascot" />
                        </div>
                        <div className="feed-info">
                            <p className="pioneer-name">{pioneer.name} just joined!</p>
                            <p className="pioneer-page">{pioneer.page}</p>
                        </div>
                        <div className={`status-label ${pioneer.status.toLowerCase()}`}>
                            {pioneer.status}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LivePioneerFeed;