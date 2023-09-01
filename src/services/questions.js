import { doc, getDoc, getDocs, query, collection } from 'firebase/firestore';
import { database, auth } from './firebase';

export const QuestionService = {
    getQuestionsSuggestions: async function () {
        const questions = await this.getAll();
        const questionDoc = await this.getQuestionSolved();
        const questionsSolved = questionDoc || {};

        const sortedQuestions = questions.sort((a, b) => {
            const levels = ["Iniciante", "Fácil", "Médio", "Difícil", "Expert"];
            const aLevel = levels.indexOf(a.difficulty);
            const bLevel = levels.indexOf(b.difficulty);
            return aLevel - bLevel;
        });

        let unansweredQuestions = [];
        let unansweredCount = 0;

        const questionSolvedArray = Object.entries(questionsSolved).map(([title, task]) => ({ title, completed: task.completed }));

        for (let i = 0; i < sortedQuestions.length; i++) {
            const question = sortedQuestions[i];
            const task = questionSolvedArray.find(task => task.title === question.title);
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

        return unansweredQuestionsWithLimitedData;
    },
    getQuestionSolved: async function () {
        const questionRef = doc(database, "taskSolved", auth.currentUser.uid);
        const data = await getDoc(questionRef);
        const questionsSolved = data.data();
        return questionsSolved;
    },
    getAll: async function () {
        const ref = collection(database, "categories");
        const questionDocs = await getDocs(ref);
        const questions = [];

        questionDocs.forEach((doc) => {
            const categoryQuestions = doc.data().questions;
            categoryQuestions.forEach((question) => {
                questions.push(question);
            });
        });

        return questions;
    },

    createQuestion: async function (userDetails, code) {

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
}
