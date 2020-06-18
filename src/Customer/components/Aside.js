import React, { Component } from 'react';

 class Header extends Component{

    componentDidMount(){
        
    }

    render(){
        return(
            <aside id="colorlib-hero">
                <div className="flexslider">
                    <ul className="slides">
                    <li style={{backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.80) 25.62%, rgba(0, 0, 0, 0.80) 100%), url(images/img_bg_1.jpg)'}}>
                        <div className="overlay"></div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 col-sm-12 col-xs-12 col-md-offset-3 slider-text">
                                    <div className="slider-text-inner text-center">
                                        <div className="desc">
                                            <span className="icon"><i className="flaticon-cutlery"></i></span>
                                            <h1>Special &amp; Fresh Food</h1>
                                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                            <p><a href="#aladin-menu" className="btn btn-primary btn-lg btn-learn">Eat</a></p>
                                            <div className="desc2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li style={{backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.80) 25.62%, rgba(0, 0, 0, 0.80) 100%), url(images/img_bg_2.jpg)'}}>
                        <div className="overlay"></div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 col-sm-12 col-xs-12 col-md-offset-3 slider-text">
                                    <div className="slider-text-inner text-center">
                                        <div className="desc">
                                            <span className="icon"><i className="flaticon-cutlery"></i></span>
                                            <h1>Exquisite Dishes From Chef</h1>
                                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                            <p><a href="#aladin-menu" className="btn btn-primary btn-lg btn-learn">Eat</a></p>
                                            <div className="desc2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li style={{backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.80) 25.62%, rgba(0, 0, 0, 0.80) 100%), url(images/img_bg_3.jpg)'}}>
                        <div className="overlay"></div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 col-sm-12 col-xs-12 col-md-offset-3 slider-text">
                                    <div className="slider-text-inner text-center">
                                        <div className="desc">
                                            <span className="icon"><i className="flaticon-cutlery"></i></span>
                                            <h1>We are Delicious Restaurant</h1>
                                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                            <p><a href="#aladin-menu" className="btn btn-primary btn-lg btn-learn">Eat</a></p>
                                            <div className="desc2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    </ul>
                    <div className="mouse">
                    <a href="#" className="mouse-icon">
                        <div className="mouse-wheel"></div>
                    </a>
                    </div>
                </div>
            </aside>
        )
    }
}

export default Header;