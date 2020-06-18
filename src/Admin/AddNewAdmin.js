import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import axios from 'axios'
import Modal from './components/Modal'
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    form: {
        margin: theme.spacing(0, 'auto'),
        marginTop: theme.spacing(1),
        padding: theme.spacing(2),

        [theme.breakpoints.up('sm')]: {
            width: '60%',
        },

        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.primary.light,
        height: '50px'
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

    let [loading, setLoading] = React.useState(false);

    let [adminEmail, setAdminEmail] = React.useState("");
    let [adminPassword, setAdminPassword] = React.useState("");
    let [adminRePassword, setAdminRePassword] = React.useState("");

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

    const addNewAdmin = async function(){

        if((adminEmail.trim().length > 0) && (adminPassword.trim().length > 0) && (adminRePassword.trim().length > 0)){
            
            //Check if passwords matches
            if(adminPassword !== adminRePassword){
                alert("Password Mismatch!");
                return;
            }

            try{
                const data = {
                    email: adminEmail,
                    password: adminPassword
                };

                const headers = {
                    "Content-Type": "application/json"
                };

                setLoading(true);

                const loginResponse = await axios.post('api/v1/admin/register', data, {headers : headers});
                if(loginResponse.data.status == "NEW_ADMIN_ADDED"){

                    setLoading(false);

                    alert(loginResponse.data.message);

                }else{
                    setLoading(false);

                    alert(loginResponse.data.message);
                }


            }catch(e){
                setLoading(false);

                await alert(e.message);
            }
        }else{
            await alert("Some fields are empty!");
        }
    }

    return(
        <div className={classes.root}>
            <ResponsiveDrawer/>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <div>
                    <Typography className={classes.pageTitle} component="h6" variant="h6">ADD NEW ADMINISTRATOR</Typography>
                    {/* <Divider/> */}
                    {/* <Paper> */}
                    <Paper className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Repeat password"
                            type="password"
                            id="password"
                            value={adminRePassword}
                            onChange={(e) => setAdminRePassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={addNewAdmin}
                        >
                            CREATE ACCOUNT
                        </Button>
                    </Paper>
                    {/* </Paper> */}
                </div>
            </div>
            <Modal loading={loading}/>
        </div>
    )
}

export default Dashboard;
