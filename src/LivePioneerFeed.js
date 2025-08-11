// --- LivePioneerFeed.js (FINAL v4 - Freeze Aware & Pagination) ---
import React, { useState, useEffect } from 'react';
import { ref, onValue, query } from 'firebase/database';
import { database } from './firebase';
import { motion } from 'framer-motion';
import './LivePioneerFeed.css';

const LivePioneerFeed = () => {
    const [allPioneers, setAllPioneers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 10 for desktop

    useEffect(() => {
        const pioneersRef = query(ref(database, 'pioneers'));
        const unsubscribe = onValue(pioneersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // --- THE KEY UPGRADE IS HERE ---
                const pioneersList = Object.keys(data)
                    .map(key => ({ id: key, ...data[key] }))
                    // We filter out any pioneer with the "FROZEN" status
                    .filter(pioneer => pioneer.status !== 'FROZEN')
                    .reverse(); // Show the newest ones first
                setAllPioneers(pioneersList);
            }
        });
        return () => unsubscribe();
    }, []);
    
    // Logic for pagination will be added in the next step

    return (
        <motion.div 
            className="live-feed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="feed-title">Live Pioneer Feed</h2>
            <motion.div 
                className="feed-list"
            >
                {/* For now, we display all non-frozen pioneers */}
                {allPioneers.map((pioneer) => (
                    <motion.div className="feed-item" key={pioneer.id}>
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
                    </motion.div>
                ))}
            </motion.div>
            {/* Pagination controls will be added here */}
        </motion.div>
    );
};

export default LivePioneerFeed;