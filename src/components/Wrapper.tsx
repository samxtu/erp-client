import * as React from "react";
import { GetUserQuery, MeQuery, User } from "../generated/graphql";
import SideNav from "./SideNav";
import TopNav from "./TopNav";

interface IWrapperProps {
  me: any;
}

export const MeContext = React.createContext<User|undefined>(undefined);

export const Wrapper: React.FC<IWrapperProps> = ({ me, children }) => {

  return (
    <>
    <MeContext.Provider value={me}>
      <TopNav />
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          margin: 0,
          padding: 0,
        }}
      >
        <SideNav />
        <div style={{ flex: 1 }}>{children}</div>
      </div>
      </MeContext.Provider>
    </>
  );
};
