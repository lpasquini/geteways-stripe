import React, {Component} from 'react';
import {injectStripe, CardNumberElement, CardExpiryElement, CardCvcElement} from 'react-stripe-elements';

import './StripeForm.scss';

const createOptions = (fontSize, padding) => {
    return {
        style: {
            base: {
                fontSize,
                color: '#000',
                letterSpacing: '0',
                fontFamily: 'Poppins, sans-serif',
                '::placeholder': {
                    color: '#aab7c4',
                },
                ...(padding ? {padding} : {}),
            },
            invalid: {
                color: '##E60023',
            },
        },
    };
};

class StripeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {complete: false};
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        let {token} = await this.props.stripe.createToken({name: "Name"});
        console.log('token', token);
    }

    handleBlur = () => {
        console.log('[blur]');
    }
    handleChange = (change) => {
        console.log('[change]', change);
    }
    handleClick = () => {
        console.log('[click]');
    }
    handleFocus = () => {
        console.log('[focus]');
    }
    handleReady = () => {
        console.log('[ready]');
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        if (this.props.stripe) {
            // this.props.stripe
            //     .createToken()
            //     .then((payload) => console.log('[token]', payload));

            this.props.stripe.createSource({ type: 'card' }).then(function(result) {
                if (result.source) {
                    window.ReactNativeWebView.postMessage(result.source.id);
                }
            });
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    };

    render() {

        if (this.state.complete) return <h1>Purchase Complete</h1>;
        const { theme } = this.props;

        return (
            <div className={theme}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Card number</span>
                        <CardNumberElement
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            onReady={this.handleReady}
                            {...createOptions(this.props.fontSize)}
                        />
                    </label>
                    <div className="row"> 
                        <label className="col-6">
                            <span>Expiration date</span>
                            <CardExpiryElement
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onReady={this.handleReady}
                                {...createOptions(this.props.fontSize)}
                            />
                        </label>
                        <label className="col-6">
                            <span>CVC</span>
                            <CardCvcElement
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onReady={this.handleReady}
                                {...createOptions(this.props.fontSize)}
                            />
                        </label>
                    </div>
                    <button>Payment</button>
                </form>
            </div>
        );
    }
}

export default injectStripe(StripeForm);