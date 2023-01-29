import { createContext } from "react";
import { auth, db } from "./auth-context";
import { arrayRemove, arrayUnion, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";

export const UpdateContext = createContext({ undefined });

export const UpdateProvider = ({ children }) => {
    const updateUserDetails = async (detailsUser) => {
        const ref = doc(db, "coders", auth.currentUser.uid);
        await updateDoc(ref, {
            userName: detailsUser.userName,
            state: detailsUser.state,
            city: detailsUser.city,
            phone: detailsUser.phone
        });
    }

    const updatePasswordUser = async (password) => {
        updatePassword(auth.currentUser, password).then(() => {
            alert("Senha atualizada com sucesso")
        }).catch((error) => {
            console.log(error)
        });
    }

    const updateScore = async () => {
        const scoreRef = doc(db, "coders", auth.currentUser.uid);

        const data = await getDoc(scoreRef)

        const newScore = data.data().score + 1;
        updateDoc(scoreRef, { score: newScore });
    }

    const updateDatasQuestion = async (detailsUser, code, description, difficulty) => {
        const categories = doc(db, "categories", detailsUser.topico)
        const timestamp = serverTimestamp()
        await updateDoc(categories, {
            questions: arrayRemove({
                titulo: detailsUser.titulo,
                descricao: description,
                difficulty: difficulty
            })
        });
        await updateDoc(categories, {
            questions: arrayUnion({
                titulo: detailsUser.titulo,
                descricao: detailsUser.descricao,
                difficulty: detailsUser.dificuldade
            })
        });

        const detailsQuestions = doc(db, "descriptionQuestion", detailsUser.titulo)
        await updateDoc(detailsQuestions, {
            topico: detailsUser.topico,
            titulo: detailsUser.titulo,
            difficulty: detailsUser.dificuldade,
            descricao: detailsUser.descricao,
            descricaoDetalhada: detailsUser.descricaoDetalhada,
            codigo: code,
            test: [{input: detailsUser.inputTest, output: detailsUser.outputTest}],
            date: timestamp,
            creator: auth.currentUser.uid,
        });

    }

    // async function updateStatusQuestion(nameQuestion) {
    //     const replySent = doc(db, "coders", auth.currentUser.uid)

    //     const data = await getDoc(replySent)

    //     const newScore = data.data().submissions + 1;

    //     await updateDoc(replySent, {
    //         checkedQuestions: [{nameQuestion: nameQuestion, solved: true, submissions: newScore}]
    //     });
    // }

    return (
        <UpdateContext.Provider
            value={{
                updateUserDetails,
                updatePasswordUser,
                updateScore,
                updateDatasQuestion,
                // updateStatusQuestion
            }}
        >
            {children}
        </UpdateContext.Provider>
    );
}
