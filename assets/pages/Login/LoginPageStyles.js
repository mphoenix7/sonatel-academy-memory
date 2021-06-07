import { makeStyles} from "@material-ui/core";


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

export {
    useStyles
}

