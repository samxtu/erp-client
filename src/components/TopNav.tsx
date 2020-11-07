import React, { useEffect } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { useLogoutMutation } from "../generated/graphql";
import { SiMicrosoftonenote } from "react-icons/si";

interface ITopNavProps {}

const TopNav: React.FC<ITopNavProps> = () => {
  useEffect(() => {
    console.log("rerendering topnav");
  }, []);
  const [, Logout] = useLogoutMutation();
  function gotonotes() {}
  return (
    <Menu style={{ borderRadius: 0, margin: 0, padding: 0 }}>
      <Menu.Item header>Halisia</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name="Notes" onClick={gotonotes}>
          <SiMicrosoftonenote />
          Notes
        </Menu.Item>
        <Menu.Item name="Logout" onClick={() => Logout()}>
          <Icon name="log out" />
          Logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default TopNav;
