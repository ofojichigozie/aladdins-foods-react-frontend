import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Modal, Paper, CircularProgress } from '@material-ui/core';
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
    const theme = useTheme();

    let [productCategories, setProductCategories] = React.useState([]);
    let [updateProgressDisplay, setUpdateProgressDisplay] = React.useState("none");

    async function editCategory(id){
        let newCategoryName = document.getElementById('newCategoryName').value;

        if((newCategoryName.trim().length > 0)){
            try{

                let formData = new FormData();
                formData.append("newCategoryName", newCategoryName);

                const headers = {
                    "Content-Type": "multipart/form-data"
                };

                setUpdateProgressDisplay("inline");

                const editCategoryResponse = await axios.post(`api/v1/admin/updateCategory/${id}`, formData, {headers : headers});
                if(editCategoryResponse.data.status == "CATEGORY_UPDATED"){

                    setUpdateProgressDisplay("none");

                    window.location.href = '/admin/add-new-product';

                }else{
                    setUpdateProgressDisplay("none");

                    alert(editCategoryResponse.data.message);
                }


            }catch(e){
                setUpdateProgressDisplay("none");

                await alert(e.message);
            }
        }else{
            await alert("The field is empty!");
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
                            id="newCategoryName"
                            label="New Category"
                            name="newCategoryName"
                            autoFocus
                            defaultValue={props.category.name}
                        />
                        
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => editCategory(props.category.id)}
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
