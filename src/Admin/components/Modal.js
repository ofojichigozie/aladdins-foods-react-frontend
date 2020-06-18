import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Modal, CircularProgress, Paper} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        padding: theme.spacing(2)
    }
}));

function AdminModal(props) {
    const classes = useStyles();
    const theme = useTheme();

    return(
        <Modal className={classes.modal} open={props.loading}>
            <Paper className={classes.paper}>
                <CircularProgress/>
            </Paper>
        </Modal>
    )
}

export default AdminModal;
