import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

const AuthRoute = ({ component: Component, ...rest }: any) => {
  const [{ data, fetching }] = useMeQuery();
  useEffect(() => {
    console.log("Checking if authenticated", data?.me);
  }, [data, fetching]);
  return (
    <Route
      {...rest}
      render={(props) =>
        data?.me?.id ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
