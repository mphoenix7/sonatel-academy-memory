import {makeStyles , createMuiTheme} from "@material-ui/core";
import {orange, teal} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette:{
        primary:teal,
        secondary:orange
    }
})

const useStyles = makeStyles((theme) => ({
    content: {
        height: "100%",
        width: "100%",
        display:"flex",
        flexDirection:"column",


    },
    form:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        height:"9vh",
        justifyContent:"space-around",
        margin:theme.spacing(2,0,1,0)
    },
    button:{
        marginLeft:theme.spacing(1),
        alignSelf:"flex-end",
        width:"20%",
        height:theme.spacing(6)
    },
    input:{
        width:"50%"
    },
    item:{
        marginBottom:theme.spacing(2),
        width:"100%"
    },
    dialogHeader: {
        display: "flex",
        flexDirection:"row",
        justifyContent: "flex-end"
    },
    textFieldRow:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        [theme.breakpoints.only("xs")]:{
            flexDirection:"column"
        }
    },
    textFieldColumn:{
        display:"flex",
        flexDirection:"column",
        width:"48%",
        [theme.breakpoints.only("xs")]:{
            width:"100%"
        },

    },
    dialogActions:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        height:"100%",
        width:"100%",

    },

    radio:{
        color: "teal",
        '&$checked': {
            background: "teal",
        },
    },
    radioGroup:{
        height:theme.spacing(7),
        marginBottom:theme.spacing(2)

    },
    submitButton:{
        width:"30%",
        marginLeft:theme.spacing(2)
    }
}))

export {
    theme,
    useStyles
}