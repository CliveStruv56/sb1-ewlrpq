import { getFirestore, enableIndexedDbPersistence, collection, getDocs } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { db } from '../lib/firebase';

const initializeFirebase = async () => {
  try {
    // Get the existing Firebase app instance
    const app = getApp();
    
    // Enable offline persistence
    try {
      await enableIndexedDbPersistence(db);
      console.log('Offline persistence enabled');
    } catch (err: any) {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence available in one tab at a time');
      } else if (err.code === 'unimplemented') {
        console.warn('Browser doesn\'t support persistence');
      }
    }

    // Test connection
    const testRef = collection(db, 'products');
    await getDocs(testRef);
    console.log('Firebase connection successful');
    
    return true;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return false;
  }
};

// Initialize immediately
initializeFirebase().catch(console.error);

export { db, initializeFirebase };