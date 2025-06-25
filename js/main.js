// Import the db from firebase-config
import { db } from './firebase-config.js';
import { ref, set, onValue } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js';

const sessionId = crypto.randomUUID(); // generate random session ID
const sessionRef = ref(db, 'sessions/' + sessionId);

// Initialize the session state
set(sessionRef, { state: 'waiting' })
  .catch(error => console.error("Error setting initial state:", error));

const phoneUrl = `${location.origin}/phone.html?sessionId=${sessionId}`;

// Generate larger QR code with options
QRCode.toCanvas(document.getElementById('qrcode'), phoneUrl, {
  width: 280,  // Increased size
  margin: 2,   // Smaller margin to maximize QR code size
  scale: 8     // Higher scale for better quality
});

// Listen for state changes using onValue
onValue(ref(db, `sessions/${sessionId}/state`), (snap) => {
    const state = snap.val();
    const statusElement = document.getElementById('status');
    
    if (state === 'pending') {
        statusElement.textContent = 'Almost There! Please complete confirmation on your mobile device';
        statusElement.classList.add('pending');
    } else if (state === 'clicked') {
        statusElement.textContent = 'Booking request sent! Redirecting...';
        statusElement.classList.remove('pending');
        setTimeout(() => {
            location.href = '/thankyou.html'; // or show another screen
        }, 1000);
    }
});