import { createContext } from "react";
import { auth, db } from "./auth-context";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
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

    const updateDatasQuestion = async (currentData, code, pastData) => {

        const pastCategories = doc(db, "categories", pastData.topico)
        await updateDoc(pastCategories, {
            questions: arrayRemove({
                topico: pastData.topico,
                titulo: pastData.titulo,
                difficulty: pastData.difficulty,
                descricao: pastData.descricao,
                descricaoDetalhada: pastData.descricaoDetalhada,
                codigo: pastData.codigo,
                test: pastData.test,
                creator: pastData.creator,
            })
        });

        const currentCategories = doc(db, "categories", currentData.topico)
        await updateDoc(currentCategories, {
            questions: arrayUnion({
                topico: currentData.topico,
                titulo: currentData.titulo,
                difficulty: currentData.dificuldade,
                descricao: currentData.descricao,
                descricaoDetalhada: currentData.descricaoDetalhada,
                codigo: code,
                test: currentData.tests.map(test => ({ input: test.inputTest, output: test.outputTest })),
                creator: auth.currentUser.uid,
            })
        });
    }

    return (
        <UpdateContext.Provider
            value={{
                updateUserDetails,
                updatePasswordUser,
                updateScore,
                updateDatasQuestion,
            }}
        >
            {children}
        </UpdateContext.Provider>
    );
}
