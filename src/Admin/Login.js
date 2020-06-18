import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import axios from 'axios'
import Modal from './components/Modal'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    card: {
        padding: theme.spacing(2)
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        height: '50px'
    },
}));

export default function SignIn() {
    const classes = useStyles();
    // const theme = useTheme();

    let [loginEmail, setLoginEmail] = React.useState("");
    let [loginPassword, setLoginPassword] = React.useState("");
    let [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        try{
            let loggedInAdmin = localStorage.getItem("aladdins_admin_email");

            if(loggedInAdmin != null){
                window.location.href = '/admin/dashboard';
            }
        }catch(e){
            console.log("Error getting from local storage");
        }
    }, []);

    const loginWithAxios = async function(){
        let email = loginEmail;
        let password = loginPassword;

        if((email.trim().length > 0) && (password.trim().length > 0)){
            try{
                const data = {
                    email: email,
                    password: password
                };

                const headers = {
                    "Content-Type": "application/json"
                };

                setLoading(true);

                const loginResponse = await axios.post('https://aladdins-foods.herokuapp.com/api/v1/admin/login', data, {headers : headers});
                if(loginResponse.data.status === "AUTH_SUCCEED"){

                    localStorage.setItem("aladdins_admin_email", email);

                    setLoading(false);

                    window.location.href = '/admin/dashboard';
                }else{
                    setLoading(false);

                    alert("Unauthorized access denied");
                }


            }catch(e){
                setLoading(false);

                await alert(e.message);
            }
        }else{
            await alert("Some fields are empty!");
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <Card className={classes.card} elevation={5}>
                    <div className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            type="email"
                            autoFocus
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={loginWithAxios}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">Forgot password?</Link>
                            </Grid>
                        </Grid>
                    </div>
                </Card>
            </div>
            <Box mt={8}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://material-ui.com/">
                        Aladin Foods - 
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
            <Modal loading={loading}/>
        </Container>
    );
}