import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  writeBatch,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  User
} from 'firebase/auth';
import { db, auth } from '../firebase';
import { Project, Task, Note, Contributor } from '../types';

export interface FirebaseUserProfile {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  savedProjectIds?: string[];
  activityLogs?: { id: string; action: string; time: string }[];
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Standard Email/Password Login
 */
export async function loginUser(email: string, passwordInput: string): Promise<{ user: User; profile: FirebaseUserProfile }> {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, passwordInput);
    const user = credential.user;
    
    let profile: FirebaseUserProfile;
    try {
      const profileSnap = await getDoc(doc(db, 'users', user.uid));
      if (profileSnap.exists()) {
        profile = profileSnap.data() as FirebaseUserProfile;
      } else {
        // Fallback if profile doesn't exist for some reason
        profile = {
          name: email.split('@')[0],
          email,
          savedProjectIds: [],
          activityLogs: []
        };
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `users/${user.uid}`);
      throw err; // unreachable
    }
    
    return { user, profile };
  } catch (err: any) {
    console.error('Firebase Auth login error:', err);
    if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
      throw new Error("Please check your email or password.");
    }
    throw new Error("Something went wrong while signing in. Please try again.");
  }
}

/**
 * Standard Email/Password Sign Up
 */
export async function signUpUser(email: string, passwordInput: string, name: string): Promise<{ user: User; profile: FirebaseUserProfile }> {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, passwordInput);
    const user = credential.user;
    
    const profile: FirebaseUserProfile = {
      name,
      email,
      bio: 'Strategic Auditor & Venture Analyst. Curating lessons from historically defunct tech blueprints to guide tomorrow\'s builds.',
      avatar: '🦊',
      savedProjectIds: [],
      activityLogs: [
        { id: `act-${Date.now()}`, action: 'Created new secure Firebase Account.', time: 'Just now' }
      ]
    };
    
    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...profile,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}`);
    }
    
    return { user, profile };
  } catch (err: any) {
    console.error('Firebase Auth signup error:', err);
    if (err.code === 'auth/email-already-in-use') {
      throw new Error("An account with this email already exists.");
    } else if (err.code === 'auth/weak-password') {
      throw new Error("Password should be at least 6 characters.");
    }
    throw new Error("Something went wrong while signing up. Please try again.");
  }
}

/**
 * Authenticate with Google
 */
export async function signInWithGoogle(): Promise<{ user: User; profile: FirebaseUserProfile; isNew: boolean }> {
  const provider = new GoogleAuthProvider();
  try {
    const credential = await signInWithPopup(auth, provider);
    const user = credential.user;

    // Fetch profile
    const profileSnap = await getDoc(doc(db, 'users', user.uid));
    let profile: FirebaseUserProfile;
    let isNew = false;
    
    if (profileSnap.exists()) {
      profile = profileSnap.data() as FirebaseUserProfile;
    } else {
      isNew = true;
      const name = user.displayName || user.email?.split('@')[0] || 'Innovator';
      profile = {
        name,
        email: user.email || '',
        bio: 'Strategic Auditor & Venture Analyst. Curating lessons from historically defunct tech blueprints to guide tomorrow\'s builds.',
        avatar: user.photoURL || '🦊',
        savedProjectIds: [],
        activityLogs: [
          { id: `act-${Date.now()}`, action: 'Created new secure Firebase Account with Google.', time: 'Just now' }
        ]
      };
      await setDoc(doc(db, 'users', user.uid), {
        ...profile,
        createdAt: serverTimestamp()
      });
    }
    return { user, profile, isNew };
  } catch (err) {
    console.error('Google Sign-In error:', err);
    throw err;
  }
}

/**
 * Listen for user authorization changes
 */
export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Sign out from the current Firebase session
 */
export async function logoutUser() {
  await firebaseSignOut(auth);
}

/**
 * Save user profile details to Firestore
 */
export async function saveFirebaseUserProfile(userId: string, profile: Partial<FirebaseUserProfile>) {
  const userDocRef = doc(db, 'users', userId);
  await setDoc(userDocRef, {
    ...profile,
    updatedAt: serverTimestamp()
  }, { merge: true });
}

/**
 * Retrieve user profile details from Firestore
 */
export async function getFirebaseUserProfile(userId: string): Promise<FirebaseUserProfile | null> {
  const userDocSnap = await getDoc(doc(db, 'users', userId));
  if (userDocSnap.exists()) {
    return userDocSnap.data() as FirebaseUserProfile;
  }
  return null;
}

/**
 * Save a specific custom project or active workspace to Firestore
 */
export async function saveFirebaseProject(userId: string, project: Project) {
  const projDocRef = doc(db, 'users', userId, 'projects', project.id);
  
  // Prepare workspace to serialize correctly (sanitize out undefined blocks)
  const serializedProject = {
    ...project,
    updatedAt: serverTimestamp()
  };
  
  // Firestore doesn't like undefined fields, so we convert them to null or remove them
  if (serializedProject.aiAnalysis === undefined) delete serializedProject.aiAnalysis;
  if (serializedProject.workspace === undefined) delete serializedProject.workspace;
  
  await setDoc(projDocRef, serializedProject, { merge: true });
}

/**
 * Retrieve all user-specific custom projects and workspace overrides from Firestore
 */
export async function getFirebaseUserProjects(userId: string): Promise<Project[]> {
  const colRef = collection(db, 'users', userId, 'projects');
  const querySnap = await getDocs(colRef);
  
  const projects: Project[] = [];
  querySnap.forEach((docSnap) => {
    projects.push(docSnap.data() as Project);
  });
  return projects;
}

/**
 * Batch upload a list of projects to Firestore during initial synchronization
 */
export async function uploadProjectsBatch(userId: string, projects: Project[]) {
  const batch = writeBatch(db);
  
  projects.forEach((proj) => {
    const docRef = doc(db, 'users', userId, 'projects', proj.id);
    const serializedProj = { ...proj };
    if (serializedProj.aiAnalysis === undefined) delete serializedProj.aiAnalysis;
    if (serializedProj.workspace === undefined) delete serializedProj.workspace;
    
    batch.set(docRef, serializedProj, { merge: true });
  });
  
  await batch.commit();
}
