import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import config from '../firebase-applet-config.json';

// Initialize Firebase using the credentials provided in the configuration file
const app = initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
});

// Access Firestore with the custom database ID provisioned for this applet
export const db = getFirestore(app, config.firestoreDatabaseId);

// Access Firebase Authentication
export const auth = getAuth(app);
