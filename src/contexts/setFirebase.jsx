import { createContext } from "react";
import { database, storage, auth } from "../services/firebase";
import { addDoc, arrayUnion, collection, doc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export const SetContext = createContext({ undefined });

export const SetProvider = ({ children }) => {
    const setPictureUser = async (file) => {
        const storageRef = ref(storage, auth.currentUser.uid + ".png");
        await uploadBytes(storageRef, file)
    }

    const setRegisterUser = async (detailsUser) => {
        try {
            await setDoc(doc(database, "coders", auth.currentUser.uid), {
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

        const taskRef = doc(database, "taskSolved", auth.currentUser.uid)
        await setDoc(taskRef, {})

        const submissionsRef = doc(database, "submissions", auth.currentUser.uid)
        await setDoc(submissionsRef, {})

        const storageRef = ref(storage, auth.currentUser.uid + ".png");
        await uploadatabaseytes(storageRef)
    }

    const setCreateQuestion = async (detailsUser, code) => {
        const categories = doc(database, "categories", detailsUser.topic)
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

    const taskSolved = async (nameQuestion, topic, difficultQuestion, status, code) => {
        const taskRef = doc(database, "taskSolved", auth.currentUser.uid)
        const timestamp = serverTimestamp()
        await updateDoc(taskRef, {
            [nameQuestion]: ({
                completed: status,
                topic: topic,
                difficultQuestion: difficultQuestion,
                date: timestamp,
            }),
            [difficultQuestion + "Submissions"]: increment(1)
        })
        const submissionsRef = doc(database, "submissions", auth.currentUser.uid)
        await updateDoc(submissionsRef, {
            [nameQuestion]: arrayUnion({
                correctCode: status,
                code: code,
            })
        });
    }

    const setCreateGroup = async (groupName, selectedQuestions, groupKey) => {
        try {
            await addDoc(collection(database, "groups"), {
                name: groupName,
                questions: selectedQuestions,
                groupKey: groupKey,
                teacher: auth.currentUser.uid,
                students: arrayUnion(auth.currentUser.uid)
            });
        } catch (error) {
            console.error("Erro ao criar o grupo:", error);
        }
    }

    return (
        <SetContext.Provider
            value={{
                setPictureUser,
                setRegisterUser,
                setCreateQuestion,
                taskSolved,
                setCreateGroup
            }}
        >
            {children}
        </SetContext.Provider>
    );
}
