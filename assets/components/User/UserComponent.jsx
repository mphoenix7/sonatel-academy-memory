import React, { useEffect, useState } from "react";
import { theme, useStyles } from "./UserComponentStyle";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Close, PersonAddOutlined, Search } from "@material-ui/icons";
import UserAPI from "../../services/UserAPI";
import CustomToast from "../CustomToast";
import ProfilsAPI from "../../services/ProfilsAPI";

const UserComponent = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);
  const [id, setId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: null,
    placeOfBirth: "",
    phoneNumber: "",
    sex: "",
    profil: "",
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    placeOfBirth: "",
    phoneNumber: "",
    sex: "",
    profil: "",
  });

  //Dialog function
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //change de page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // change le nombre d'element par page du tableau
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Obtenir la liste de tous les utilisateurs
  const getAllUser = async () => {
    try {
      const data = await UserAPI.getUsers();
      setUsers(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  //recuperation des profils
  const getProfils = async () => {
    try {
      const data = await ProfilsAPI.getProfils();
      setRoles(data);
    } catch (e) {
      setMode("error");
      setToastOpen(true);
    }
  };
  useEffect(() => {
    getAllUser();
    getProfils();
  }, [users]);

  // Traquer la valeur de notre  champs search
  const handleSearchChange = (event) => {
    setSearch(event.currentTarget.value);
    setPage(0);
  };

  //gestion du dialog

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUserData({ ...userData, [name]: value });
  };
  const handleSelectChange = (event) => {
    setUserData({
      ...userData,
      profil: event.target.value,
    });
  };
  const handleCloseToast = () => {
    setToastOpen(false);
  };
  const handleEdit = (user) => {
    setEditMode(true);
    setOpen(true);
    const {
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      sex,
      dateOfBirth,
      placeOfBirth,
    } = user;
    setId(id);
    setUserData({
      firstName,
      lastName,
      email,
      phoneNumber,
      sex,
      dateOfBirth,
      placeOfBirth,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editMode) {
      try {
        await UserAPI.editUser(id, userData);
        handleClose();
        setMode("success");
        setToastOpen(true);
      } catch (error) {
        console.log(error.response);
        if (error.response.data.violations) {
          const apiErrors = {};
          error.response.data.violations.map((violation) => {
            apiErrors[violation.propertyPath] = violation.message;
          });
          setError(apiErrors);
        } else {
          setMode("error");
          setToastOpen(true);
        }
      }
    } else {
      try {
        await UserAPI.createUser(userData);
        handleClose();
        setMode("success");
        setToastOpen(true);
      } catch (error) {
        console.log(error.response);
        if (error.response.data.violations) {
          const apiErrors = {};
          error.response.data.violations.map((violation) => {
            apiErrors[violation.propertyPath] = violation.message;
          });
          setError(apiErrors);
        } else {
          setMode("error");
          setToastOpen(true);
        }
      }
    }
  };
  const handleDelete = async (id) => {
    try {
      await UserAPI.deleteUser(id);
      setMode("success");
      setToastOpen(true);
    } catch (error) {
      setMode("error");
      setToastOpen(true);
    }
  };

  /**
   * Filtrer les donnees de notre table par prenom ,nom , email et numero de telephone
   *
   */
  const filterTable = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.phoneNumber.toLowerCase().includes(search)
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={classes.content}>
          <form noValidate className={classes.SearchForm}>
            <TextField
              className={classes.SearchInput}
              color="primary"
              value={search}
              onChange={handleSearchChange}
              variant="outlined"
              name="search"
              type="text"
              placeholder="rechercher ici"
              id="search"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              startIcon={<PersonAddOutlined />}
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              className={classes.button}
            >
              Creer
            </Button>
          </form>

          <TableContainer className={classes.table}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow component={Paper} elevation={2}>
                  <TableCell>Prenom</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Numero de Telephone</TableCell>
                  <TableCell>Profil</TableCell>
                  <TableCell>EDITION</TableCell>
                  <TableCell>Supression</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filterTable
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow
                      hover
                      key={user.id}
                      component={Paper}
                      elevation={2}
                    >
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>
                        <Chip
                          color="primary"
                          variant="default"
                          Data
                          label={user.profil.name}
                        />
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Button
                          variant="text"
                          color="primary"
                          onClick={() => handleEdit(user)}
                        >
                          Modifier
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="text"
                          color="secondary"
                          onClick={() => handleDelete(user.id)}
                        >
                          Supprimer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>

              <TablePagination
                labelRowsPerPage="Element Par Page"
                variant="footer"
                rowsPerPageOptions={[10, 20, 30]}
                count={filterTable.length}
                onChangePage={handleChangePage}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Table>
          </TableContainer>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          disableBackdropClick
          fullWidth
          maxWidth="md"
        >
          <div className={classes.dialogHeader}>
            <div className={classes.closeIcon}>
              <IconButton onClick={handleClose}>
                <Close color="primary" />
              </IconButton>
            </div>
          </div>

          <DialogContent>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <div className={classes.textFieldRow}>
                <div className={classes.textFieldColumn}>
                  <TextField
                    error={error.firstName}
                    helperText={error.firstName}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Prenom"
                    type="text"
                    fullWidth
                    className={classes.textField}
                    value={userData.firstName}
                    name="firstName"
                  />
                  <TextField
                    error={error.lastName}
                    helperText={error.lastName}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Nom"
                    type="text"
                    fullWidth
                    className={classes.textField}
                    value={userData.lastName}
                    name="lastName"
                  />
                  <TextField
                    error={error.email}
                    helperText={error.email}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Email"
                    type="email"
                    fullWidth
                    className={classes.textField}
                    value={userData.email}
                    name="email"
                  />
                  <TextField
                    error={error.phoneNumber}
                    helperText={error.phoneNumber}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Numero de telephone"
                    type="text"
                    fullWidth
                    className={classes.textField}
                    value={userData.phoneNumber}
                    name="phoneNumber"
                  />
                  <TextField
                    onChange={handleChange}
                    variant="outlined"
                    type="date"
                    fullWidth
                    id="date"
                    name="dateOfBirth"
                    label="Date de Naisance"
                    className={classes.textField}
                    value={userData.dateOfBirth}
                    defaultValue={userData.dateOfBirth}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className={classes.textFieldColumn}>
                  <TextField
                    error={error.placeOfBirth}
                    helperText={error.placeOfBirth}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Lieu de Naissance"
                    type="text"
                    fullWidth
                    className={classes.textField}
                    value={userData.placeOfBirth}
                    name="placeOfBirth"
                  />
                  <RadioGroup
                    error={error.sex}
                    helperText={error.sex}
                    aria-label="gender"
                    name="sex"
                    value={userData.sex}
                    onChange={handleChange}
                    row
                    className={classes.radioGroup}
                  >
                    <FormControlLabel
                      control={<Radio />}
                      label="Homme"
                      className={classes.radio}
                      value="Homme"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Femme"
                      className={classes.radio}
                      value="Femme"
                    />
                  </RadioGroup>

                  <TextField
                    variant="outlined"
                    fullWidth
                    error={error.profil}
                    helperText={error.profil}
                    onChange={handleSelectChange}
                    className={classes.textField}
                    select
                    value={userData.profil}
                    helperText="choisir le profil de l'utilisteur"
                    label="Role"
                  >
                    {roles.map((role) => (
                      <MenuItem key={role["@id"]} value={role["@id"]}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className={classes.dialogActions}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submitButton}
                >
                  {editMode ? " Modifier " : " Creer "}
                  utilisateur
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        {mode === "success" && (
          <CustomToast
            toastOpen={toastOpen}
            handleCloseToast={handleCloseToast}
            message={" Opération réussie avec succés !"}
            color={"success"}
          />
        )}
        {mode === "error" && (
          <CustomToast
            toastOpen={toastOpen}
            handleCloseToast={handleCloseToast}
            message={" Oups! Une erreur s'est produit !"}
            color={"error"}
          />
        )}
      </ThemeProvider>
    </>
  );
};

export default UserComponent;
