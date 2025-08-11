// --- LivePioneerFeed.js (FINAL v5 - Smart Pagination) ---
import React, { useState, useEffect } from 'react';
import { ref, onValue, query } from 'firebase/database';
import { database } from './firebase';
import { motion } from 'framer-motion';
import './LivePioneerFeed.css';

const LivePioneerFeed = () => {
    const [allPioneers, setAllPioneers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    // --- NEW: Responsive items per page ---
    const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 1024 ? 5 : 10);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth < 1024 ? 5 : 10);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        const pioneersRef = query(ref(database, 'pioneers'));
        const unsubscribe = onValue(pioneersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const pioneersList = Object.keys(data)
                    .map(key => ({ id: key, ...data[key] }))
                    .filter(pioneer => pioneer.status !== 'FROZEN')
                    .reverse();
                setAllPioneers(pioneersList);
            }
        });
        return () => unsubscribe();
    }, []);

    // --- NEW: Pagination Logic ---
    const totalPages = Math.ceil(allPioneers.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allPioneers.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    const prevPage = () => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));

    return (
        <motion.div className="live-feed" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="feed-title">Live Pioneer Feed</h2>
            <motion.div className="feed-list">
                {currentItems.map((pioneer) => (
                    <motion.div className="feed-item" key={pioneer.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="feed-avatar"><img src="/logo-mascot.png" alt="Mascot" /></div>
                        <div className="feed-info">
                            <p className="pioneer-name">{pioneer.name} just joined!</p>
                            <p className="pioneer-page">{pioneer.page}</p>
                        </div>
                        <div className={`status-label ${pioneer.status.toLowerCase()}`}>{pioneer.status}</div>
                    </motion.div>
                ))}
            </motion.div>
            
            {/* --- NEW: Pagination Controls --- */}
            {totalPages > 1 && (
                <div className="pagination-controls">
                    <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
            )}
        </motion.div>
    );
};

export default LivePioneerFeed;