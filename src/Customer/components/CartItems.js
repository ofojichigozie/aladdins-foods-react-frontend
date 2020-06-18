import React from 'react';
import { connect } from 'react-redux'
import Checkout from './Checkout'
import { removeItem,addQuantity,subtractQuantity} from 'ReduxComponents/actions/cartActions'

class CartItems extends React.Component{

    //to remove the item completely
    handleRemove = (id)=>{ alert("Removing");
        this.props.removeItem(id);
    }

    //to add the quantity
    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }

    //to substruct from the quantity
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }

    render(){
        if(this.props.addedItems.length > 0){
            return(
                <div style={{marginTop: '15px', margin: '15px auto', width: '60%', overflowY: ''}}>
                    <div>
                        <div style={{textAlign: 'center', color: '#88000'}}>
                            <h3>Your Cart</h3>
                        </div>
                        <table className="table table-striped table-responsive text-dark">
                            <thead className="">
                                <th className="">S/N</th>
                                <th className="">Product</th>
                                <th className="">Quantity</th>
                                <th className="">Unit Price</th>
                                <th className="">Total</th>
                                <th></th>
                            </thead>
                            <tbody>
                            { 
                                this.props.addedItems.map((item, index) => {
                                    return (
                                        <tr key={index} style={{borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                                            <td style={{ padding: '35px', textAlign: 'center'}}>{index + 1}</td>
                                            <td style={{ padding: '35px', textAlign: 'center'}}>
                                                <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
                                                    <img src={`/Uploads/ProductImages/${item.image_name}`} style={{ width: '65px', height: 'auto', borderRadius: '5px'}}/>
                                                 {item.name}
                                                </div>
                                            </td>
                                            <td style={{ padding: '35px', textAlign: 'center'}}>{item.quantity}</td>
                                            <td style={{ padding: '35px', textAlign: 'center'}}>{item.price}</td>
                                            <td style={{ padding: '35px', textAlign: 'center'}}>{item.price * item.quantity}</td>
                                            <td style={{ padding: '35px', textAlign: 'center'}}>
                                                <span className=""><i className="icon-trash" style={{ color: 'red'}} onClick={(e) => this.handleRemove(item.id)}></i></span>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><h5>Total: ${this.props.total}</h5></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                        <div style={{ display: 'flex', aligItems: 'center', justifyContent: 'flex-end', margin: '5px'}}>
                            <Checkout amount={this.props.total} description={JSON.stringify(this.props.addedItems)}/>
                        </div>
                    </div>
                    
                </div>
            )
        }else{
            return(
                <div>
                    <div style={{textAlign: 'center', color: '#000000', marginTop: '15px'}}>
                        <h4>Your Cart</h4>
                    </div>
                    <div style={{textAlign: 'center', color: '#88000'}}>
                        <p>No available meals</p>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state)=>{
    return{
        items: state.addedItems,
        addedItems: state.addedItems,
        total: state.total
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CartItems)