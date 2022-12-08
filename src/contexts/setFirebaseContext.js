import { createContext } from "react";
import { auth, db, storage } from "./auth-context";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";;

export const SetContext = createContext({ undefined });

export const SetProvider = (props) => {
    const { children } = props;

    async function setUserDetails(email, userName, state, city, phone) {
        const ref = doc(db, "coders", auth.currentUser.uid);
        await updateDoc(ref, {
            email: email,
            userName: userName,
            state: state,
            city: city,
            phone: phone
        });
    }

    async function setPictureUser(file) {
        const storageRef = ref(storage, auth.currentUser.uid + ".png");
        await uploadBytes(storageRef, file)
    }

    async function setRegisterUser(email, userName, state, city) {
        try {
            await setDoc(doc(db, "coders", auth.currentUser.uid), {
                email: email,
                userName: userName,
                state: state,
                city: city,
                phone: '',
            });
            console.log(auth.currentUser.uid)
        } catch (error) {
            console.log(error)
            alert(error)
        }

        const storageRef = ref(storage, auth.currentUser.uid + ".png");
        await uploadBytes(storageRef)
    }

    return (
        <SetContext.Provider
            value={{
                setUserDetails,
                setPictureUser,
                setRegisterUser,

            }}
        >
            {children}
        </SetContext.Provider>
    );
}
