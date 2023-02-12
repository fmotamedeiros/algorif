import { createContext } from "react";
import { auth, db, storage } from "./auth-context";
import { arrayUnion, doc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";;

export const SetContext = createContext({ undefined });

export const SetProvider = ({ children }) => {
    const setPictureUser = async (file) => {
        const storageRef = ref(storage, auth.currentUser.uid + ".png");
        await uploadBytes(storageRef, file)
    }

    const setRegisterUser = async (detailsUser) => {
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

    const setCreateQuestion = async (detailsUser, code) => {
        const categories = doc(db, "categories", detailsUser.topic)
        await updateDoc(categories, {
            questions: arrayUnion({
                topic: detailsUser.topic,
                title: detailsUser.title,
                difficulty: detailsUser.difficulty,
                description: detailsUser.description,
                detailedDescription: detailsUser.detailedDescription,
                code: code,
                test: detailsUser.tests.map(test => ({ input: test.inputTest, output: test.outputTest })),
                creator: auth.currentUser.uid,
            })
        });
    }

    const taskSolved = async (nameQuestion, topic, difficultQuestion, status) => {
        const ref = doc(db, "taskSolved", auth.currentUser.uid)
        const timestamp = serverTimestamp()
        await updateDoc(ref, {
            [nameQuestion]: ({
                completed: status,
                topic: topic,
                difficultQuestion: difficultQuestion,
                date: timestamp,
            }),
            [difficultQuestion + "Submissions"]: increment(1)
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
