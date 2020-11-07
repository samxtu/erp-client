import * as React from "react";
import SideNav from "./SideNav";
import TopNav from "./TopNav";

interface IWrapperProps {}

export const Wrapper: React.FC<IWrapperProps> = ({ children }) => {
  return (
    <>
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
    </>
  );
};
