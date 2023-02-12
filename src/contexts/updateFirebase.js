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

    const updateDatasQuestion = async (currentData, pastData, code) => {
        const pastCategories = doc(db, "categories", pastData.topic)
        await updateDoc(pastCategories, {
            questions: arrayRemove({
                topic: pastData.topic,
                title: pastData.title,
                difficulty: pastData.difficulty,
                description: pastData.description,
                detailedDescription: pastData.detailedDescription,
                code: pastData.code,
                test: pastData.test,
                creator: pastData.creator,
            })
        });

        const currentCategories = doc(db, "categories", currentData.topic)
        await updateDoc(currentCategories, {
            questions: arrayUnion({
                topic: currentData.topic,
                title: currentData.title,
                difficulty: currentData.difficulty,
                description: currentData.description,
                detailedDescription: currentData.detailedDescription,
                code: code,
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
