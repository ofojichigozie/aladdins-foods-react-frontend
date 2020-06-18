import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Grid } from '@material-ui/core';
import { EditRounded, DeleteRounded } from '@material-ui/icons';
import EditCategoryModal from './EditCategoryModal'
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


function ListOfCategories(props){
    const classes = useStyles();
    const theme = useTheme();

    let [loading, setLoading] = React.useState(false);

    let [editModalState, setEditModalState] = React.useState(false);
    let [categoryToEdit, setCategoryToEdit] = React.useState("");

    function openEditCategoryModal(category){
        setEditModalState(true);
        setCategoryToEdit(category);
    }

    function closeEditCategoryModal(product){
        setEditModalState(false);
        setCategoryToEdit("");
    }

    async function deleteCategory(category){
        let res = window.confirm(`You are about to delete ${category.name} category!`);
        
        if(res === true){
            (async function(){
                try{
                    const headers = {
                        // 
                    };
                    
                    setLoading(true);

                    const deleteProductResponse = await axios.get(`api/v1/admin/deleteCategory/${category.id}`, {headers : headers});
                    if(deleteProductResponse.data.status == "CATEGORY_DELETED"){
                        setLoading(false);
                        window.location.href = '/admin/add-new-product';
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

    if(props.categories.length > 0){
        return(
            <Paper>
                <Grid xs={12}>
                    <Table>
                        <TableHead className={classes.tableHead}>
                            <TableCell className={classes.tableHeadCell}>S/N</TableCell>
                            <TableCell className={classes.tableHeadCell}>Name</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableHead>
                        <TableBody>
                        { 
                            props.categories.map((category, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>
                                            <EditRounded className={classes.editIcons} onClick={(e) => openEditCategoryModal(category)}/>
                                        </TableCell>
                                        <TableCell>
                                            <DeleteRounded className={classes.deleteIcons} onClick={() => deleteCategory(category)}/>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        </TableBody>
                    </Table>
                </Grid>

                <Modal loading={loading}/>
                <EditCategoryModal openState={editModalState} category={categoryToEdit} closeAction={closeEditCategoryModal}/>
            </Paper>
        )
    }else{
        return(
            <div>
                <Typography component="h1" variant="h6">No available categories</Typography>
            </div>
        )
    }
}

export default ListOfCategories;