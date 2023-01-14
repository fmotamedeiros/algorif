import { createContext } from "react";
import { auth, db, storage } from "./auth-context";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";;
import { deleteUser } from "firebase/auth";

export const DeleteContext = createContext({ undefined });

export const DeleteProvider = (props) => {
    const { children } = props;

    async function deleteDataUser() {

        const dataUser = doc(db, "coders", auth.currentUser.uid);
        await deleteDoc(dataUser);

        const storageRef = ref(storage, auth.currentUser.uid + ".png");
        deleteObject(storageRef)

        deleteUser(auth.currentUser).then(() => {
            alert("Conta excluída com sucesso")
          }).catch((error) => {
            console.log(error)
          });
    }

    return (
        <DeleteContext.Provider
            value={{
                deleteDataUser
            }}
        >
            {children}
        </DeleteContext.Provider>
    );
}
