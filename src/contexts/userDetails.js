import { useContext, useEffect } from "react";
import { GetContext } from "./getFirebaseContext";

export const UserDetails = (setCoders) => {
    const getContext = useContext(GetContext);
    const loaded = false

    const datasUsers = () => {
        getContext.getUserDetails().then((value) =>
            setCoders(value)
        ).catch(console.error)

    }
    useEffect(() => {
        if (loaded) {
            return
        }
        datasUsers();
        loaded = true
    }, []);
}