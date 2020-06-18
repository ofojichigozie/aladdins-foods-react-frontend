import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart, fetchItemsFromServer } from 'ReduxComponents/actions/cartActions'
import axios from 'axios'

 class Menu extends Component{

    handleAddToCart = (id)=>{
        this.props.addToCart(id); 
    }

    addFetchedServerItemsToAppState = (items) =>{
        this.props.fetchItemsFromServer(items);
    }

    componentDidMount(){
        let thisApp = this;

        (async function(){
            try{
                const headers = {
                    // 
                };

                const getProductsResponse = await axios.get('api/v1/admin/readProducts', {headers : headers}); console.log(getProductsResponse);
                if(getProductsResponse.data.status == "PRODUCTS_FOUND"){
                    //If products are read, set response data to applicatin level state
                    thisApp.addFetchedServerItemsToAppState(getProductsResponse.data.data);
                }else{
                    thisApp.addFetchedServerItemsToAppState([]);
                }
            }catch(e){
                alert(e.message);
            }
        })();

    }

    render(){
        let categories = this.props.items.map((item, index) => {
            return item.category
        });

        let distinctCategories = categories.filter((item, pos, ar) => {
            return ar.indexOf(item) === pos;
        });

        return(
            <div className="colorlib-menu" id="aladin-menu">
                <div className="container">
                    <div className="colorlib-menu-2">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 text-center animate-box intro-heading">
                                <span className="icon"><i className="flaticon-cutlery"></i></span>
                                <h2>Aladdins' Menu</h2>
                                <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 animate-box">
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <ul className="nav nav-tabs text-center" role="tablist">
                                            {
                                                distinctCategories.map((distinctCategory, index) => {
                                                    return <li key={index} role="presentation" className={index === 0 ? 'active' : ''}><a href={`#${distinctCategory}`} aria-controls={`${distinctCategory}s`} role="tab" data-toggle="tab">{distinctCategory}</a></li>
                                                })
                                            }
                                            {/* <li role="presentation" className="active"><a href="#main" aria-controls="mains" role="tab" data-toggle="tab">Main</a></li>
                                            <li role="presentation"><a href="#desserts" aria-controls="desserts" role="tab" data-toggle="tab">Desserts</a></li>
                                            <li role="presentation"><a href="#drinks" aria-controls="drinks" role="tab" data-toggle="tab">Drinks</a></li> */}
                                        </ul>
                                    </div>
                                </div>
                                <div className="tab-content">
                                    {
                                        distinctCategories.map((distinctCategory, index) => {
                                            return(
                                                <div key={index} role="tabpanel" className={'tab-pane ' + (index == 0 ? 'active' : '')} id={`${distinctCategory}`}>
                                                    <div className="row">
                                                        {/* ITERATION WILL BE DONE TO RETRIEVE MEALS FROM EACH */}
                                                        {
                                                            this.props.items.map((item, index) => {
                                                                if(item.category == distinctCategory){
                                                                    return (
                                                                        <div key={index} className="col-md-3 col-xs-12" style={{marginTop: '10px'}}>
                                                                            <div style={{ height: '300px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                                                                                <div className="card-media" style={{ backgroundImage: `url(/Uploads/ProductImages/${item.image_name})`, width: '100%', height: '70%', backgroundSize: 'cover', textAlign: 'center'}}>
                                                                                    <button className="btn btn-warning" style={{borderRadius: '6px', marginTop: '-20px', fontSize: '18pt', color: '#A00'}} onClick={() => {this.handleAddToCart(item.id)}}>+</button>
                                                                                </div>
                                                                                <div className="card-details" style={{height: '30%', padding: '6px'}}>
                                                                                    <span style={{fontWeight: 'bold', color: '#A00'}}>{item.name}</span> / {item.description.substr(0, 10)}... <br/> <span style={{fontWeight: 'bold', color: '#0A0'}}>${item.price}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                        
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {/* <div role="tabpanel" className="tab-pane active" id="main">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div style={{ height: '300px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                                                    <div className="card-media" style={{ backgroundImage: 'url(images/dish-14.jpg)', width: '100%', height: '70%', backgroundSize: 'cover'}}>
                                                        <button className="btn btn-danger" style={{borderRadius: '0px'}}>+Add</button>
                                                    </div>
                                                    <div className="card-details" style={{height: '30%', padding: '4px'}}>
                                                        <span style={{fontWeight: 'bold'}}>Sunny sideup egg</span> / The best meal ever / <span style={{fontWeight: 'bold'}}>$50.50</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }
const mapDispatchToProps= (dispatch)=>{
    return{
        addToCart: (id)=>{dispatch(addToCart(id))},
        fetchItemsFromServer: (items)=>{dispatch(fetchItemsFromServer(items))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);