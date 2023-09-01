import { createContext, useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../services/firebase';
import PropTypes from 'prop-types';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

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
        const { user: userCred } = await signInWithEmailAndPassword(auth, email, password);

        userCred.getIdToken().then(token => {
            setUser(userCred);
            setCookie(undefined, 'auth-algorif', token, {
                maxAge: 60 * 60 * 1, //1hour
                path: '/'
            });
            router.push('/');
        });
    };

    const signOut = async () => {
        await auth.signOut();
        setUser(null);
        destroyCookie(undefined, 'auth-algorif');
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
