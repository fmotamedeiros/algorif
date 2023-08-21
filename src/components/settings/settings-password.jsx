import { useContext, useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import { UpdateContext } from '../../contexts/updateFirebase';

export const SettingsPassword = () => {
    const updateContext = useContext(UpdateContext);

    const [values, setValues] = useState({
        password: '',
        confirm: ''
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async () => {

        if (values.password == values.confirm) {
            if (values.password.length >= 6) {
                const confirmBox = window.confirm(
                    "Você realmente quer alterar sua senha?"
                )
                if (confirmBox === true) {
                    await updateContext.updatePasswordUser(values.password)
                }
            }
            else {
                alert("Senha muito curta")
            }
        } else {
            alert("As senhas não coincidem")
        }
    }

    return (
        <form>
            <Card sx={{ backgroundColor: '#1F2937' }}>
                <CardHeader
                    subheader="Update password"
                    title="Password"
                />
                <Divider />
                <CardContent>
                    <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        name="password"
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Confirm password"
                        margin="normal"
                        name="confirm"
                        onChange={handleChange}
                        type="password"
                        error={values.password != values.confirm}
                        value={values.confirm}
                        variant="outlined"
                    />
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                    >
                        Update
                    </Button>
                </Box>
            </Card>
        </form>
    );
};
