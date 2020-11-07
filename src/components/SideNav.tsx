import React, { useEffect, useState } from "react";
import { Menu, Button } from "semantic-ui-react";
import { FcHome, FcMindMap, FcCalculator } from "react-icons/fc";
import { TiShoppingCart } from "react-icons/ti";
import {
  GiTakeMyMoney,
  GiPayMoney,
  GiReceiveMoney,
  GiMoneyStack,
} from "react-icons/gi";
import { AiFillGold } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { SiSamsungpay } from "react-icons/si";
import { GoDiffAdded, GoDiffRemoved } from "react-icons/go";
import Chevron from "../utils/Chevron";
import { Link } from "react-router-dom";

interface ISideNavProps {}

const SideNav: React.FC<ISideNavProps> = () => {
  useEffect(() => {
    console.log("rerendering sidenav");
  }, []);
  const [state, setState] = useState({
    activeMenu: "",
    activeItem: "",
    open: false,
  });
  const [size, setsize] = useState("small");
  const headtems = ["employeeperf", "incentives", "reports", "settings"];
  function handleItemClick(name: string) {
    console.log("called item");
    if (headtems.includes(name)) {
      if (name !== state.activeMenu)
        setState((s) => ({
          activeItem: name,
          activeMenu: name,
          open: true,
        }));
    } else if (!headtems.includes(name))
      setState((s) => ({
        activeItem: name,
        activeMenu: name,
        open: false,
      }));
  }

  function handleItemItemClick(name: string) {
    console.log("called item item");
    setState((s) => ({
      ...s,
      activeItem: name,
      open: true,
    }));
  }

  function changeSize(state: boolean, current: string) {
    if (state) {
      if (current === "mini") setsize("tiny");
      if (current === "tiny") setsize("small");
      if (current === "small") setsize("large");
      if (current === "large") setsize("huge");
      if (current === "huge") setsize("massive");
    } else {
      if (current === "massive") setsize("huge");
      if (current === "huge") setsize("large");
      if (current === "large") setsize("small");
      if (current === "small") setsize("tiny");
      if (current === "tiny") setsize("mini");
    }
  }
  const perfArr = [
    "employeeperf",
    "attendance",
    "salesperf",
    "collectionperf",
    "assesment",
  ];
  const incArr = ["incentives", "incentive", "incentivesheet"];
  const repArr = [
    "reports",
    "salesrep",
    "expenserep",
    "productrep",
    "capitalrep",
    "purchaserep",
    "paymentrep",
    "profitlossrep",
  ];
  const settArr = ["settings", "accounts", "roles", "regions", "branches"];

  return (
    <div
      style={{
        position: "sticky" || "-webkit-sticky",
        top: 0,
        overflowY: "scroll",
        height: "100vh",
      }}
    >
      <Button.Group
        size="mini"
        secondary
        compact
        fluid
        styles={{ borderRadius: 0 }}
      >
        <Button
          onClick={() => changeSize(false, size)}
          styles={{ borderRadius: 0 }}
        >
          <GoDiffRemoved />
        </Button>
        <Button.Or text="size" as="legend" />
        <Button
          onClick={() => changeSize(true, size)}
          styles={{ borderRadius: 0 }}
        >
          <GoDiffAdded />
        </Button>
      </Button.Group>

      <Menu
        vertical
        style={{
          borderRadius: 0,
          margin: 0,
          padding: 0,
          borderTop: "none",
        }}
        size={
          size as
            | "small"
            | "tiny"
            | "mini"
            | "large"
            | "huge"
            | "massive"
            | undefined
        }
      >
        <Menu.Item
          id="home"
          active={state.activeItem === "home"}
          onClick={() => handleItemClick("home")}
        >
          <FcHome /> <span className="sidenavitems">Home</span>
        </Menu.Item>
        <Menu.Item
          id="sales"
          active={state.activeItem === "sales"}
          onClick={() => handleItemClick("sales")}
        >
          <TiShoppingCart />
          <span className="sidenavitems">Sales</span>
        </Menu.Item>
        <Menu.Item
          id="expenses"
          active={state.activeItem === "expenses"}
          onClick={() => handleItemClick("expenses")}
        >
          <GiPayMoney />
          <span className="sidenavitems">Expenses</span>
        </Menu.Item>
        <Menu.Item
          id="payments"
          active={state.activeItem === "payments"}
          onClick={() => handleItemClick("payments")}
        >
          <GiReceiveMoney />
          <span className="sidenavitems">Payments</span>
        </Menu.Item>
        <Menu.Item
          id="purchases"
          active={state.activeItem === "purchases"}
          onClick={() => handleItemClick("purchases")}
        >
          <GiTakeMyMoney />
          <span className="sidenavitems">Purchases</span>
        </Menu.Item>
        <Menu.Item
          id="products"
          active={state.activeItem === "products"}
          onClick={() => handleItemClick("products")}
        >
          <AiFillGold />
          <span className="sidenavitems">Products</span>
        </Menu.Item>
        <Menu.Item
          id="users"
          active={state.activeItem === "users"}
          onClick={() => handleItemClick("users")}
        >
          <FaUsers />
          <span className="sidenavitems">Users</span>
        </Menu.Item>
        <Menu.Item
          id="payroll"
          active={state.activeItem === "payroll"}
          onClick={() => handleItemClick("payroll")}
        >
          <SiSamsungpay />
          <span className="sidenavitems">Payroll</span>
        </Menu.Item>
        <Menu.Item
          id="employeeperf"
          active={state.activeItem === "employeeperf"}
          onClick={() => handleItemClick("employeeperf")}
        >
          <span className="sidenavitems">
            Employee performance{" "}
            <Chevron
              open={state.open}
              active={state.activeItem}
              arr={perfArr}
            />{" "}
          </span>
          {perfArr.includes(state.activeItem) && state.open ? (
            <Menu.Menu>
              <Menu.Item
                icon="calendar check outline"
                name="Attendance"
                id="attendance"
                active={state.activeItem === "attendance"}
                onClick={() => handleItemItemClick("attendance")}
              />
              <Menu.Item
                icon="chart line"
                name="Sales performance"
                id="salesperf"
                active={state.activeItem === "salesperf"}
                onClick={() => handleItemItemClick("salesperf")}
              />
              <Menu.Item
                icon="money"
                name="Collection performance"
                id="collectionperf"
                active={state.activeItem === "collectionperf"}
                onClick={() => handleItemItemClick("collectionperf")}
              />
              <Menu.Item
                icon="calendar alternate"
                name="Monthly assesment"
                id="assesment"
                active={state.activeItem === "assesment"}
                onClick={() => handleItemItemClick("assesment")}
              />
            </Menu.Menu>
          ) : null}
        </Menu.Item>
        <Menu.Item
          id="assets"
          active={state.activeItem === "assets"}
          onClick={() => handleItemClick("assets")}
        >
          <FcMindMap />
          <span className="sidenavitems">Assets</span>
        </Menu.Item>
        <Menu.Item
          id="ror"
          active={state.activeItem === "ror"}
          onClick={() => handleItemClick("ror")}
        >
          <FcCalculator />
          <span className="sidenavitems">ROR calculator</span>
        </Menu.Item>
        <Menu.Item
          id="incentives"
          active={state.activeItem === "incentives"}
          onClick={() => handleItemClick("incentives")}
        >
          <span className="sidenavitems">
            Incentives{" "}
            <Chevron open={state.open} active={state.activeItem} arr={incArr} />{" "}
          </span>
          {incArr.includes(state.activeItem) && state.open ? (
            <Menu.Menu>
              <Menu.Item
                icon="money bill alternate outline"
                name="Incentives"
                id="incentive"
                active={state.activeItem === "incentive"}
                onClick={() => handleItemItemClick("incentive")}
              />
              <Menu.Item
                icon="newspaper"
                name="Incentive sheets"
                id="incentivesheet"
                active={state.activeItem === "incentivesheet"}
                onClick={() => handleItemItemClick("incentivesheet")}
              />
            </Menu.Menu>
          ) : null}
        </Menu.Item>
        <Menu.Item
          id="reports"
          active={state.activeItem === "reports"}
          onClick={() => handleItemClick("reports")}
        >
          <span className="sidenavitems">
            Reports{" "}
            <Chevron open={state.open} active={state.activeItem} arr={repArr} />
          </span>
          {repArr.includes(state.activeItem) && state.open ? (
            <Menu.Menu>
              <Menu.Item
                icon="pie graph"
                name="Sales report"
                id="salesrep"
                active={state.activeItem === "salesrep"}
                onClick={() => handleItemItemClick("salesrep")}
              />
              <Menu.Item
                icon="chart line"
                name="Expense report"
                id="expenserep"
                active={state.activeItem === "expenserep"}
                onClick={() => handleItemItemClick("expenserep")}
              />
              <Menu.Item
                icon="map"
                name="product report"
                id="productrep"
                active={state.activeItem === "productrep"}
                onClick={() => handleItemItemClick("productrep")}
              />
              <Menu.Item
                icon="area graph"
                name="Capital report"
                id="capitalrep"
                active={state.activeItem === "capitalrep"}
                onClick={() => handleItemItemClick("capitalrep")}
              />
              <Menu.Item
                icon="chart bar"
                name="Purchase report"
                id="purchaserep"
                active={state.activeItem === "purchaserep"}
                onClick={() => handleItemItemClick("purchaserep")}
              />
              <Menu.Item
                icon="industry"
                name="Payment report"
                id="paymentrep"
                active={state.activeItem === "paymentrep"}
                onClick={() => handleItemItemClick("paymentrep")}
              />
              <Menu.Item
                icon="chart bar outline"
                name="Profit and loss report"
                id="profitlossrep"
                active={state.activeItem === "profitlossrep"}
                onClick={() => handleItemItemClick("profitlossrep")}
              />
            </Menu.Menu>
          ) : null}
        </Menu.Item>
        <Menu.Item
          id="financial"
          active={state.activeItem === "financial"}
          onClick={() => handleItemClick("financial")}
        >
          <GiMoneyStack />
          <span className="sidenavitems">Financial statements</span>
        </Menu.Item>
        <Menu.Item
          id="settings"
          active={state.activeItem === "settings"}
          onClick={() => handleItemClick("settings")}
        >
          <span className="sidenavitems">
            System settings{" "}
            <Chevron
              open={state.open}
              active={state.activeItem}
              arr={settArr}
            />
          </span>
          {settArr.includes(state.activeItem) && state.open ? (
            <Menu.Menu>
              <Menu.Item
                as={Link}
                to="/accounts"
                icon="address card"
                name="Accounts"
                id="accounts"
                active={state.activeItem === "accounts"}
                onClick={() => handleItemItemClick("accounts")}
              />
              <Menu.Item
                as={Link}
                to="/branches"
                icon="code branch"
                name="Branches"
                id="branches"
                active={state.activeItem === "branches"}
                onClick={() => handleItemItemClick("branches")}
              />
              <Menu.Item
                as={Link}
                to="/roles"
                icon="user secret"
                name="Roles"
                id="roles"
                active={state.activeItem === "roles"}
                onClick={() => handleItemItemClick("roles")}
              />
              <Menu.Item
                as={Link}
                to="/regions"
                icon="map marker alternate"
                name="Regions"
                id="regions"
                active={state.activeItem === "regions"}
                onClick={() => handleItemItemClick("regions")}
              />
            </Menu.Menu>
          ) : null}
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideNav;
