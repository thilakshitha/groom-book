
import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

interface UserProfile {
  uid: string;
  email: string | null;
  fullName: string;
  phoneNumber: string;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, fullName: string, phoneNumber: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string, fullName: string, phoneNumber: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user profile
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      fullName,
      phoneNumber,
      createdAt: new Date().toISOString()
    });
  }

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function googleSignIn() {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user profile exists
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    // If not, create one with available data
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName || "",
        phoneNumber: user.phoneNumber || "",
        createdAt: new Date().toISOString()
      });
    }
  }

  function logout() {
    return signOut(auth);
  }

  // Fetch user profile from Firestore
  async function fetchUserProfile(uid: string) {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      setUserProfile(userDoc.data() as UserProfile);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout,
    googleSignIn
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
