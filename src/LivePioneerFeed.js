// --- LivePioneerFeed.js (v3 - Animated) ---
import React, { useState, useEffect } from 'react';
import { ref, onValue, query, limitToLast } from 'firebase/database';
import { database } from './firebase';
import { motion } from 'framer-motion';
import './LivePioneerFeed.css';

const LivePioneerFeed = () => {
    const [pioneers, setPioneers] = useState([]);

    useEffect(() => {
        const pioneersRef = query(ref(database, 'pioneers'), limitToLast(10));
        const unsubscribe = onValue(pioneersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const pioneersList = Object.keys(data).map(key => ({ id: key, ...data[key] })).reverse();
                setPioneers(pioneersList);
            }
        });
        return () => unsubscribe();
    }, []);

    const listVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: {
                staggerChildren: 0.1 // This makes each item appear one after the other
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

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
                variants={listVariants}
                initial="hidden"
                animate="visible"
            >
                {pioneers.map((pioneer) => (
                    <motion.div className="feed-item" key={pioneer.id} variants={itemVariants}>
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
        </motion.div>
    );
};

export default LivePioneerFeed;