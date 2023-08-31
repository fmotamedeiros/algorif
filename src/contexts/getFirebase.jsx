import { createContext } from "react";
import { storage, database } from "../services/firebase";
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { auth } from "../services/firebase";


export const GetContext = createContext({ undefined });

export const GetProvider = ({ children }) => {
    const getUserDetails = async () => {
        const ref = doc(database, "coders", auth.currentUser.uid);
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
        const allTopics = collection(database, "categories");
        const q = query(allTopics);
        const topics = []
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            topics.push(doc.id);
            setTopics(topics)
        })
    }

    const getQuestions = async (topic) => {
        const ref = doc(database, "categories", topic);
        const data = await getDoc(ref)
        const questions = data.data()
        return questions;
    }

    const getDescription = async (setDescriptionData, nameQuestion) => {
        const ref = collection(database, "categories");
        try {
            const querySnapshot = await getDocs(ref);
            let questionFound = false;
            querySnapshot.forEach((doc) => {
                const { questions } = doc.data();
                for (let i = 0; i < questions.length; i++) {
                    const { title } = questions[i];
                    if (title === nameQuestion) {
                        setDescriptionData(questions[i]);
                        questionFound = true;
                        break;
                    }
                }
            });
            if (!questionFound) {
                console.error(`Questão "${nameQuestion}" não encontrada.`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getRanking = async (setRanking) => {
        const rankingRef = collection(database, "coders");
        const q = query(rankingRef, orderBy("score", "desc"), where("score", ">", 0))
        const ranking = []
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            ranking.push(doc.data());
            setRanking(ranking)
        })
    }

    const getTaskSolved = async () => {
        const taskRef = doc(database, "taskSolved", auth.currentUser.uid);

        const data = await getDoc(taskRef)
        const tasksSolved = data.data()
        return tasksSolved;
    }

    const getTasksWeekend = async (setAnsweredQuestions) => {
        const taskDoc = await getTaskSolved();
        const tasksSolved = taskDoc || {};

        const taskSolvedArray = Object.entries(tasksSolved)?.map(([title, task]) => ({
            ...task,
        })) || [];

        dayjs.extend(isBetween);

        const completedTasks = taskSolvedArray.filter((task) => task.completed);

        const tasksByDate = completedTasks.reduce((accumulator, { date }) => {
            const taskDate = dayjs(date.toDate()).format('YYYY-MM-DD');
            if (accumulator[taskDate]) {
                accumulator[taskDate]++;
            } else {
                accumulator[taskDate] = 1;
            }
            return accumulator;
        }, {});

        const sortedDates = Object.keys(tasksByDate).sort((a, b) => {
            const dateA = dayjs(a, 'YYYY-MM-DD');
            const dateB = dayjs(b, 'YYYY-MM-DD');
            return dateA - dateB;
        });

        const last7Dates = sortedDates.slice(-10);

        const formattedDates = last7Dates.map(date => dayjs(date, 'YYYY-MM-DD').format('DD/MM/YYYY')); // Formatando as datas para 'DD/MM/YYYY'

        const dataBar = {
            datasets: [
                {
                    backgroundColor: '#22c55e',
                    barPercentage: 1,
                    barThickness: 10,
                    borderRadius: 2,
                    categoryPercentage: 1,
                    data: last7Dates.map(date => tasksByDate[date] || 0),
                    label: 'Desafios Completados',
                    maxBarThickness: 10
                },
            ],
            labels: formattedDates // Novo array com as datas formatadas como labels
        };
        setAnsweredQuestions(dataBar);
    };

    const getDifficultRate = async (setBarData) => {
        const rankingRef = doc(database, "taskSolved", auth.currentUser.uid)

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
        const rankingRef = doc(database, "taskSolved", auth.currentUser.uid)
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
            if (taskData.hasOwnProperty(key) && taskData[key].topic && taskData[key]["completed"] == true) {
                if (!topicTask[taskData[key].topic]) topicTask[taskData[key].topic] = { correct: 0 };
                topicTask[taskData[key].topic].correct++;
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

    const getAllQuestions = async () => {
        const ref = collection(database, "categories");
        const snapshot = await getDocs(ref);
        const questions = [];

        snapshot.forEach((doc) => {
            const categoryQuestions = doc.data().questions;
            categoryQuestions.forEach((question) => {
                questions.push(question);
            });
        });

        return questions;
    };

    const getUnansweredQuestions = async (setUnansweredQuestions) => {
        const questions = await getAllQuestions();
        const taskDoc = await getTaskSolved();
        const tasksSolved = taskDoc || {};

        const sortedQuestions = questions.sort((a, b) => {
            const levels = ["Iniciante", "Fácil", "Médio", "Difícil", "Expert"];
            const aLevel = levels.indexOf(a.difficulty);
            const bLevel = levels.indexOf(b.difficulty);
            return aLevel - bLevel;
        });

        let unansweredQuestions = [];
        let unansweredCount = 0;

        const taskSolvedArray = Object.entries(tasksSolved).map(([title, task]) => ({ title, completed: task.completed }));

        for (let i = 0; i < sortedQuestions.length; i++) {
            const question = sortedQuestions[i];
            const task = taskSolvedArray.find(task => task.title === question.title);
            if (!task || !task.completed) {
                unansweredQuestions.push(question);
                unansweredCount++;
                if (unansweredCount === 4) {
                    break;
                }
            }
        }

        const unansweredQuestionsWithLimitedData = unansweredQuestions.map((question) => ({
            title: question.title,
            description: question.description,
            topic: question.topic,
            difficulty: question.difficulty
        }));
        setUnansweredQuestions(unansweredQuestionsWithLimitedData);
    };

    const getUserGroups = async (setUserGroups) => {
        try {
            const user = auth.currentUser.uid
            const groupsRef = collection(database, "groups");
            const q = query(groupsRef, where("students", "array-contains", user));
            const querySnapshot = await getDocs(q);

            const groups = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setUserGroups(groups);
        } catch (error) {
            console.error("Erro ao obter os grupos do usuário:", error);
        }
    }

    const getQuestionsByGroupName = async (groupName, setQuestions) => {
        try {
            const groupsRef = collection(database, "groups");
            const q = query(groupsRef, where("name", "==", groupName));
            const querySnapshot = await getDocs(q);

            const questions = [];
            querySnapshot.forEach((doc) => {
                const category = doc.data();
                const categoryQuestions = category.questions || [];

                questions.push(...categoryQuestions);
            });
            setQuestions(questions);
        } catch (error) {
            console.log(error)
        }
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
                getTasksWeekend,
                getAllQuestions,
                getUnansweredQuestions,
                getUserGroups,
                getQuestionsByGroupName,
            }}
        >
            {children}
        </GetContext.Provider>
    );
}
