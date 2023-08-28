import { CategorieService } from "../../services/categorie";

// const getNavTopics = await CategorieService.getAll()
// const nav = []

// navTopics.forEach((topic) => {
//     nav.push({ label: topic })
// })

// console.log(nav)

export const getNavTopics = async () => {
    const topics = await CategorieService.getAll()
    const navTopics = []

    topics.forEach((topic) => {
        navTopics.push({ label: topic })
    })

    return navTopics
}



// export const getNavTopics = () => {
//     const navTopics = [
//         {
//             label: ''
//         },
//         {

//             label: 'Array'
//         },
//         {

//             label: 'Array bidimensional'
//         },
//         {

//             label: 'Decisão'
//         },
//         {

//             label: 'Entrada e Saída'
//         },
//         {

//             label: 'Formatação'
//         },
//         {
//             label: 'Geometria computacional'
//         },
//         {

//             label: 'Geral'
//         },
//         {

//             label: 'Laço de repetição'
//         },
//         {

//             label: 'Lógica matemática'
//         },
//         {

//             label: 'Recursão'
//         },
//         {

//             label: 'String'
//         },
//         {

//             label: 'Variáveis'
//         }
//     ];
//     return navTopics
// }
