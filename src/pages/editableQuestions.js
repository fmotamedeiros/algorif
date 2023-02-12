import { Box } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import { GetDatasQuestion } from "../requestsFirebase/allGetRequests";
import { Loader } from "../requestsFirebase/loader";

const EditableQuestions = () => {
    const [createdQuestions, setCreatedQuestions] = useState(null)
    GetDatasQuestion(setCreatedQuestions)

    if (!createdQuestions) {
        return <> <Loader /> </>
    }

    return (
        <div className="flex-1 items-center justify-center w-full max-w-6xl px-[5%] mx-auto">
            <Box className="pt-5">
                {createdQuestions.map((question, i) => {
                    return (
                        <Link href={`/editQuestions/${question.title}`}
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
                                                    <div>
                                                        , Taxa de Acerto: {question.successRate}
                                                    </div>
                                                </div>
                                            </Box>
                                        </Box>
                                        <Box className="fonsuccess rate-semibold block lg:justify-between lg:flex lg:items-center w-full">
                                            <Box className="text-left text-gray-400 p-2 lg:w-[60%]">
                                                {question.description}
                                            </Box>
                                            <Box className="p-3 m-2 lg:m-0 border border-gray-300 bg-[#111827] group-hover:bg-green-500 group-hover:border-green-500 text-gray-300 group-hover:text-[#1F2937] rounded-lg lg:w-[20%] ">
                                                Editar Questão
                                            </Box>
                                        </Box>
                                    </button>
                                </Box>
                            </div>
                        </Link>
                    )
                })}
            </Box>
        </div>
    )
}

EditableQuestions.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default EditableQuestions