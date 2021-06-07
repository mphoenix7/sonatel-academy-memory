import React from "react";
import {useStyles} from "./UsersManagerStyles";
import {Button, Dialog, DialogActions, DialogContent, IconButton, TextField, ThemeProvider} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import Customtheme from "../../styles/ThemeOverride";


const UsersManagerComponent = ({handleClose, open}) => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={Customtheme}>

            <Dialog open={open} onClose={handleClose} disableBackdropClick fullWidth maxWidth="md">
                <div className={classes.dialogHeader}>
                    <div className={classes.closeIcon}>
                        <IconButton onClick={handleClose}>
                            <Close color="primary"/>
                        </IconButton>
                    </div>
                </div>

                <DialogContent>
                    <form noValidate>
                        <div className={classes.textFieldRow}>
                            <div className={classes.textFieldColumn}>
                                <TextField variant="outlined" placeholder="Prenom" type="text" fullWidth
                                           className={classes.item}/>
                                <TextField variant="outlined" placeholder="Nom" type="text" fullWidth
                                           className={classes.item}/>
                                <TextField error  variant="outlined" placeholder="Email" type="email" fullWidth
                                           className={classes.item}/>
                                <TextField variant="outlined" placeholder="Numero de telephone" type="text" fullWidth
                                           className={classes.item}/>
                                <TextField variant="outlined" placeholder="date de naissance" type="date" fullWidth
                                           className={classes.item} color="primary"/>
                            </div>
                            <div className={classes.textFieldColumn}>
                                <TextField variant="outlined" placeholder="enter your..." type="email" fullWidth
                                           className={classes.item}/>
                                <TextField variant="outlined" placeholder="enter your..." type="email" fullWidth
                                           className={classes.item}/>
                                <TextField variant="outlined" placeholder="enter your..." type="email" fullWidth
                                           className={classes.item}/>
                                <TextField variant="outlined" placeholder="enter your..." type="email" fullWidth
                                           className={classes.item}/>
                                <TextField variant="outlined" placeholder="enter your..." type="email" fullWidth
                                           className={classes.item}/>
                            </div>
                        </div>

                    </form>
                </DialogContent>
                <DialogActions>
                    <div className={classes.dialogActions}>
                        <Button variant="contained" color="primary" classes={classes.button}>Creer utilisateur</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    )

}

export default UsersManagerComponent

