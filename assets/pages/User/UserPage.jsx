import React, {useState} from "react";
import UsersManagerComponent from "../../components/UsersManager/UsersManagerComponent";
import {theme, useStyles} from "./UserPageStyle";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    ThemeProvider
} from "@material-ui/core"
import InputAdornment from "@material-ui/core/InputAdornment";
import {PersonAddOutlined, Search} from "@material-ui/icons";

const UserPage = () => {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const users = [
        {
            "id": 1,
            "prenom": "sidy",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
        {
            "id": 1,
            "prenom": "omar",
            "nom": "diallo",
            "email": "omzard10@gmail.com",
            "classe": "dev web",
            "phoneNumber": "773662180"
        },
    ]
    return (
        <>

            <UsersManagerComponent handleOpen={handleClickOpen} handleClose={handleClose} open={open}/>
            <ThemeProvider theme={theme}>
                <div className={classes.content}>
                    <form  noValidate className={classes.form}>
                        <TextField className={classes.input} color="primary" variant="outlined" name="search"
                                   type="text"
                                   placeholder="rechercher ici" id="search" InputProps={{
                            endAdornment: <InputAdornment position="end"><Search color="primary"/></InputAdornment>
                        }}/>
                        <Button
                            startIcon={<PersonAddOutlined/>} variant="contained" color="primary" onClick={handleClickOpen}
                            className={classes.button}>Creer</Button>
                    </form>
                    <div className={classes.button}>

                    </div>

                    <TableContainer className={classes.table}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Prenom</TableCell>
                                    <TableCell>Nom</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Numero de Telephone</TableCell>
                                    <TableCell>Classe</TableCell>
                                    <TableCell>EDITION</TableCell>
                                    <TableCell>Supression</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                                    <TableRow hover key={user.id}>
                                        <TableCell>{user.prenom}</TableCell>
                                        <TableCell>{user.nom}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phoneNumber}</TableCell>
                                        <TableCell>{user.classe}</TableCell>
                                        <TableCell> <Button variant="outlined"
                                                            color="primary">Modifier</Button></TableCell>
                                        <TableCell><Button variant="outlined"
                                                           color="secondary">Supprimer</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TablePagination variant="outlined" rowsPerPageOptions={[5, 10, 15, 25]}
                                             count={users.length}
                                             onChangePage={handleChangePage} page={page} rowsPerPage={rowsPerPage}
                                             onChangeRowsPerPage={handleChangeRowsPerPage}/>
                        </Table>

                    </TableContainer>

                </div>
            </ThemeProvider>
        </>
    )
}

export default UserPage;