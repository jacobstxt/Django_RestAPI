import React from "react";
import {Link, useNavigate} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReddit} from "@fortawesome/free-brands-svg-icons";
import {APP_ENV} from "../../env";
import {useAppDispatch, useAppSelector} from "../../store";
import {clearTokens} from "../../store/authSlice.ts";



const Navbar: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearTokens());
        navigate("/login");
    };

    return (
        <header className="w-full py-2 px-6 bg-gray-900 shadow-md flex justify-between items-center">
            <div className="hidden items-center gap-1 lg:flex">
                <FontAwesomeIcon className={'text-4xl text-purple-500'} icon={faReddit} />
                <Link to="/" className="text-2xl font-semibold font-['Comic_Sans_MS']">
                    reddit
                </Link>
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <div className="flex items-center gap-3">
                            {user.image && (
                                <img
                                    src={APP_ENV.IMAGE_BASE_URL + user.image}
                                    alt={user.username}
                                    className="w-8 h-8 rounded-full border border-white"
                                />
                            )}
                            <div className="flex flex-col leading-tight">
                                <span className="font-medium">{user.username}</span>
                                <span className="text-xs text-gray-200">{user.email}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
                        >
                            Вихід
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="bg-purple-500 px-4 py-2 rounded-full hover:bg-purple-800 transition"
                        >
                            Вхід
                        </Link>
                        <Link
                            to="/register"
                            className="bg-gray-600 px-4 py-2 rounded-full hover:bg-gray-700 transition"
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