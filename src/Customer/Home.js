import React, { Component } from 'react';
import Header from './components/Header'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Aside from './components/Aside'
import Introduction from './components/Introduction'
import Menu from './components/Menu'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

 class Home extends Component{
    
    render(){

        return(
            <div>
                <Navigation/>
                <div id="colorlib-page">
                    <Header/>
                    <Aside/>
                    <Introduction/>
                    <div style={{height: '200px', background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.90) 25.62%, rgba(0, 0, 0, 0.75) 100%), url(images/cover_bg_2.jpg)'}}>

                    </div>
                    <Menu/>
                </div>
                <Footer/>

                <div style={{position: 'fixed', top: '0', right: '0', margin: '3% 5% 0 0'}}>
                    <Link to="/cart" style={{ textDecoration: 'none'}}>
                        <i className="icon-cart" style={{ fontSize: '18pt', color: '#FFF', textShadow: '0 0 4px red'}}></i>
                        <span style={{ backgroundColor: '#F00', fontSize: '8pt', color: '#FFF', padding: '2px 8px', borderRadius: '50%', position: 'relative', top: '-20px', left: '-10px'}}>{this.props.addedItems.length}</span>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        addedItems: state.addedItems
    }
}

export default connect(mapStateToProps)(Home)