import React from "react";
import { Layout } from "antd";
// import Navbar from "../../components/navbar/NavBar.tsx";
import { Outlet} from "react-router";
import TopicsSideBar from "../../components/sidebar/TopicsSideBar.tsx";

const {Footer } = Layout;
import Navbar from "../../components/navbar/NavBar.tsx";

const UserLayout: React.FC = () => {



    return (
        <div className="min-h-screen flex flex-col">

        <Layout style={{ minHeight: "100vh" }}>
            <Navbar/>

            <main className="flex flex-1 p-6 gap-6">
                <TopicsSideBar />
                <div className="flex-1 ml-64">
                    <Outlet />
                </div>
            </main>

            <Footer style={{ textAlign: "center" }}>
                © 2025 Reddit
            </Footer>
        </Layout>

        </div>
    );
};

export default UserLayout;
