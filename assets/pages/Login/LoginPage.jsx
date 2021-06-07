import React, {useContext, useState} from "react";
import {Avatar, Button, CssBaseline, Grid, Paper, TextField, ThemeProvider, Typography} from "@material-ui/core";
import {LockOutlined} from "@material-ui/icons";
import {useStyles} from "./LoginPageStyles"
import AuthAPI from "../../services/AuthAPI";
import AuthContext from "../../Datashare/AuthContext";
import Customtheme from "../../styles/ThemeOverride";


const LoginPage = ({history}) => {
    const classes = useStyles();
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const {setIsAuthenticated} = useContext(AuthContext);
    //Gestion des champs
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCredentials({...credentials, [name]: value})
    }
    const [errorCheck, setErrorCheck] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await AuthAPI.authenticate(credentials)
            setIsAuthenticated(true)
            history.replace("/home")

        } catch (error) {
            setErrorCheck(true)
        }

    }

    return (
        <ThemeProvider theme={Customtheme}>
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid container justify="center" className={classes.itemContainer}>
                    <Grid
                        item
                        xs={12}
                        sm={7}
                        md={4}
                        component={Paper}
                        // direction="row"
                        elevation={6}
                        square
                    >
                        <Grid className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlined/>
                            </Avatar>
                            <Typography component="h1" variant="h5" color="primary">
                                Connexion
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                                <TextField
                                    error={errorCheck}
                                    helperText="adresse email ou mot de passe incorrect"
                                    name="username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    placeholder=" Adresse Email"
                                    autoComplete="email"
                                    autoFocus
                                    color="secondary"
                                    InputProps={{
                                        className: classes.input
                                    }}
                                />
                                <TextField
                                    error={errorCheck}
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    placeholder="Mot de passe"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    color="secondary"
                                    InputProps={{
                                        className: classes.input
                                    }}
                                />

                                <Button
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    type="submit"

                                >
                                    Se connecter
                                </Button>


                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>

    )

}

export default LoginPage;