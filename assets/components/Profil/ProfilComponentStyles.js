import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    header: {
        marginTop: theme.spacing(3)
    },
    button: {
        margin: theme.spacing(0, 0, 2, 2)
    },
    dialogHeader: {
        display: "flex",
        justifyContent: "flex-end"
    },
    dialogSubmitButton: {
        margin: theme.spacing(2, 0, 2, 0)
    },


}))

export {
    useStyles
}