import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import ListOfProducts from './components/ListOfProducts';
import axios from 'axios'

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


function ManageProducts(){
    const classes = useStyles();
    const theme = useTheme();

    let [products, setProducts] = React.useState([]);

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
        
        (async function(){
            try{
                const headers = {
                    // 
                };

                const getProductsResponse = await axios.get('api/v1/admin/readProducts', {headers : headers});
                if(getProductsResponse.data.status == "PRODUCTS_FOUND"){
                    setProducts(getProductsResponse.data.data);
                }else{
                    setProducts([]);
                }
            }catch(e){
                alert(e.message);
            }
        })();

    }, []);

    return(
        <div className={classes.root}>
            <ResponsiveDrawer/>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <div>
                    <Typography className={classes.pageTitle} component="h6" variant="h6">MEALS</Typography>
                    {/* <Divider/> */}
                    <ListOfProducts products={products}/>
                </div>
            </div>
        </div>
    )
}

export default ManageProducts;
