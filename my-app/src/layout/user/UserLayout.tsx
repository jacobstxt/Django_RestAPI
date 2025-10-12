import React from "react";
import { Layout } from "antd";
import Navbar from "../../components/navbar/NavBar.tsx";
import {Outlet} from "react-router";
const { Content, Footer } = Layout;

const UserLayout: React.FC = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Navbar/>
            <Content style={{ marginTop: "2rem" }}>
                <Outlet />
            </Content>
            <Footer style={{ textAlign: "center" }}>
                © 2025 MyApp
            </Footer>
        </Layout>
    );
};

export default UserLayout;
