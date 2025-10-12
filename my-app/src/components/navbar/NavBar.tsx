import React from "react";
import {Link} from "react-router";


const Navbar: React.FC = () => {
    return (
            <header className="w-full py-4 px-6 bg-white text-white shadow-lg flex justify-between items-center">
                <Link
                    to="/"
                    className="font-semibold py-2 px-2 rounded-full transition-all duration-300"
                >
                    Меню
                </Link>


                <nav className="flex items-center gap-4">
                        <div className="flex items-center">
                            <Link
                                to="/login"
                                className="font-semibold py-2 px-2 rounded-full transition-all duration-300"
                            >
                                Вхід
                            </Link>

                            <span className="text-gray-700">/</span>

                            <Link
                                to="/register"
                                className="font-semibold py-2 px-2 rounded-full transition-all duration-300"
                            >
                                Реєстрація
                            </Link>
                        </div>
                </nav>
            </header>
    );
}


export default Navbar;