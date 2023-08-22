import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const AuthContext = createContext({ undefined });



export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();
    
    const isAuthenticated = !!user;

    useEffect(() => {
        const userInformations = localStorage.getItem("@AuthFirebase:metadata");
        
        if (userInformations !== 'null') {
            let userInformationsParsed = JSON.parse(userInformations);
            setUser(userInformationsParsed);
        }

    }, []);

    const signIn = async (email, password) => {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        setUser(user);
        localStorage.setItem("@AuthFirebase:metadata", JSON.stringify(user));
        router.push('/');
    };

    const signOut = async () => {
        await auth.signOut();
        setUser(null);
        localStorage.removeItem("@AuthFirebase:metadata");
        router.push('/login');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                isAuthenticated,
                signOut,

            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuth = () => useContext(AuthContext);
