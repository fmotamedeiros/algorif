import { createContext } from "react";
import { auth, db, storage } from "./auth-context";
import { arrayUnion, doc, FieldValue, getDoc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
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
                score: 0
            });
        } catch (error) {
            console.log(error)
            alert(error)
        }

        const taskRef = doc(db, "taskSolved", auth.currentUser.uid)
        await setDoc(taskRef, {})

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
            topico: detailsUser.topico,
            difficultQuestion: detailsUser.dificuldade,
            descricaoDetalhada: detailsUser.descricaoDetalhada,
            codigo: code,
            nameFunction: detailsUser.nameFunction,
            test: [{input: detailsUser.inputTest, output: detailsUser.outputTest}]
        });
    }
    
    async function taskSolved(nameQuestion, topico, difficultQuestion, status) {
        const ref = doc(db, "taskSolved", auth.currentUser.uid)
        const timestamp = serverTimestamp()
        await updateDoc(ref, {
            [nameQuestion]: ({
                completed: status,
                topico: topico,
                difficultQuestion: difficultQuestion,
                date: timestamp,
            }),
            [difficultQuestion+"Submissions"]: increment(1)
        })
    }

    return (
        <SetContext.Provider
            value={{
                setPictureUser,
                setRegisterUser,
                setCreateQuestion,
                taskSolved,
            }}
        >
            {children}
        </SetContext.Provider>
    );
}
