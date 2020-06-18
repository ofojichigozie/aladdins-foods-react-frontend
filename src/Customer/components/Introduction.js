import React, { Component } from 'react';

 class Introduction extends Component{

    componentDidMount(){
        
    }

    render(){
        return(
            <div className="colorlib-intro">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 text-center">
                            <div className="intro animate-box">
                                <span className="icon">
                                    <i className="icon-map4"></i>
                                </span>
                                <h2>Address</h2>
                                <p>198 West 21th Street, Suite 721 New York NY 10016</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 text-center">
                            <div className="intro animate-box">
                                <span className="icon">
                                    <i className="icon-clock4"></i>
                                </span>
                                <h2>Opening Time</h2>
                                <p>Monday - Sunday</p>
                                <span>8am - 9pm</span>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 text-center">
                            <div className="intro animate-box">
                                <span className="icon">
                                    <i className="icon-mobile2"></i>
                                </span>
                                <h2>Phone</h2>
                                <p>+ 001 234 567</p>
                                <p>+ 001 234 567</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 text-center">
                            <div className="intro animate-box">
                                <span className="icon">
                                    <i className="icon-envelope"></i>
                                </span>
                                <h2>Email</h2>
                                <p><a href="#">info@domain.com</a><br/><a href="#">luto@email.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Introduction;