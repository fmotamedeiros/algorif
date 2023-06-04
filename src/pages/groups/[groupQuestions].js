import { useEffect, useState } from "react";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../contexts/auth-context";
import { Box, Divider } from "@mui/material";
import Link from "next/link";
import { GetQuestionsByGroupName, GetTaskSolved } from "../../requestsFirebase/allGetRequests";
import { Loader } from "../../requestsFirebase/loader";
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from "next/router";
import { DashboardLayout } from "../../components/dashboard-layout";

const GroupsQuestions = () => {
    const router = useRouter()
    const [questions, setQuestions] = useState([]);
    const [taskSolved, setTaskSolved] = useState(null)

    const groupName = router.query.groupQuestions;

    GetTaskSolved(setTaskSolved);

    GetQuestionsByGroupName(groupName, setQuestions);

    if (!questions && !taskSolved) { return <Loader /> }

    return (
        <div className="flex-1 items-center justify-center w-full max-w-6xl px-[5%] mx-auto">
            <Box className="pt-5">
                <div className="border border-gray-500 p-4 mb-3 w-full rounded flex justify-between items-center">
                    <div className="text-2xl font-bold">Tarefas</div>
                    <div>Turma: {groupName}</div>
                </div>
                {questions.map((question, i) => {
                    const solved = false;
                    return (
                        <Link href={`/tasks/${question.topic}/${question.title}`}
                            key={`${question.title}-${i}`}>
                            <div className="pb-3">
                                <Box className="group">
                                    <button className="p-4 border mb-3 border-gray-500 group-hover:border-green-500 w-full rounded">
                                        <Box className="font-semibold">
                                            <Box className="p-2">
                                                <div className="group-hover:text-green-500 flex text-[20px]">
                                                    {question.title}
                                                </div>
                                                <div className="text-[16px] flex">
                                                    <div className="flex">
                                                        <div>Nível:&nbsp;</div>
                                                        <div className="text-green-500">{question.difficulty}</div>
                                                    </div>
                                                    {/* <div>
                                                        , Taxa de Acerto: {question.successRate}
                                                    </div> */}
                                                </div>
                                            </Box>
                                        </Box>
                                        <Box className="font-semibold block lg:justify-between lg:flex lg:items-center w-full">
                                            <Box className="text-left text-gray-400 p-2 lg:w-[60%]">
                                                {question.description}
                                            </Box>
                                            {
                                                taskSolved &&
                                                Object.entries(taskSolved)?.map(([key, value]) => {
                                                    if (question.title === key && value["completed"] == true) {
                                                        solved = true
                                                    }
                                                })
                                            }
                                            {solved ?
                                                <Box
                                                    className="p-3 m-2 lg:m-0 border border-green-500 bg-[#111827]  text-gray-300 group-hover:text-[#1F2937] rounded-lg lg:w-[20%]">
                                                    <CheckIcon color="primary" />
                                                </Box>
                                                :
                                                <Box className="p-3 m-2 lg:m-0 border border-gray-300 bg-[#111827] group-hover:bg-green-500 group-hover:border-green-500 text-gray-300 group-hover:text-[#1F2937] rounded-lg lg:w-[20%] ">
                                                    Resolver Desafio
                                                </Box>
                                            }
                                        </Box>
                                    </button>
                                </Box>
                            </div>
                        </Link>
                    )
                })}
            </Box>
        </div>
    );
};

GroupsQuestions.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default GroupsQuestions;
