```javascript
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

let retries = 0;
const maxRetries = 3; // Increase for more robustness
const retryDelay = 1000; // milliseconds

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    console.log('User is signed in:', user);
  } else {
    // User is signed out
    console.log('User is signed out');
  }
}, (error) => {
  if (retries < maxRetries) {
    console.log(`onAuthStateChanged error: ${error.message}, retrying in ${retryDelay}ms...`)
    setTimeout(() => {
      retries++;
      auth.currentUser ? auth.currentUser.reload(): null; // Reload user data
    }, retryDelay);
  } else {
    console.error(`onAuthStateChanged failed after multiple retries: ${error}`);
    // Handle persistent error appropriately (e.g., display an error message to the user)
  }
});
```