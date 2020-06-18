import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Divider, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {AddRounded, PeopleRounded, ShoppingCartRounded, PersonAddRounded, DashboardRounded, ViewListRounded, ArrowBackRounded, DashboardOutlined} from '@material-ui/icons';
import SideBarImage from './images/sidebar.jpg';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    avatarDiv: {
        margin: theme.spacing(2, 0),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        alignItems: 'center'
    },
    drawerStyle: {
        color: '#888',
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.85) 25.62%, rgba(0, 0, 0, 0.85) 100%), url(${SideBarImage});`
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerIcons: {
        // backgroundColor: '#000',
        width: '20px',
        height: 'auto',
        color: '#fff',
        borderRadius: '4px',
        marginRight: '3px',
        padding: '1px'
    },
    appBar: {
        // backgroundColor: 'primary',
        backgroundColor: theme.palette.primary.light,
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    closeMenuButton: {
        marginLeft: 'auto',
        marginRight: 0,
    },
    link: {
        textDecoration: 'none',
        color: '#888',
    }
}));

function ResponsiveDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    let [admin, setAdmin] = React.useState("");

    React.useEffect(() => {
        try{
            let loggedInAdmin = localStorage.getItem("aladdins_admin_email");

            if(loggedInAdmin != null){
                setAdmin(loggedInAdmin);
            }else{
                setAdmin("noadmin@noadmin");
            }
        }catch(e){
            console.log("Error getting from local storage");
        }

    }, []);


    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
    }

    function signout(){
        let response = window.confirm("You are about to be logged out!");

        if(response === true){
            try{
                localStorage.removeItem("aladdins_admin_email");
            }catch(e){
                console.log("Error removing from local storage");
            }
            
            window.location.href = '/admin';
        }
    }

    const drawer = (
        <div className={classes.drawerDiv}>
            <div className={classes.avatarDiv}>
                <Avatar className={classes.avatar}>
                </Avatar>
                {admin}
            </div>

            <List>
                <ListItem button>
                    <DashboardOutlined className={classes.drawerIcons}/>
                    <Link to='/admin/dashboard' className={classes.link}> Dashboard</Link>
                </ListItem>
                <ListItem button>
                    <AddRounded className={classes.drawerIcons}/>
                    <Link to='/admin/add-new-product' className={classes.link}> Add Meal</Link>
                </ListItem>
                <ListItem button>
                    <DashboardRounded className={classes.drawerIcons}/>
                    <Link to="/admin/products" className={classes.link}>Manage Meals</Link>
                </ListItem>
                <ListItem button>
                    <PeopleRounded className={classes.drawerIcons}/>
                    <Link to="/admin/customers" className={classes.link}> Manage Customers</Link>
                </ListItem>
                <ListItem button>
                    <ShoppingCartRounded className={classes.drawerIcons}/>
                    <Link to="/admin/orders" className={classes.link}>Manage Orders</Link>
                </ListItem>
                <ListItem button>
                    <ViewListRounded className={classes.drawerIcons}/>
                    <Link to="/admin/dashboard" className={classes.link}>View Sales</Link>
                </ListItem>
            </List>

            <Divider/>

            <List>
                <ListItem button>
                    <PersonAddRounded className={classes.drawerIcons}/>
                    <Link to="/admin/add-new-admin" className={classes.link}>New Admin</Link>
                </ListItem>
                <ListItem button>
                    <ArrowBackRounded className={classes.drawerIcons}/>
                    <Link to="" onClick={() => signout()} className={classes.link}>Sign out</Link>
                </ListItem>
            </List>

        </div>
    );

    return (
        <div className={classes.drawerContainer}>
            <CssBaseline />

            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>Aladin Foods</Typography>
                </Toolbar>
            </AppBar>

            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{ paper: classes.drawerStyle, }}
                        ModalProps={{ keepMounted: true, }}// Better open performance on mobile.
                    >
                        <IconButton
                            onClick={handleDrawerToggle}
                            className={classes.closeMenuButton}
                        >
                            <CloseIcon/>
                        </IconButton>
                        {drawer}
                    </Drawer>
                </Hidden>

                <Hidden xsDown implementation="css">
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{ paper: classes.drawerStyle, }}
                    >
                        <div className={classes.toolbar} />
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

        </div>
    );
}

export default ResponsiveDrawer;