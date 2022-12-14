import { createContext } from "react";
import { auth, db } from "./auth-context";
import { doc, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";

export const UpdateContext = createContext({ undefined });

export const UpdateProvider = (props) => {
    const { children } = props;

    async function updateUserDetails(detailsUser) {
        const ref = doc(db, "coders", auth.currentUser.uid);
        await updateDoc(ref, {
            userName: detailsUser.userName,
            state: detailsUser.state,
            city: detailsUser.city,
            phone: detailsUser.phone
        });
    }

    async function updatePasswordUser(password) {
        updatePassword(auth.currentUser, password).then(() => {
            alert("Senha atualizada com sucesso")
          }).catch((error) => {
            console.log(error)
          });
    }

    return (
        <UpdateContext.Provider
            value={{
                updateUserDetails,
                updatePasswordUser
            }}
        >
            {children}
        </UpdateContext.Provider>
    );
}
