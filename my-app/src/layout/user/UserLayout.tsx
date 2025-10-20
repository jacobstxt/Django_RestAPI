import React from "react";
import { Outlet} from "react-router";
import TopicsSideBar from "../../components/sidebar/TopicsSideBar.tsx";
import Navbar from "../../components/navbar/NavBar.tsx";

const UserLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <Navbar/>

            <main className="flex flex-1 gap-6 bg-gray-50 dark:bg-gray-900">
                <TopicsSideBar />
                <div className="flex-1">
                    <Outlet />
                </div>
            </main>

            <footer className="w-full py-3 px-6 text-sm text-center bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
                © 2025 Reddit
            </footer>

        </div>
    );
};

export default UserLayout;
