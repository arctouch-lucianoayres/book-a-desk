// Import the db from firebase-config
import { db } from './firebase-config.js';
import { ref, set, onValue } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js';

const sessionId = crypto.randomUUID(); // generate random session ID
const sessionRef = ref(db, 'sessions/' + sessionId);

// Initialize the session state
set(sessionRef, { state: 'waiting' })
  .catch(error => console.error("Error setting initial state:", error));

const phoneUrl = `${location.origin}/phone.html?sessionId=${sessionId}`;

QRCode.toCanvas(document.getElementById('qrcode'), phoneUrl);

// Listen for state changes using onValue
onValue(ref(db, `sessions/${sessionId}/state`), (snap) => {
    if (snap.val() === 'clicked') {
        document.getElementById('status').textContent = 'Booking request sent! Redirecting...';
        setTimeout(() => {
            location.href = '/thankyou.html'; // or show another screen
        }, 1000);
    }
});