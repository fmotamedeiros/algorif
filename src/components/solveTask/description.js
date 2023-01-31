import { TextField } from "@mui/material"

const Description = ({ description }) => {
    return (
        <TextField fullWidth multiline value={description} disabled /> 
    )
}

export default Description