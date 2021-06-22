import React, { useContext, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import {
  Button,
  Paper,
  ThemeProvider,
  Avatar,
  Typography,
  Chip,
} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import AuthAPI from "../../services/AuthAPI";
import AuthContext from "../../Datashare/AuthContext";
import { useStyles } from "./HomeComponentStyle";
import UserComponent from "../../components/User/UserComponent";
import { HashRouter, Switch, NavLink } from "react-router-dom";
import {
  AccountCircleOutlined,
  MailOutlined,
  NotificationsOutlined,
  PeopleOutline,
  AssignmentIndOutlined,
} from "@material-ui/icons";
import Customtheme from "../../styles/ThemeOverride";
import ProfilComponent from "../../components/Profil/ProfilComponent";
import ProtectedRoute from "../ProtectedRoute";
import jwtDecode from "jwt-decode";

const HomeComponent = (props) => {
  const {
    roles: profil,
    firstName: prenom,
    lastName: nom,
  } = jwtDecode(window.localStorage.getItem("authToken"));
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext);

  const handleLogOut = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    props.history.push("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.profil}>
        <div className={classes.avatar}>
          <Avatar variant="circular" />
        </div>
        <div className={classes.name}>
          <Chip color="primary" variant="default" label={`${prenom} ${nom}`} />
        </div>
      </div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button color="primary">
          <ListItemIcon>
            <PeopleOutline color="primary" />
          </ListItemIcon>
          <NavLink className={classes.list} to="/home/user">
            {" "}
            <ListItemText primary="Utilisateurs" />
          </NavLink>
        </ListItem>
        <ListItem button color="primary">
          <ListItemIcon>
            <AssignmentIndOutlined color="primary" />
          </ListItemIcon>
          <NavLink className={classes.list} to="/home/profil">
            {" "}
            <ListItemText primary="Profils" />
          </NavLink>
        </ListItem>
      </List>
    </div>
  );

  const container =
    props.window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <ThemeProvider theme={Customtheme}>
        <div className={classes.root}>
          <CssBaseline />

          <AppBar position="fixed" className={classes.appBar} color="primary">
            <Toolbar color="primary">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <div className={classes.right}>
                <div className={classes.item}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                  >
                    <Badge
                      badgeContent={7}
                      color="secondary"
                      classes={{ badge: classes.badge }}
                    >
                      <MailOutlined />
                    </Badge>
                  </IconButton>
                </div>
                <div className={classes.item}>
                  <IconButton
                    color="inherit"
                    aria-label="show 17 new notifications"
                    edge="end"
                  >
                    <Badge
                      badgeContent={11}
                      color="secondary"
                      classes={{ badge: classes.badge }}
                    >
                      <NotificationsOutlined />
                    </Badge>
                  </IconButton>
                </div>
                <div className={classes.item}>
                  <IconButton color="inherit">
                    <AccountCircleOutlined />
                  </IconButton>
                </div>
                <div className={classes.item}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={handleLogOut}
                    disableElevation
                  >
                    Deconnexion
                  </Button>
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
                anchor={Customtheme.direction === "rtl" ? "right" : "left"}
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
                <ProtectedRoute
                  path="/home/user"
                  isAuthenticated={isAuthenticated}
                  profil={profil}
                  acceptedProfil="ROLE_ADMIN"
                  component={UserComponent}
                />
                <ProtectedRoute
                  path="/home/profil"
                  isAuthenticated={isAuthenticated}
                  profil={profil}
                  acceptedProfil="ROLE_ADMIN"
                  component={ProfilComponent}
                />
              </Switch>
            </HashRouter>
          </Paper>
        </div>
      </ThemeProvider>
    </>
  );
};

export default HomeComponent;
