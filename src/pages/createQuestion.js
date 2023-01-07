import dynamic from 'next/dynamic';
import Head from 'next/head';
import { DashboardLayout } from '../components/dashboard-layout';

const dificuldades = [
    {
        value: '',
        label: ''
    },
    {
        label: 'Iniciante'
    },
    {
        label: 'Fácil'
    },
    {
        label: 'Médio'
    },
    {
        label: 'Difícil'
    },
    {
        label: 'Expert'
    }
];

const topicos = [
    {
        label: ''
    },
    {

        label: 'Array'
    },
    {

        label: 'Array bidimensional'
    },
    {

        label: 'Decisão'
    },
    {

        label: 'Entrada e Saída'
    },
    {

        label: 'Formatação'
    },
    {
        label: 'Geometria computacional'
    },
    {

        label: 'Geral'
    },
    {

        label: 'Laço de repetição'
    },
    {

        label: 'Lógica matemática'
    },
    {

        label: 'Recursão'
    },
    {

        label: 'String'
    },
    {

        label: 'Variáveis'
    }
];

const DatasQuestion = dynamic(import('../components/createQuestion/datasQuestion'), { ssr: false })

const CreateQuestion = () => {
    return(
    <>
        <Head>
            <title>
                Create Question
            </title>
        </Head>
        <DatasQuestion />
    </>
    )
};

CreateQuestion.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default CreateQuestion;