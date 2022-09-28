import { Box, Typography } from "@mui/material";


export const Description = (props) => {
    return(
    <div className="w-full flex-1 p-4 md:overflow-y-scroll">
        <Box className="font-semibold leading-8 text-white">Tarefa</Box>
        <Typography lineHeight={2}>{props.descricao}</Typography>

        <Box className="font-semibold leading-8 text-white">Exemplo</Box>
        <Typography lineHeight={2}>
            a = 3<br/>
            b = 5<br/>
            • O resultado da divisão inteira 3//5 = 0.<br/>
            • O resultado da divisão float é 3/5 = 0.6.<br/>
            Imprimir:
            <div className="border border-[#1F2937] p-2 bg-[#1F2937] mb-2">
                0<br/>
                0.6
            </div>
        </Typography>

        <Box className="font-semibold leading-8 text-white">Formato de Entrada</Box>
        <Typography lineHeight={2}>
            A primeira linha contém o primeiro inteiro, a.<br/>
            A segunda linha contém o segundo inteiro, b.
        </Typography>

        <Box className="font-semibold leading-8 text-white">Formato de Saída</Box>
        <Typography lineHeight={2}>
            Imprima as duas linhas conforme descrito acima.  
        </Typography>

        <Box className="font-semibold leading-8 text-white">Entrada de Amostra 0</Box>
            <div className="border border-[#1F2937] p-2 bg-[#1F2937] mb-2">
                4<br/>
                3
            </div>
                
        <Box className="font-semibold leading-8 text-white">Entrada de Amostra 0</Box>
            <div className="border border-[#1F2937] p-2 bg-[#1F2937] mb-2">
                1<br/>
                1.33333333333
            </div>
    </div>
    )
}

export default Description;