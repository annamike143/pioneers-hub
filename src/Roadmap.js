// --- Roadmap.js ---
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase';
import './Roadmap.css';

// Import specific icons we need from the library
import { FaCog, FaPhotoVideo, FaTachometerAlt, FaRocket, FaShieldAlt } from 'react-icons/fa';

// This is a "mapper" that connects the text from your database to an actual icon component
const iconMap = {
    engine: <FaCog />,
    media: <FaPhotoVideo />,
    dashboard: <FaTachometerAlt />,
    rocket: <FaRocket />,
    security: <FaShieldAlt />
};

const Roadmap = () => {
    const [roadmapItems, setRoadmapItems] = useState([]);

    useEffect(() => {
        const roadmapRef = ref(database, 'siteContent/roadmap');
        const unsubscribe = onValue(roadmapRef, (snapshot) => {
            const data = snapshot.val();
            const loadedItems = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            setRoadmapItems(loadedItems);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="roadmap-container">
            <h2 className="roadmap-title">The Future of SmartBot</h2>
            <div className="roadmap-grid">
                {roadmapItems.map(item => (
                    <div key={item.id} className="roadmap-card">
                        <div className="card-icon">
                            {iconMap[item.icon] || <FaCog />} {/* Use a default icon if one isn't found */}
                        </div>
                        <h3 className="card-title">{item.title}</h3>
                        <p className="card-description">{item.description}</p>
                    </div>
                ))}
            </div>
            <p className="roadmap-footer">Our Commitment to Continuous Innovation. This is just the beginning.</p>
        </div>
    );
};

export default Roadmap;