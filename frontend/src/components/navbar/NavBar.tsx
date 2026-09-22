import React from "react";
import {Link, useNavigate} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReddit} from "@fortawesome/free-brands-svg-icons";
import {useAppDispatch, useAppSelector} from "../../store";
import {clearTokens} from "../../store/authSlice.ts";
import {ThemeToggleButton} from "../buttons/ThemeToggleButton.tsx";
import {APP_ENV} from "../../env";



const Navbar: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearTokens());
        navigate("/login");
    };

    console.log("Redux user:", user);


    return (
        <header className="w-full py-2 px-6 bg-gray-50 dark:bg-gray-900 shadow-md flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
            <div className="hidden items-center gap-1 lg:flex">
                <FontAwesomeIcon className={'text-4xl text-purple-500 dark:text-purple-400'} icon={faReddit} />
                <Link to="/" className="text-2xl font-semibold font-['Comic_Sans_MS'] text-gray-900 dark:text-white">
                    reddit
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <ThemeToggleButton />
                {user ? (
                    <>
                        <div className="flex items-center gap-3">
                            {user.image_small && (
                                <img
                                    src={APP_ENV.IMAGE_BASE_URL + user.image_small}
                                    alt={user.username}
                                    className="w-8 h-8 rounded-full border border-gray-300 dark:border-white"
                                />
                            )}
                            <div className="flex flex-col leading-tight">
                                <span className="font-medium text-gray-900 dark:text-white">{user.username}</span>
                                <span className="text-xs text-gray-600 dark:text-gray-200">{user.email}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                            Вихід
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="bg-purple-500 dark:bg-purple-600 px-4 py-2 rounded-full hover:bg-purple-600 dark:hover:bg-purple-700 transition text-white"
                        >
                            Вхід
                        </Link>
                        <Link
                            to="/register"
                            className="bg-gray-600 dark:bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition text-white"
                        >
                            Реєстрація
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}


export default Navbar;