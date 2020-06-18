import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import { Select, Card, CardContent, MenuItem } from '@material-ui/core';
import Modal from './components/Modal'
import ListOfCategories from './components/ListOfCategories'
import axios from 'axios'

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

        [theme.breakpoints.up('sm')]: {
            width: '80%',
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
    }, 
    textField: {
        backgroundColor: '#FFF'
    }
}));

function AddNewProduct(){
    const classes = useStyles();
    const theme = useTheme();

    let [productCategories, setProductCategories] = React.useState([]);
    let [newCategory, setNewCategory] = React.useState("");
    let [loading, setLoading] = React.useState(false);

    //State for product details
    let [productName, setProductName] = React.useState("");
    let [productCategory, setProductCategory] = React.useState("");
    let [productDescription, setProductDescription] = React.useState("");
    let [productPrice, setProductPrice] = React.useState(0);
    let [imageFile, setImageFile] = React.useState("");
    let [productCode, setProductCode] = React.useState("");

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

        axios.get('api/v1/admin/readProductCategories', {
            headers: {
                //No headers
            }
        })
        .then(response => {
            if(response.data.status == 'PRODUCT_CATEGORIES_FOUND'){
                setProductCategories(response.data.productCategories);
            }else{
                setProductCategories([]);
            }
        })
        .catch(e => {
            alert(e);
        });
    }, []);

    const addNewCategory = async function(){

        if(newCategory.trim().length > 0){
            try{
                const data = {
                    name: newCategory
                };

                const headers = {
                    "Content-Type": "application/json"
                };

                setLoading(true);

                const loginResponse = await axios.post('api/v1/admin/createNewProductCategory', data, {headers : headers});
                if(loginResponse.data.status == "NEW_PRODUCT_CATEGORY_ADDED"){

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

    const addNewProduct = async function(){

        if((productName.trim().length > 0) && (productCategory.trim().length > 0) && (productDescription.trim().length > 0) && (productPrice > 0) && (imageFile != null) && (productCode.trim().length > 0)){
            try{

                let formData = new FormData();
                formData.append("productName", productName);
                formData.append("productCategory", productCategory);
                formData.append("productDescription", productDescription);
                formData.append("productPrice", productPrice);
                formData.append("imageFile", imageFile);
                formData.append("productCode", productCode);

                const headers = {
                    "Content-Type": "multipart/form-data"
                };

                setLoading(true);

                const loginResponse = await axios.post('api/v1/admin/createProduct', formData, {headers : headers});
                if(loginResponse.data.status == "PRODUCT_ADDED"){

                    setLoading(false);

                    alert(loginResponse.data.message);

                    //Clear all inputs
                    setProductName("");
                    setProductCategory("");
                    setProductDescription("");
                    setProductPrice(0);
                    // setImageFile();
                    setProductCode("");

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
                    <Typography className={classes.pageTitle} component="h6" variant="h6">ADD NEW PRODUCT</Typography>
                    {/* <Divider/> */}
                    <Grid container>
                        <Grid item xs={12} sm={12} md={8}>
                            <div className={classes.form} noValidate>
                        
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="productName"
                                    label="Name"
                                    name="productName"
                                    autoFocus
                                    value={productName}
                                    className={classes.textField}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                                <Select
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="productCategory"
                                    id="productCategory"
                                    value={productCategory}
                                    className={classes.textField}
                                    onChange={(e) => setProductCategory(e.target.value)}
                                >
                                    {
                                        productCategories.map((productCategory, index) => {
                                            return <MenuItem value={productCategory.name} key={productCategory.id}>{productCategory.name}</MenuItem>
                                        })
                                    }
                                </Select>
                                <TextField
                                    // style={{display:'none'}}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="imageFile"
                                    type="file"
                                    id="imageFile"
                                    className={classes.textField}
                                    onChange={(e) => {
                                        if(e.target.files && (e.target.files.length > 0)){
                                            setImageFile(e.target.files[0])
                                        }
                                    }}
                                />
                                
                                <Grid container>
                                    <Grid item xs>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="price"
                                            label="Price"
                                            name="price"
                                            style={{width: '100%'}}
                                            type="number"
                                            value={productPrice}
                                            className={classes.textField}
                                            onChange={(e) => setProductPrice(e.target.value)}
                                        />
                                    </Grid>

                                    <Box style={{ width: '10px'}}/>

                                    <Grid item xs>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="productCode"
                                            label="Code"
                                            name="productCode"
                                            value={productCode}
                                            className={classes.textField}
                                            onChange={(e) => setProductCode(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="productDescription"
                                    label="Description"
                                    id="productDescription"
                                    value={productDescription}
                                    className={classes.textField}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    // fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={addNewProduct}
                                >
                                    Add
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <Card>
                                <CardContent>
                                <div className={classes.form} noValidate>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="categoryName"
                                        label="Category Name"
                                        id="categoryName"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value.toString())}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={addNewCategory}
                                    >
                                        Add New Category
                                    </Button>
                                </div>
                                </CardContent>
                            </Card>
                            <Box style={{ height: '10px'}}/>
                            <Card>
                                <div>
                                    <Typography component="h1" variant="h6" style={{textAlign: 'center', fontSize: '0.8rem', color: '#000', padding: '5px'}} >Available meal categories</Typography>
                                </div>
                                <CardContent>
                                    <ListOfCategories categories={productCategories}/>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Modal loading={loading}/>
        </div>
    )
}

export default AddNewProduct;
