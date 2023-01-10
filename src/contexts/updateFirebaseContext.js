import { createContext } from "react";
import { auth, db } from "./auth-context";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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

    async function updateScore() {
        const scoreRef = doc(db, "coders", auth.currentUser.uid);

        const data = await getDoc(scoreRef)

        const newScore = data.data().score + 1;
        updateDoc(scoreRef, { score: newScore });
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
                // updateStatusQuestion
            }}
        >
            {children}
        </UpdateContext.Provider>
    );
}
