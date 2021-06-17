import React from "react";
import MuiAlert from '@material-ui/lab/Alert';
import {Snackbar} from "@material-ui/core";


const CustomToast = ({toastOpen , handleCloseToast, message,color }) => {
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    return (
        <Snackbar open={toastOpen} autoHideDuration={5000} onClose={handleCloseToast} anchorOrigin={{
            vertical:"bottom",
            horizontal:"left"
        }} >
            <Alert onClose={handleCloseToast} severity={color}>
                {message}
            </Alert>
        </Snackbar>
    )

}

export default  CustomToast;