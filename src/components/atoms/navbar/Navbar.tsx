"use client";
import React from "react";
import { Layout, Menu, MenuProps, theme } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import { AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Link from "next/link";
import ToggleTheme from "../toggle-theme/ToggleTheme";
import { useTheme } from "next-themes";
import { useAppSelector } from "@/redux/store";

const { Header, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: any[] = [
  {
    key: "home",
    label: "Home",
    link: "/home",
    icon: <AppstoreOutlined />,
  },
  {
    key: "products",
    label: "Products",
    link: "/products",
    icon: <AppstoreOutlined />,
  },
  {
    key: "cart",
    label: "Cart",
    link: "/cart",
    icon: <ShoppingCartOutlined />,
  },
];

const cartCountFormatter = (txt: number) => (txt > 99 ? "99+" : txt);

const App: React.FC = () => {
  const { theme } = useTheme();
  const cartState = useAppSelector((state) => state.cart);
  const cartLength = cartState?.items?.length;

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: theme === "dark" ? "#001529" : "#fff",
      }}
    >
      <div className="demo-logo">
        <p
          className={`font-medium ${theme === "light" ? "text-black-100" : "text-white"}`}
        >
          LOGO
        </p>
      </div>
      <Menu
        theme={theme === "dark" ? "dark" : "light"}
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        // items={items}
        style={{ width: "500px", minWidth: 0 }}
      >
        {items.map((item) => (
          <MenuItem key={item.key} icon={item.icon}>
            {item.key === "cart" && (
              <div className="absolute left-8 top-5 rounded-full bg-red-500 h-5 w-5 flex items-center justify-center">
                <span
                  className="text-white text-xs font-medium"
                  style={{ fontSize: "8px" }}
                >
                  {cartCountFormatter(cartLength)}
                </span>
              </div>
            )}
            <Link href={item.link}>
              {item.key === "cart" ? "" : item.label}
            </Link>
          </MenuItem>
        ))}
        <MenuItem key="togle" className="bg-transparent hover:bg-transparent">
          <ToggleTheme />
        </MenuItem>
      </Menu>
    </Header>
  );
};

export default App;
