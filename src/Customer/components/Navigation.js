import React, { Component } from 'react';
import { Link } from 'react-router-dom'

 class Navigation extends Component{

    componentDidMount(){
        
    }

    render(){
        return(
            <nav id="colorlib-main-nav" role="navigation">
                <a href="#" className="js-colorlib-nav-toggle colorlib-nav-toggle active"><i></i></a>
                <div className="js-fullheight colorlib-table">
                    <div className="colorlib-table-cell js-fullheight">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3">
                                <div className="form-group">
                                    <input type="text" className="form-control" id="search" placeholder="Enter any key to search..."/>
                                    <button type="submit" className="btn btn-primary"><i className="icon-search3"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <ul>
                                    <li className="active"><Link to="/">Home</Link></li>
                                    <li><Link to="/">Menus</Link></li>
                                    <li><Link to="/cart">My Cart</Link></li>
                                    <li><Link to="/">About us</Link></li>
                                    <li><Link to="/">Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navigation;