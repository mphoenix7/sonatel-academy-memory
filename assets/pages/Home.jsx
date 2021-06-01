import React, {useState} from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import {AccountCircle, Notifications} from "@material-ui/icons"
import {makeStyles} from '@material-ui/core/styles';
import {Button, createMuiTheme, ThemeProvider} from "@material-ui/core";
import {orange, teal} from "@material-ui/core/colors";
import Badge from '@material-ui/core/Badge';
import AuthAPI from "../services/AuthAPI";

const drawerWidth = 240;

const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: orange
    }
})

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
    }
}));
const Home = ({history, window}) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleLogOut = () => {

        AuthAPI.logout()
        history.push("/")
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar}/>

            <Divider/>
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <MailIcon color="primary"/>
                    </ListItemIcon>
                    <ListItemText primary="Users"/>
                </ListItem>
            </List>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline/>

                <AppBar position="fixed" className={classes.appBar} color="primary">
                    <Toolbar color="primary">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <div className={classes.right}>
                            <div className={classes.item}>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="end"

                                >
                                    <Badge badgeContent={7} color="secondary" classes={{badge: classes.badge}}>
                                        <MailIcon/>
                                    </Badge>

                                </IconButton>
                            </div>
                            <div className={classes.item}>
                                <IconButton
                                    color="inherit"
                                    aria-label="show 17 new notifications"
                                    edge="end"

                                >
                                    <Badge badgeContent={11} color="secondary"
                                           classes={{badge: classes.badge}}><Notifications/></Badge>

                                </IconButton>
                            </div>
                            <div className={classes.item}>
                                <IconButton color="inherit">
                                    <AccountCircle/>
                                </IconButton>
                            </div>
                            <div className={classes.item}>
                                <Button variant="contained" color="secondary" onClick={handleLogOut}>Deconnexion</Button>
                            </div>
                        </div>


                    </Toolbar>
                </AppBar>

                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>

            </div>
        </ThemeProvider>

    )
}
Home.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
export default Home;
