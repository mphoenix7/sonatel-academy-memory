import React, {useState} from "react";
import {
    makeStyles,
    createMuiTheme,
    TextField,
    Button,
    Grid,
    Paper,
    Avatar,
    Typography,
    ThemeProvider,
    CssBaseline
} from "@material-ui/core";
import {LockOutlined} from "@material-ui/icons";
import {orange, teal} from "@material-ui/core/colors";
import AuthAPI from "../services/AuthAPI";

// Customization
const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: orange
    },

})

const useStyles = makeStyles((theme) => ({
    root: {
        height: "90vh",

    },
    itemContainer: {
        paddingTop: "40px",
        
    },
    paper: {
        margin: theme.spacing(8, 8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#009688",
        boxShadow: '0 3px 10px 3px rgba(0,150,136, .4)'
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        height: theme.spacing(6),
        borderRadius: "8px",
        background: 'linear-gradient(45deg, #009688 30%, #4db6ac 90%)',
        boxShadow: '0 3px 10px 3px rgba(0,150,136, .5)',
        color: "#FFF"
    },
    input: {
        color: "#009688",
    }
}))


const Login = ({onLogIn , history}) => {
    const classes = useStyles();
    const [credentials , setCredentials] = useState({
        username:"",
        password:""
    })
    //Gestion des champs
    const handleChange = ({currentTarget}) => {
        const {name , value} = currentTarget;
        setCredentials({...credentials, [name]:value})
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await AuthAPI.authenticate(credentials)
            onLogIn(true)
            history.replace("/home")

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid container justify="center" className={classes.itemContainer}>
                    <Grid
                        item
                        xs={12}
                        sm={7}
                        md={4}
                        component={Paper}
                        direction="row"
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
                            <form className={classes.form} noValidate  onSubmit={handleSubmit}>
                                <TextField
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

export default Login;