import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthRoute from "./utils/AuthRoute";
import UnAuthRoute from "./utils/UnAuthRoute";
import home from "./pages/home";
import login from "./pages/login";
import { Provider } from "urql";
import forgot_password from "./pages/forgot-password";
import reset_password from "./pages/reset-password";
import client from "./utils/CreateUrqlClient";
import Regions from "./pages/regions";
import Accounts from "./pages/accounts";
import Roles from "./pages/roles";
import Branches from "./pages/branches";
import Assets from "./pages/assets";
import Products from "./pages/products";
import Purchases from "./pages/purchases";
import ROR from "./pages/ror";
import Users from "./pages/users";
import Expenses from "./pages/expenses";
import Sales from "./pages/sales";

function App() {
  return (
    <div className="App">
      <Provider value={client}>
        <Router>
          <Switch>
            <AuthRoute exact path="/" component={home} />
            <AuthRoute exact path="/regions" component={Regions} />
            <AuthRoute exact path="/accounts" component={Accounts} />
            <AuthRoute exact path="/roles" component={Roles} />
            <AuthRoute exact path="/branches" component={Branches} />
            <AuthRoute exact path="/assets" component={Assets} />
            <AuthRoute exact path="/expenses" component={Expenses} />
            <AuthRoute exact path="/ror" component={ROR} />
            <AuthRoute exact path="/users" component={Users} />
            <AuthRoute exact path="/purchases" component={Purchases} />
            <AuthRoute exact path="/sales" component={Sales} />
            <AuthRoute exact path="/products" component={Products} /> 
            <UnAuthRoute exact path="/login" component={login} />
            <UnAuthRoute
              exact
              path="/forgot-password"
              component={forgot_password}
            />
            <UnAuthRoute
              exact
              path="/reset-password"
              component={reset_password}
            />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
