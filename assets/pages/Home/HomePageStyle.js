import {makeStyles} from "@material-ui/core";
const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    right: {
        [theme.breakpoints.down("xs")]: {
            justifyContent: "center"
        },
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        height: "100%"

    },
    item: {
        margin: theme.spacing(0, 1, 0, 1)
    },
    badge: {
        color: "white"
    },
    button: {
        color: "white"
    },
    componentContent: {
        margin: theme.spacing(9, 1, 0, 1),
        height: "88vh",
        width: "100%",
    },
    list: {
        color: "#424242",
        textDecoration: "none"
    }
}));

export {
    useStyles
}