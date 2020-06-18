import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ResponsiveDrawer from './components/ResponsiveDrawer';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    pageTitle: {
        display: 'inline',
        color: '#FFF',
        borderRadius: '10px',
        fontSize: '0.9em',
        backgroundColor: theme.palette.secondary.light,
        padding: theme.spacing(1, 2)
    }
}));

function ManageOrders(){
    const classes = useStyles();
    const theme = useTheme();

    React.useEffect(() => {
        try{
            let loggedInAdmin = localStorage.getItem("aladdins_admin_email");

            if(loggedInAdmin != null){
                
            }else{
                window.location.href = '/admin';
            }
        }catch(e){
            console.log("Error getting from local storage");
        }

    }, []);

    return(
        <div className={classes.root}>
            <ResponsiveDrawer/>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <div>
                    <Typography className={classes.pageTitle} component="h6" variant="h6">Meal Orders</Typography>
                    {/* <Divider/> */}
                </div>
            </div>
        </div>
    )
}

export default ManageOrders;
