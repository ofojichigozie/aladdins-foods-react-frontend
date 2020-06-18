import React from 'react';
import CartItems from './components/CartItems';
import Header from './components/Header'

class Cart extends React.Component {
  render(){
    return(
      <div>
            {/* <Navigation/> */}
                <div id="colorlib-page">
                    <Header/>
                    <div style={{height: '100px', backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.80) 25.62%, rgba(0, 0, 0, 0.80) 100%), url(images/img_bg_1.jpg)'}}>

                    </div>
                    <CartItems/>
                </div>
            {/* <Footer/> */}
      </div>
    )
  }
}

export default Cart;
