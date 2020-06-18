import React, { Component } from 'react';
import { Link } from 'react-router-dom'

 class Header extends Component{

    componentDidMount(){
        
    }

    render(){
        return(
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="colorlib-navbar-brand">
                                <Link className="colorlib-logo" to="/"><i className="flaticon-cutlery"></i><span> Aladdins</span><span>Food</span></Link>
                            </div>
                            {/* <a href="#" className="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a> */}
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;