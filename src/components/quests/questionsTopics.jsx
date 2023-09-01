import { Card, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Loader } from '../loader'; 
import { CategoryService } from '../../services/categories';

export const QuestionsTopics = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getCategories = async () => {
        setIsLoading(true);
        const data = await CategoryService.getAll();
        setCategories(data);
        setIsLoading(false);
    }

    useEffect(() => { getCategories(); }, []);


    if (isLoading) return (
        <Card>
            <CardContent>
                <Loader/>
            </CardContent>
        </Card>
    );

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
