import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { Loader } from '../../requestsFirebase/loader';
import { useState } from 'react';
import { GetQuestionsSuggest } from '../../requestsFirebase/allGetRequests';
import { QuestionService } from '../../services/question';
import { useEffect } from 'react';

export const QuestionsSuggest = () => {
    const [unansweredQuestions, setUnansweredQuestions] = useState([]);

    useEffect(() => {
        const getSuggestions = async () => {

        }
    }, []);

    return (
        <Card>
            <CardContent>
                <Grid container width="100%" sx={{ justifyContent: 'space-between' }}>
                    <Typography sx={{ pb: 3 }} color="textPrimary" variant="h6">
                        Recomendações 
                    </Typography>
                </Grid>
                {unansweredQuestions?.length === 0 ? (
                    <div className='flex justify-center items-center h-full text-gray-500 text-xl'>Todas as questões foram respondidas</div>
                ) : (
                    <Grid
                        className="grid-cols-1"
                        sx={{ display: 'grid', justifyContent: 'space-between' }}
                        width="100%"
                    >
                        {unansweredQuestions ? (
                            unansweredQuestions.map((question, i) => {
                                return (
                                    <Link
                                        href={`/tasks/${question.topic}/${question.title}`}
                                        key={`${question.title}-${i}`}
                                    >
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
                                                                    <div className="text-green-500">
                                                                        {question.difficulty}
                                                                    </div>
                                                                </div>
                                                                {/* <div>, Taxa de Acerto: {question.successRate}</div> */}
                                                            </div>
                                                        </Box>
                                                    </Box>
                                                    <Box className="font-semibold block lg:justify-between lg:flex lg:items-center w-full">
                                                        <Box className="text-left text-gray-400 p-2 lg:w-[60%]">
                                                            {question.description}
                                                        </Box>
                                                        <Box className="p-3 m-2 lg:m-0 border border-gray-300 group-hover:bg-green-500 group-hover:border-green-500 text-gray-300 group-hover:text-[#1F2937] rounded-lg lg:w-[20%] ">
                                                            Resolver Desafio
                                                        </Box>
                                                    </Box>
                                                </button>
                                            </Box>
                                        </div>
                                    </Link>
                                );
                            })
                        ) : (
                            <Loader />
                        )}
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
};