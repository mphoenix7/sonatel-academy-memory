import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
    },
    textFieldColumn:{
        display:"flex",
        flexDirection:"column",
        width:"48%"
    },
    dialogActions:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        height:"100%",
        width:"100%"

    },
    button:{
       // alignSelf:"center"
    }

}))

export {
    useStyles
}