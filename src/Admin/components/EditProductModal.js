import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Select, Paper, MenuItem, CircularProgress } from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        padding: theme.spacing(2)
    },
    form: {
        // margin: theme.spacing(0, 'auto'),
        marginTop: theme.spacing(1),

        [theme.breakpoints.up('sm')]: {
            width: '100%',
        },

        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        height: '50px'
    },
}));

function EditProductModal(props) {
    const classes = useStyles();
    // const theme = useTheme();

    let [productCategories, setProductCategories] = React.useState([]);
    let [updateProgressDisplay, setUpdateProgressDisplay] = React.useState("none");

    React.useEffect(() => {
        axios.get('https://aladdins-foods.herokuapp.com/api/v1/admin/readProductCategories', {
            headers: {
                //No headers
            }
        })
        .then(response => {
            if(response.data.status === 'PRODUCT_CATEGORIES_FOUND'){
                setProductCategories(response.data.productCategories);
            }else{
                setProductCategories([]);
            }
        })
        .catch(e => {
            alert(e);
        });
    }, []);

    async function editProduct(id){
        let productName = document.getElementById('productName').value;
        let productCategory = document.getElementById('productCategory').innerHTML;
        let productDescription = document.getElementById('productDescription').value;
        let productPrice = document.getElementById('productPrice').value;
        let productCode = document.getElementById('productCode').value;

        // let newProductData = {
        //     id,
        //     productName,
        //     productCategory,
        //     productDescription,
        //     productPrice,
        //     productCode
        // }

        if((productName.trim().length > 0) && (productCategory.trim().length > 0) && (productDescription.trim().length > 0) && (productPrice > 0) && (productCode.trim().length > 0)){
            try{

                let formData = new FormData();
                formData.append("editProductName", productName);
                formData.append("editProductCategory", productCategory);
                formData.append("editProductDescription", productDescription);
                formData.append("editProductPrice", productPrice);
                formData.append("editProductCode", productCode);

                const headers = {
                    "Content-Type": "multipart/form-data"
                };

                setUpdateProgressDisplay("inline");

                const editProductResponse = await axios.post(`https://aladdins-foods.herokuapp.com/api/v1/admin/updateProduct/${id}`, formData, {headers : headers});
                if(editProductResponse.data.status === "PRODUCT_UPDATED"){

                    setUpdateProgressDisplay("none");

                    window.location.href = '/admin/products';

                }else{
                    setUpdateProgressDisplay("none");

                    alert(editProductResponse.data.message);
                }


            }catch(e){
                setUpdateProgressDisplay("none");

                await alert(e.message);
            }
        }else{
            await alert("Some fields are empty!");
        }
    }

    return(
        <Modal className={classes.modal} open={props.openState}>
            <div>
                <div>
                    <Box/>
                </div>
                <Paper className={classes.paper}>
                    <CloseRounded style={{ float: 'right', color: '#DD0000'}} onClick={props.closeAction}/>
                    <div className={classes.form} noValidate>
                            
                        <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            id="productName"
                            label="Name"
                            name="productName"
                            autoFocus
                            defaultValue={props.product.name}
                        />
                        <Select
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            name="productCategory"
                            id="productCategory"
                            defaultValue={props.product.category}
                        >
                            <MenuItem value={props.product.category}>{props.product.category}</MenuItem>
                            
                            {
                                productCategories.map((productCategory, index) => {
                                    return <MenuItem value={productCategory.name} key={productCategory.id}>{productCategory.name}</MenuItem>
                                })
                            }
                        </Select>
                        {/* <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            name="imageFile"
                            type="file"
                            id="imageFile"
                            value={imageFile}
                            onChange={(e) => {
                                if(e.target.files && (e.target.files.length > 0)){
                                    setImageFile(e.target.files[0])
                                }
                            }}
                        /> */}
                        <Grid container>
                            <Grid item xs>
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="productPrice"
                                    label="Price"
                                    name="productPrice"
                                    style={{width: '100%'}}
                                    type="number"
                                    defaultValue={props.product.price}
                                />
                            </Grid>

                            <Box style={{ width: '10px'}}/>

                            <Grid item xs>
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="productCode"
                                    label="Code"
                                    name="productCode"
                                    defaultValue={props.product.code}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            name="productDescription"
                            label="Description"
                            id="productDescription"
                            defaultValue={props.product.description}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => editProduct(props.product.id)}
                        >
                            Edit
                        </Button>
                        <span style={{display: updateProgressDisplay}}>
                            <CircularProgress/>
                        </span>
                    </div>
                </Paper>
            </div>
        </Modal>
    )
}

export default EditProductModal;
