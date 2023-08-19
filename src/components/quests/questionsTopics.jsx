import { Card, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AllTopics } from '../../requestsFirebase/allGetRequests';
import { Loader } from '../../requestsFirebase/loader';
import { Box } from '@mui/system';
import { CategorieService } from '../../services/categorie';

export const QuestionsTopics = () => {
    const [categories, setCategories] = useState([]);

    
    useEffect(() => {
        const getTopics = async () => {
            const data = await CategorieService.getAll();
            setCategories(data);
        }
        getTopics();
    }, []);

    return (
        <Card>
            <CardContent>
                <Grid
                    container
                    width="100%"
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Typography
                        sx={{ pb: 3 }}
                        color="textPrimary"
                        variant="h6"
                    >
                        Selecione um Tópico
                    </Typography>
                </Grid>

                {categories ?
                    <Grid className='sm:grid-cols-2 grid-cols-1'
                        sx={{ display: 'grid', justifyContent: 'space-between', gap: 1 }}
                        width="100%"
                    >
                        {categories.map((categorie, i) => (
                            <button key={`${categorie}-${i}`}>
                                <Link href={`/tasks/${categorie}`}>
                                    <Typography className='border p-3 border-gray-500 hover:border-green-500'  >
                                        {categorie}
                                    </Typography>
                                </Link>
                            </button>
                        ))}
                    </Grid>
                    : <Loader />
                }
            </CardContent>
        </Card>
    )
}