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
    }
}))

export {
    theme,
    useStyles
}