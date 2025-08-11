// --- The AOA-Infused StorySelling Engine v1.1 ---
// --- Firebase Function: The "Automation Bridge" for SmartBot Pioneers (v2 - Resilient) ---

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addNewPioneer = functions.https.onRequest(async (req, res) => {
  console.log("Webhook received:", req.body);

  // --- 1. Get the data from the Brevo webhook ---
  const email = req.body.email;

  // --- THIS IS THE UPGRADE ---
  // We now safely check if 'attributes' exists before trying to read from it.
  const attributes = req.body.attributes || {}; // Use an empty object as a default
  const firstName = attributes.FIRSTNAME || 'New';
  const lastName = attributes.LASTNAME || 'Pioneer';
  const businessPage = attributes.BUSINESSPAGE || "A Pioneer's Business";
  // --- END OF UPGRADE ---

  if (!email) {
    console.error("No email provided in webhook payload.");
    return res.status(400).send("Error: Email is required.");
  }
  
  // --- 2. Format the data for our database ---
  const anonymizedName = `${firstName} ${lastName.charAt(0) ? lastName.charAt(0) + '.' : ''}`;

  const newPioneerData = {
    name: anonymizedName,
    page: businessPage,
    status: "PIONEER",
    joinedAt: new Date().toISOString(),
  };

  // --- 3. Connect to the Realtime Database and save the data ---
  const db = admin.database();
  const pioneersRef = db.ref("pioneers");
  const liveStatusRef = db.ref("liveStatus");

  try {
    await pioneersRef.push(newPioneerData);
    console.log("Successfully added new pioneer:", email);

    await liveStatusRef.child("totalPioneers").transaction((currentValue) => {
      return (currentValue || 0) + 1;
    });
    console.log("Successfully incremented pioneer count.");
    
    return res.status(200).send("Successfully processed pioneer.");

  } catch (error) {
    console.error("Error writing to database:", error);
    return res.status(500).send("Error: Could not write to database.");
  }
});