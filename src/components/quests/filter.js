import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";

export default function Filter() {
    
    return(
        <Box className="p-2 border rounded border-gray-500">
            <div className="flex flex-col border-b border-gray-500 px-4 py-3">
            <Typography
                color="primary.light"
                gutterBottom
                variant="h6"
                >
                Condição
                </Typography>
                <FormControlLabel
                control={<Checkbox />}
                label="Resolvido"
                />
                <FormControlLabel
                control={<Checkbox />}
                label="Não Resolvido"
                />           
            </div>
            <div className="flex flex-col pt-5 px-4 pb-2">
            <Typography
                color="primary.light"
                gutterBottom
                variant="h6"
            >
            Dificuldade
            </Typography>
            <FormControlLabel
                control={<Checkbox />}
                label="Iniciante"
            />  
            <FormControlLabel
                control={<Checkbox />}
                label="Fácil"
            />  
            <FormControlLabel
                control={<Checkbox />}
                label="Médio"
            />   
            <FormControlLabel
                control={<Checkbox />}
                label="Difícil"
            />  
            <FormControlLabel
                control={<Checkbox />}
                label="Expert"
            />  
            </div>
        </Box>
    )
}