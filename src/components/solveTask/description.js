import { TextField, Grid } from "@mui/material"

const Description = ({ descriptionData }) => {
    return (

        <>
            <TextField
                fullWidth
                multiline
                disabled
                value={descriptionData.detailedDescription}
            />

            <Grid container spacing={2} mt={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        multiline
                        disabled
                        label="Valor da Entrada"
                        value={descriptionData.test[0].input}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        multiline
                        disabled
                        label="Valor da Saída"
                        value={descriptionData.test[0].output}
                    />
                </Grid>
            </Grid>
        </>

    )
}

export default Description