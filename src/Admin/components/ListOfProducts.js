import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Grid } from '@material-ui/core';
import { EditRounded, DeleteRounded } from '@material-ui/icons';
import EditProductModal from './EditProductModal';
import Modal from './Modal'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    tableHead: {
        backgroundColor: theme.palette.text.primary,
        fontWeight: 'bold'
    },
    tableHeadCell:{
        color: '#fff',
    },
    editIcons: {
        backgroundColor: theme.palette.primary.main,
        width: '20px',
        height: 'auto',
        color: '#fff',
        borderRadius: '4px',
        marginRight: '3px',
        padding: '2px'
    },
    deleteIcons: {
        backgroundColor: theme.palette.error.main,
        width: '20px',
        height: 'auto',
        color: '#fff',
        borderRadius: '4px',
        marginRight: '3px',
        padding: '2px'
    },
}));


function ListOfProducts(props){
    const classes = useStyles();
    const theme = useTheme();
    
    let [editModalState, setEditModalState] = React.useState(false);
    let [productToEdit, setProductToEdit] = React.useState({});

    let [loading, setLoading] = React.useState(false);

    function openEditProductModal(product){
        setEditModalState(true);
        setProductToEdit(product);
    }

    function closeEditProductModal(product){
        setEditModalState(false);
        setProductToEdit({});
    }

    function deleteProduct(product){
        let res = window.confirm(`You are about to delete ${product.name}!`);
        
        if(res === true){
            (async function(){
                try{
                    const headers = {
                        // 
                    };
                    
                    setLoading(true);

                    const deleteProductResponse = await axios.get(`api/v1/admin/deleteProduct/${product.id}`, {headers : headers});
                    if(deleteProductResponse.data.status == "PRODUCT_DELETED"){
                        setLoading(false);
                        window.location.href = '/admin/products';
                    }else{
                        setLoading(false);
                        alert(deleteProductResponse.data.message);
                    }
                }catch(e){
                    setLoading(false);
                    alert(e.message);
                }
            })();
        }
    }

    if(props.products.length > 0){
        return(
            <Paper style={{marginTop: '15px'}}>
                <Grid xs={12} style={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead className={classes.tableHead}>
                            <TableCell className={classes.tableHeadCell}>S/N</TableCell>
                            <TableCell className={classes.tableHeadCell}>Name</TableCell>
                            <TableCell className={classes.tableHeadCell}>Category</TableCell>
                            <TableCell className={classes.tableHeadCell}>Description</TableCell>
                            <TableCell className={classes.tableHeadCell}>Price</TableCell>
                            <TableCell className={classes.tableHeadCell}>Code</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableHead>
                        <TableBody>
                        { 
                            props.products.map((product, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>{product.description}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.code}</TableCell>
                                        <TableCell>
                                            <EditRounded className={classes.editIcons} onClick={(e) => openEditProductModal(product)}/>
                                        </TableCell>
                                        <TableCell>
                                            <DeleteRounded className={classes.deleteIcons} onClick={(e) => deleteProduct(product)}/>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        </TableBody>
                    </Table>
                </Grid>
                
                <Modal loading={loading}/>
                <EditProductModal openState={editModalState} product={productToEdit} closeAction={closeEditProductModal}/>
            </Paper>
        )
    }else{
        return(
            <div style={{textAlign: 'center', color: '#88000'}}>
                <Typography component="h1" variant="h6">No available meals</Typography>
            </div>
        )
    }
}

export default ListOfProducts;