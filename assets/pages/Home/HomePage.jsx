import React, {useContext, useState} from "react";
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
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import {Button, Paper, ThemeProvider} from "@material-ui/core";
import Badge from '@material-ui/core/Badge';
import AuthAPI from "../../services/AuthAPI";
import AuthContext from "../../Datashare/AuthContext";
import {useStyles} from "../../pages/Home/HomePageStyle";
import UserPage from "../User/UserPage";
import {HashRouter, Route, Switch, NavLink, Redirect, Link} from "react-router-dom"
import {AccountCircleOutlined, Dashboard, MailOutlined, NotificationsOutlined, PeopleOutline} from "@material-ui/icons";
import Customtheme from "../../styles/ThemeOverride";


const HomePage = ({history, window}) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);


    const {setIsAuthenticated} = useContext(AuthContext);

    const handleLogOut = () => {
        AuthAPI.logout()
        setIsAuthenticated(false);
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
                    <ListItem  button color="primary" >
                        <ListItemIcon>
                            <PeopleOutline color="primary"/>
                        </ListItemIcon>
                        <NavLink className={classes.list} to="/home/user"> <ListItemText primary="Utilisateurs"/></NavLink>
                        {/*<ListItemText primary="Utilisateurs"/>*/}


                    </ListItem>

            </List>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <ThemeProvider theme={Customtheme}>
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
                                            <MailOutlined/>
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
                                               classes={{badge: classes.badge}}><NotificationsOutlined/></Badge>

                                    </IconButton>
                                </div>
                                <div className={classes.item}>
                                    <IconButton color="inherit">
                                        <AccountCircleOutlined/>
                                    </IconButton>
                                </div>
                                <div className={classes.item}>
                                    <Button className={classes.button} variant="contained" color="secondary"
                                            onClick={handleLogOut} disableElevation>Deconnexion</Button>
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
                                anchor={Customtheme.direction === 'rtl' ? 'right' : 'left'}
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
                    <Paper className={classes.componentContent} elevation={10}>
                        <HashRouter>
                            <Switch>
                                <Route path="/home/user" component={UserPage}/>
                            </Switch>
                        </HashRouter>
                    </Paper>


                </div>
            </ThemeProvider>

        </>
    )
}

export default HomePage;
