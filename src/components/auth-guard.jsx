import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuthContext } from '../contexts/auth-context';
import { getAuth } from "firebase/auth";

export const AuthGuard = ({ children }) => {
    const router = useRouter();
    const { isAuthenticated } = useAuthContext();
    const ignore = useRef(false);
    const [checked, setChecked] = useState(false);

    const auth = getAuth();

    useEffect(
        () => {
            if (!router.isReady) {
                return;
            }

            // Prevent from calling twice in development mode with React.StrictMode enabled
            if (ignore.current) {
                return;
            }

            auth.onAuthStateChanged((user) => {
                if (user) {
                    setChecked(true);
                    const uid = user.uid
                } else {
                    router
                        .replace({
                            pathname: '/login',
                            query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
                        })
                        .catch(console.error);
                }
            });

            ignore.current = true;
            if (!isAuthenticated) {
                router.push("/login")
            } else {

            }
        },
        [router.isReady]
    );

    if (!checked) {
        return null;
    }

    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};
