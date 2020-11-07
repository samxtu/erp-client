import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import { Wrapper } from "../components/Wrapper";

interface IUARProps {
  exact: boolean;
  path: string;
  component: React.FC;
}

const UnAuthRoute: React.FC<IUARProps> = ({
  component: Component,
  ...rest
}: any) => {
  const [{ data, fetching }] = useMeQuery();
  useEffect(() => {
    console.log("Checking if authenticated", data?.me);
  }, [data, fetching]);
  return (
    <Route
      {...rest}
      render={(props) =>
        data?.me?.id ? (
          <Wrapper>
            <Component {...props} />
          </Wrapper>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default UnAuthRoute;
