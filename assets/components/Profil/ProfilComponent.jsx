import React, { useEffect, useState } from "react";
import { useStyles } from "./ProfilComponentStyles";
import Profils_API from "../../services/ProfilsAPI";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { AssignmentIndOutlined, Close } from "@material-ui/icons";
import CustomToast from "../CustomToast";

const ProfilComponent = () => {
  //State
  const [id, setId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profil, setProfil] = useState([]);
  const [roles, setRoles] = useState({
    name: "",
  });
  const [toastOpen, setToastOpen] = useState(false);
  const [mode, setMode] = useState("");

  const [error, setError] = useState({
    name: "",
  });
  const [open, setOpen] = useState(false);

  const handleEditClickOpen = async ({ id, name }) => {
    setId(id);
    setEditMode(true);
    setOpen(true);
    setRoles({ name });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  // recupere le la liste des profils
  const getAllProfil = async () => {
    try {
      const data = await Profils_API.getProfils();
      setProfil(data);
    } catch (error) {
      setMode("error");
      setToastOpen(true);
    }
  };
  useEffect(() => {
    getAllProfil();
  }, [profil]);

  // traque la valeur du champs
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setRoles({ ...roles, [name]: value.toUpperCase() });
  };
  //gestion de la soumissio des donnees
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Modification d'un profil
    if (editMode) {
      try {
        await Profils_API.editProfil(id, roles);
        handleClose();
        setMode("success");
        setToastOpen(true);
      } catch (error) {
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
        await Profils_API.createProfil(roles);
        handleClose();
        setMode("success");
        setToastOpen(true);
        setRoles({ name: "" });
      } catch (error) {
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

  //gestion de la supression d'un profil
  const handleDelete = async (id) => {
    try {
      await Profils_API.deleteProfil(id);
      setMode("success");
      setToastOpen(true);
    } catch (error) {
      setMode("error");
      setToastOpen(true);
    }
  };

  // ferme le popup alert
  const handleCloseToast = () => {
    setToastOpen(false);
  };
  //ferme le Dialog(Modal)
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <div className={classes.dialogHeader}>
          <IconButton onClick={handleClose}>
            <Close color="primary" />
          </IconButton>
        </div>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              error={error.name !== ""}
              helperText={error.name}
              onChange={handleChange}
              value={roles.name}
              name="name"
              variant="outlined"
              fullWidth
              type="text"
              color="primary"
              placeholder="le nom du profil"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.dialogSubmitButton}
            >
              {!editMode ? "Creer" : "Enregistrer"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <TableContainer component={Paper} elevation={2}>
        <div className={classes.header}>
          <Typography variant="h5" color="primary" align="center">
            Gestion des Profils
          </Typography>
          <Button
            startIcon={<AssignmentIndOutlined />}
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            Creer un Profil
          </Button>
        </div>
        <Divider />
        <Table>
          <TableHead>
            <TableRow component={Paper} elevation={2}>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell align="center" size="small">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profil.map((role) => (
              <TableRow key={role.id} hover component={Paper} elevation={2}>
                <TableCell>{role.id}</TableCell>
                <TableCell>
                  <Chip label={role.name} color="primary" />
                </TableCell>
                <TableCell size="small">
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => handleEditClickOpen(role)}
                  >
                    MODIFIER
                  </Button>
                </TableCell>
                <TableCell size="small">
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => handleDelete(role.id)}
                  >
                    SUPPRIMER
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
    </>
  );
};

export default ProfilComponent;
