// Import Firebase modules
import { db } from './firebase-config.js';
import { ref, update } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js';

const params = new URLSearchParams(window.location.search);
const sessionId = params.get('sessionId');
const sessionRef = ref(db, 'sessions/' + sessionId);

document.addEventListener('DOMContentLoaded', () => {
  const actionButton = document.getElementById('action-button');
  
  actionButton.addEventListener('click', () => {
    // Update the session state
    update(sessionRef, { state: 'clicked' })
      .then(() => {
        document.getElementById('status').textContent = 'Button clicked!';
        actionButton.disabled = true;
      })
      .catch(error => {
        console.error("Error updating state:", error);
        document.getElementById('status').textContent = 'Error: ' + error.message;
      });
  });
});