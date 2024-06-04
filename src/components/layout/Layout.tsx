"use client";
import { Layout } from "antd";
import React, { PropsWithChildren } from "react";
import Navbar from "../atoms/navbar/Navbar";
import FooterComponent from "../molecules/footer/Footer";

const { Content, Footer } = Layout;
const Home: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Navbar />
      <Content
        style={{ padding: "0 48px", marginTop: "24px", marginBottom: "40px" }}
      >
        {children}
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default Home;
