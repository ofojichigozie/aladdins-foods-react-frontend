import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import { Typography, Grid, Card } from '@material-ui/core';
import { PeopleRounded, MenuRounded, ShoppingCartRounded, CategoryRounded } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    card: {
        height: '130px',
        backgroundColor: '#000',
        margin: theme.spacing(1, 2)
    },
    countField: {
        fontSize: '24pt'
    }, 
    pageTitle: {
        display: 'inline',
        color: '#FFF',
        borderRadius: '10px',
        fontSize: '0.9em',
        backgroundColor: theme.palette.secondary.light,
        padding: theme.spacing(1, 2)
    }
}));

function Dashboard(){
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
                    <Typography className={classes.pageTitle} component="h6" variant="h6">DASHBOARD</Typography>
                    <Grid container style={{marginTop: theme.spacing(3)}}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className={classes.card} style={{backgroundColor: theme.palette.primary.light}}>
                                <Grid container style={{height: '100%'}}>
                                    <Grid item xs={6} style={{padding: theme.spacing(1), color: '#EEE'}}>
                                        <Typography className={classes.countField}component="h1" variant="h6">150</Typography>
                                        <Typography component="p" variant="p">Meals</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#EEE'}}>
                                        <MenuRounded style={{ width: '50%', height: 'auto'}}/>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Card className={classes.card} style={{backgroundColor: theme.palette.success.light}}>
                                <Grid container style={{height: '100%'}}>
                                    <Grid item xs={6} style={{padding: theme.spacing(1), color: '#EEE'}}>
                                        <Typography className={classes.countField}component="h1" variant="h6">15</Typography>
                                        <Typography component="p" variant="p">Categories</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#EEE'}}>
                                        <CategoryRounded style={{ width: '50%', height: 'auto'}}/>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Card className={classes.card} style={{backgroundColor: theme.palette.warning.light}}>
                                <Grid container style={{height: '100%'}}>
                                    <Grid item xs={6} style={{padding: theme.spacing(1), color: '#EEE'}}>
                                        <Typography className={classes.countField}component="h1" variant="h6">1500</Typography>
                                        <Typography component="p" variant="p">Customers</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#EEE'}}>
                                        <PeopleRounded style={{ width: '50%', height: 'auto'}}/>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Card className={classes.card} style={{backgroundColor: theme.palette.error.light}}>
                                <Grid container style={{height: '100%'}}>
                                    <Grid item xs={6} style={{padding: theme.spacing(1), color: '#EEE'}}>
                                        <Typography className={classes.countField}component="h1" variant="h6">113</Typography>
                                        <Typography component="p" variant="p">Orders</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#EEE'}}>
                                        <ShoppingCartRounded style={{ width: '50%', height: 'auto'}}/>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
