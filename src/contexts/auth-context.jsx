import { createContext, useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../services/firebase';
import PropTypes from 'prop-types';
import { setCookie, parseCookies } from 'nookies';

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
        setCookie(undefined, 'auth-algorif', JSON.stringify(user), {
            maxAge: 60 * 60 * 1, //1hour
            path: '/'
        });
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
