import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
} from "react-router-dom";

import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeForm from './StripeForm';

function StripeWrapper(props) {
    let location = useLocation();
    const params = new URLSearchParams(location.search);
    const pk = params.get('pk') || 'pk_test_TYooMQauvdEDq54NiTphI7jx';
    return (
        <StripeProvider apiKey={pk}>
            <Elements>
                <StripeForm theme={params.get('theme')}/>
            </Elements>
        </StripeProvider>
    )
}

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <StripeWrapper/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
