import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout';
 
class CheckOut extends React.Component {
  
  onToken = (token, addresses) => {
    
    //Create a new form data object
    let formData = new FormData();
    formData.append("stripeEmail", token.email);
    formData.append("stripeToken", token.id);
    formData.append("stripeTokenType", token.type);

    formData.append("stripeBillingName", addresses.billing_name || "");
    formData.append("stripeBillingAddressLine1", addresses.billing_address_line1 || "");
    formData.append("stripeBillingAddressZip", addresses.billing_address_zip || "");
    formData.append("stripeBillingAddressState", addresses.billing_address_state || "");
    formData.append("stripeBillingAddressCity", addresses.billing_address_city || "");
    formData.append("stripeBillingAddressCountry", addresses.billing_address_country || "");
    formData.append("stripeShippingName", addresses.shipping_name || "");
    formData.append("stripeShippingAddressLine1", addresses.shipping_address_line1 || "");
    formData.append("stripeShippingAddressZip", addresses.shipping_address_zip || "");
    formData.append("stripeShippingAddressState", addresses.shipping_address_state || "");
    formData.append("stripeShippingAddressCity", addresses.shipping_address_city || "");
    formData.append("stripeShippingAddressCountry", addresses.shipping_address_country || "");
    formData.append("stripeShippingAddressCountryCode", addresses.shipping_address_country_code || "");

    const headers = {
      
    };

    const response = axios.get('api/v1/stripePayment', formData, {headers : headers});
    
    alert(JSON.stringify(response.data));
  }
 
  render() {
    return (
        <StripeCheckout
            allowRememberMe={false}
            description={this.props.description}
            // image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
            // ComponentClass="button"
            amount={this.props.amount * 1000}
            currency="USD"
            stripeKey="pk_test_UG9wdoovt7eYOgnqmdKismd1"
            locale="auto"
            billingAddress={true}
            zipCode={false}
            token={this.onToken}>
            <button class="btn btn-primary">
              Checkout
            </button>
        </StripeCheckout>
    )
  }
}

export default CheckOut;