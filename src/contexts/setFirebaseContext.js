import { createContext } from "react";
import { auth, db, storage } from "./auth-context";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";;

export const SetContext = createContext({ undefined });

export const SetProvider = (props) => {
    const { children } = props;

    async function setPictureUser(file) {
        const storageRef = ref(storage, auth.currentUser.uid + ".png");
        await uploadBytes(storageRef, file)
    }

    async function setRegisterUser(detailsUser) {
        try {
            await setDoc(doc(db, "coders", auth.currentUser.uid), {
                email: detailsUser.email,
                userName: detailsUser.userName,
                state: detailsUser.state,
                city: detailsUser.city,
                phone: '',
                teacher: false,
            });
        } catch (error) {
            console.log(error)
            alert(error)
        }

        const storageRef = ref(storage, auth.currentUser.uid + ".png");
        await uploadBytes(storageRef)
    }

    async function setCreateQuestion(detailsUser, code) {
        const categories = doc(db, "categories", detailsUser.topico)
        await updateDoc(categories, {
            questions: arrayUnion({
                titulo: detailsUser.titulo,
                descricao: detailsUser.descricao,
                dificuldade: detailsUser.dificuldade
            })
        });

        const detailsQuestions = doc(db, "descriptionQuestion", detailsUser.titulo)
        await setDoc(detailsQuestions, {
            descricaoDetalhada: detailsUser.descricaoDetalhada,
            codigo: code,
            nameFunction: detailsUser.nameFunction
        });
    }

    return (
        <SetContext.Provider
            value={{
                setPictureUser,
                setRegisterUser,
                setCreateQuestion
            }}
        >
            {children}
        </SetContext.Provider>
    );
}
