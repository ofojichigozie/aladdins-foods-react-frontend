import React, { Component } from 'react';

 class Footer extends Component{

    componentDidMount(){
        
    }

    render(){

        return(
            <footer>
                <div id="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-pb-sm">
                                <h2>Aladin Foods</h2>
                                <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind.</p>
                                <p className="colorlib-social-icons">
                                    <a href="/"><i className="icon-facebook4"></i></a>
                                    <a href="/"><i className="icon-twitter3"></i></a>
                                    <a href="/"><i className="icon-googleplus"></i></a>
                                    <a href="/"><i className="icon-dribbble2"></i></a>
                                </p>
                            </div>
                            <div className="col-md-3 col-pb-sm">
                                <h2>Latest Blog</h2>
                                <div className="f-entry">
                                    <a href="/" aria-hidden="true" className="featured-img" style={{backgroundImage: 'url(images/dish-5.jpg)'}}>.</a>
                                    <div className="desc">
                                        <span>May 5, 2018</span>
                                        <h3><a href="/">How to cook beef Grilled with potato</a></h3>
                                    </div>
                                </div>
                                <div className="f-entry">
                                    <a href="/" className="featured-img" style={{ backgroundImage: 'url(images/dish-7.jpg)'}}>.</a>
                                    <div className="desc">
                                        <span>May 5, 2018</span>
                                        <h3><a href="/">A Japanese Master Chef</a></h3>
                                    </div>
                                </div>
                                <div className="f-entry">
                                    <a href="/" className="featured-img" style={{ backgroundImage: 'url(images/dessert-3.jpg)'}}>.</a>
                                    <div className="desc">
                                        <span>May 5, 2018</span>
                                        <h3><a href="/">Special Recipe for this month</a></h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-pb-sm">
                                <h2>Instagram</h2>
                                <div className="instagram">
                                    <a href="/" className="insta-img" style={{ backgroundImage: 'url(images/dessert-1.jpg)'}}>.</a>
                                    <a href="/" className="insta-img" style={{ backgroundImage: 'url(images/dessert-2.jpg)'}}>.</a>
                                    <a href="/" className="insta-img" style={{ backgroundImage: 'url(images/dish-9.jpg)'}}>.</a>
                                    <a href="/" className="insta-img" style={{ backgroundImage: 'url(images/dish-2.jpg)'}}>.</a>
                                </div>
                            </div>
                            <div className="col-md-3 col-pb-sm">
                                <h2>Newsletter</h2>
                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia</p>
                                <div className="subscribe text-center">
                                    <div className="form-group">
                                        <input type="text" className="form-control text-center" placeholder="Enter Email address"/>
                                        <input type="submit" value="Subscribe" className="btn btn-primary btn-custom"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <p>
                                    <span className="block">&copy;
                                    Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | <a href="/">Aladdins Food</a>
                                    <br/></span> 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;