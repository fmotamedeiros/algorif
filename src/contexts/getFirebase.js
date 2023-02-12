import { createContext } from "react";
import { auth, db, storage } from "./auth-context";
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export const GetContext = createContext({ undefined });


export const GetProvider = ({ children }) => {
    const getUserDetails = async () => {
        const ref = doc(db, "coders", auth.currentUser.uid);
        const data = await getDoc(ref)

        return data.data();
    }

    const getPictureUser = async (setImgURL) => {
        if (auth.currentUser) {
            getDownloadURL(ref(storage, auth.currentUser.uid + ".png"))
                .then((url) => {
                    setImgURL(url)
                })
        }
    }

    const getTopics = async (setTopics) => {
        const allTopics = collection(db, "categories");
        const q = query(allTopics);
        const topics = []
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            topics.push(doc.id);
            setTopics(topics)
        })
    }

    const getQuestions = async (topic) => {
        const ref = doc(db, "categories", topic);
        const data = await getDoc(ref)
        const questions = data.data()
        return questions;
    }

    const getDescription = async (setDescriptionData, nameQuestion) => {
        const ref = collection(db, "categories");
        const querySnapshot = await getDocs(ref);
        let questionFound = false;

        querySnapshot.forEach((doc) => {
            const topic = doc.data();
            const questions = topic.questions;
            for (let i = 0; i < questions.length; i++) {
                const question = questions[i];
                if (question.titulo === nameQuestion) {
                    setDescriptionData(question);
                    questionFound = true;
                    break;
                }
            }
        });
        if (!questionFound) {
            console.error(`Questão "${nameQuestion}" não encontrada.`);
        }
    };

    const getRanking = async (setRanking) => {
        const rankingRef = collection(db, "coders");
        const q = query(rankingRef, orderBy("score", "desc"), where("score", ">", 0))
        const ranking = []
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            ranking.push(doc.data());
            setRanking(ranking)
        })
    }

    const getTaskSolved = async () => {
        const taskRef = doc(db, "taskSolved", auth.currentUser.uid);

        const data = await getDoc(taskRef)
        const tasksSolved = data.data()
        return tasksSolved;
    }

    // const getTasksWeekend = async () => {
    //     const rankingRef = collection(db, "taskSolved", auth.currentUser.uid, "raiz");

    //     const currentDate = dayjs();
    //     const startOfWeek = currentDate.startOf('week');
    //     const endOfWeek = currentDate.endOf('week');

    //     const q = query(rankingRef,
    //         where("date", ">=", startOfWeek.toDate()),
    //         where("date", "<=", endOfWeek.toDate()),
    //         where("completed", "==", true),
    //     )
    //     const querySnapshot = await getDocs(q);

    //     console.log(querySnapshot)
    // }

    const getDifficultRate = async (setBarData) => {
        const rankingRef = doc(db, "taskSolved", auth.currentUser.uid)

        const data = await getDoc(rankingRef)
        const taskData = data.data();
        const percentage = []
        const topics = []

        let difficultQuestions = {
            'Iniciante': { total: 0, correct: 0 },
            'Fácil': { total: 0, correct: 0 },
            'Médio': { total: 0, correct: 0 },
            'Difícil': { total: 0, correct: 0 },
            'Expert': { total: 0, correct: 0 }
        };

        for (let key in taskData) {
            if (taskData.hasOwnProperty(key) && taskData[key].difficultQuestion && taskData[key]["completed"] == true) {
                difficultQuestions[taskData[key].difficultQuestion].total++;
                difficultQuestions[taskData[key].difficultQuestion].correct++;
            } else if (taskData.hasOwnProperty(key) && taskData[key].difficultQuestion) {
                difficultQuestions[taskData[key].difficultQuestion].total++;
            }
        }

        for (let key in difficultQuestions) {
            difficultQuestions[key].percentage = (difficultQuestions[key].correct / taskData[key + "Submissions"]) * 100;
            percentage.push(difficultQuestions[key].percentage)
            topics.push(key)
        }

        const dataBar = {
            datasets: [
                {
                    borderRadius: 4,
                    backgroundColor: ['rgba(0, 230, 0, 1)', 'rgba(0, 200, 0, 1)', 'rgba(0, 170, 0, 1)', 'rgba(0, 140, 0, 1)', 'rgba(0, 110, 0, 1)'],
                    borderColor: ['rgba(0, 230, 0, 0.7)', 'rgba(0, 200, 0, 0.7)', 'rgba(0, 170, 0, 0.7)', 'rgba(0, 140, 0, 0.7)', 'rgba(0, 110, 0, 0.7)'],
                    borderWidth: 1,
                    barThickness: 20,
                    label: 'Taxa de Acerto %',
                    hoverBackgroundColor: ['rgba(0, 230, 0, 0.5)', 'rgba(0, 200, 0, 0.5)', 'rgba(0, 170, 0, 0.5)', 'rgba(0, 140, 0, 0.5)', 'rgba(0, 110, 0, 0.5)'],
                    hoverBorderColor: ['rgba(0, 230, 0, 0.8)', 'rgba(0, 200, 0, 0.8)', 'rgba(0, 170, 0, 0.8)', 'rgba(0, 140, 0, 0.8)', 'rgba(0, 110, 0, 0.8)'],
                    data: percentage.map(p => Math.round(p))
                },
            ],
            labels: topics,
        };

        return setBarData(dataBar)
    }

    const getTasksTopic = async (setChartData) => {
        const rankingRef = doc(db, "taskSolved", auth.currentUser.uid)
        const data = await getDoc(rankingRef)
        const taskData = data.data();
        const percentage = []
        const topics = []

        let total = 0;
        let topicTask = {};

        const colors = {
            "Array": "#00e378",
            "Array bidimensional": "#00e33d",
            "Decisão": "#00e3a0",
            "Entrada e Saída": "#70e300",
            "Formatação": "#a3e300",
            "Geometria computacional": "#18ae71",
            "Geral": "#a8e361",
            "Laço de repetição": "#b6e388",
            "Lógica matemática": "#b6e3af",
            "Recursão": "#5db500",
            "String": "#608f65",
            "Variáveis": "#80b50f",
        };

        const randomColor = () => {
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            return "rgb(" + r + ", " + g + ", " + b + ")";
        }

        for (let key in taskData) {
            if (taskData.hasOwnProperty(key) && taskData[key].topico && taskData[key]["completed"] == true) {
                if (!topicTask[taskData[key].topico]) topicTask[taskData[key].topico] = { correct: 0 };
                topicTask[taskData[key].topico].correct++;
                total++;
            }
        }

        for (let key in topicTask) {
            percentage.push(
                (topicTask[key].correct / total) * 100
            );
            topics.push(
                key
            );
        }

        const chartData = {
            datasets: [
                {
                    data: percentage.map(p => Math.round(p)),
                    backgroundColor: topics.map(topic => colors[topic] || randomColor()),
                    borderWidth: 4,
                    cutout: 60,
                    borderColor: '#1F2937',
                    hoverBorderColor: '#111827',
                    hoverOffset: 10,
                }
            ],

            labels: topics,
        };
        return setChartData(chartData);
    }

    const getCreatedQuestions = async (setCreatedQuestions) => {
        const createdQuestions = collection(db, "categories");
        const q = query(createdQuestions)
        const questions = []
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            doc.data().questions.forEach(question => {
                if (question.creator === auth.currentUser.uid) {
                    questions.push(question);
                }
            });
            setCreatedQuestions(questions);
        });
    };


    return (
        <GetContext.Provider
            value={{
                getUserDetails,
                getPictureUser,
                getTopics,
                getQuestions,
                getDescription,
                getRanking,
                getTaskSolved,
                getDifficultRate,
                getTasksTopic,
                getCreatedQuestions,
                //getTasksWeekend,
            }}
        >
            {children}
        </GetContext.Provider>
    );
}
