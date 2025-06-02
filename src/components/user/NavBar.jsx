import {
    Navbar,
    Collapse,
    Button,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import { FaHome, FaStore, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDarkMode, MdLightMode, MdClose, MdMenu } from "react-icons/md";
import { Avatar } from "@material-tailwind/react";
import Swal from "sweetalert2";

const NavBar = ({
    cartItems,
    setCartIndex,
    cartIndex,
    userDataNow,
    setIsLogged,
    islogged,
    setUserProfile,
    userProfile,
    isConfirmEdit,
    userDataInNav,
    userRole
}) => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [openNav, setOpenNav] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) setOpenNav(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
        localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const toggleMode = useCallback(() => {
        setIsDarkMode(prevMode => !prevMode);
    }, []);

    const navLinks = [
        {
            to: "/",
            label: "Home",
            icon: <FaHome className="text-lg" />
        },
        {
            to: "/Products",
            label: "Shop",
            icon: <FaStore className="text-lg" />
        },
        {
            to: "/Cart",
            label: "Your Cart",
            icon: (
                <div className="relative">
                    <FaCartShopping className="text-lg" />
                    {cartItems.length > 0 && islogged == true && (
                        <span
                            className={`absolute -top-[0.9rem] -right-[1rem] text-xs px-1.5 py-0.5 rounded-full ${
                                isDarkMode
                                    ? "bg-[#8DD8FF] text-[#0E2148]"
                                    : "bg-red-500 text-white"
                            }`}>
                            {cartIndex}
                        </span>
                    )}
                </div>
            )
        }
    ];

    useEffect(() => {
        setCartIndex(cartItems.length);
    }, [cartItems, setCartIndex]);

    const findUser = userDataNow.find(
        user => user.id === Number(localStorage.userId)
    );

    useEffect(() => {
        setUserProfile(findUser);
    }, [userDataNow, userProfile]);

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, log me out!",
            cancelButtonText: "No, cancel",
            background: isDarkMode ? "#0E2148" : "#fff",
            color: isDarkMode ? "#8DD8FF" : "#000",
            confirmButtonColor: "#d33",
            cancelButtonColor: isDarkMode ? "#132C50" : "#3085d6",
            buttonsStyling: true,
            customClass: {
                popup: isDarkMode ? "swal2-dark-popup" : "",
                confirmButton: "swal2-confirm-btn",
                cancelButton: "swal2-cancel-btn"
            }
        }).then(result => {
            if (result.isConfirmed) {
                localStorage.removeItem("userId");
                setIsLogged(false);
                navigate("/");
                Swal.fire({
                    title: "Logged out!",
                    icon: "success",
                    background: isDarkMode ? "#0E2148" : "#fff",
                    color: isDarkMode ? "#8DD8FF" : "#000",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    // Check if localStorage.userId exists and is not empty
    const isUserLoggedIn = localStorage.userId && localStorage.userId !== "";

    const renderNavLinks = (isMobile = false) => (
        <>
            {navLinks.map(({ to, label, icon }) => (
                <Link
                    key={to}
                    to={to}
                    onClick={() => isMobile && setOpenNav(false)}
                    className={`flex items-center gap-2 transition-colors duration-300 ${
                        isMobile ? "py-2 border-b" : ""
                    } ${
                        isDarkMode
                            ? "text-[#8DD8FF] hover:text-white border-[#1c2f57]"
                            : "text-gray-700 hover:text-red-600 border-gray-200"
                    }`}>
                    {icon}
                    <span className="font-medium">{label}</span>
                </Link>
            ))}
            <button
                onClick={toggleMode}
                className={`flex items-center gap-2 ${
                    isMobile ? "py-2 border-b" : ""
                } transition-colors duration-300 ${
                    isDarkMode
                        ? "text-[#8DD8FF] hover:text-white border-[#1c2f57]"
                        : "text-gray-700 hover:text-red-600 border-gray-200"
                }`}>
                {isDarkMode ? (
                    <MdLightMode className="text-lg" />
                ) : (
                    <MdDarkMode className="text-lg" />
                )}
                <span className="font-medium">
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                </span>
            </button>
        </>
    );

    const userMenuContent = (
        <MenuList
            className={`p-2 shadow-lg border-none ${
                isDarkMode ? "bg-[#102C57]" : "bg-white"
            }`}>
            {/* Welcome User MenuItem */}
            <MenuItem
                onClick={() => {
                    navigate("/profile");
                    setOpenNav(false);
                }}
                // Apply specific styles for text and hover background
                className={`${
                    isDarkMode
                        ? "text-[#8DD8FF] hover:bg-[#1c2f57]"
                        : "text-gray-800 hover:bg-gray-100"
                }`}>
                Welcome {findUser?.name}
            </MenuItem>

            {/* Dashboard for admin */}

            {userRole == "admin" && (
                <MenuItem
                    onClick={() => {
                        navigate("/Admin");
                        setOpenNav(false);
                    }}
                    // Apply specific styles for text and hover background
                    className={`${
                        isDarkMode
                            ? "text-[#8DD8FF] hover:bg-[#1c2f57]"
                            : "text-gray-800 hover:bg-gray-100"
                    }`}>
                    Dashboard
                </MenuItem>
            )}

            {/* Sign Out MenuItem */}
            <MenuItem
                onClick={handleLogout}
                // Ensure text is always red, and only background changes on hover
                className={`flex items-center gap-2 text-red-600 ${
                    isDarkMode ? "hover:bg-red-900" : "hover:bg-red-50"
                }`}>
                <FaSignOutAlt /> Sign out
            </MenuItem>
        </MenuList>
    );

    return (
        <Navbar
            fullWidth
            className={`fixed top-0 z-50 transition-transform duration-300 ${
                showNavbar ? "translate-y-0" : "-translate-y-full"
            } ${
                isDarkMode
                    ? "bg-[#0E2148] border-b border-[#1c2f3a]"
                    : "bg-white border-b border-gray-200"
            }`}>
            <div className="container mx-auto px-6 py-3 ">
                <div className="flex items-center justify-between ">
                    <Link
                        to="/"
                        className={`playwrite font-bold text-3xl ${
                            isDarkMode ? "text-[#8DD8FF]" : "text-gray-900"
                        }`}>
                        Shyaka
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        {renderNavLinks()}
                        {isUserLoggedIn ? ( // Use the new check here
                            <Menu placement="bottom-end">
                                <MenuHandler>
                                    <div
                                        className={`flex items-center gap-2 px-3 py-1 cursor-pointer rounded-full shadow-lg transition-all duration-300 ${
                                            isDarkMode
                                                ? "bg-[#102C57] text-[#132C50] hover:bg-[#153b71]"
                                                : "bg-red-400 hover:bg-red-500"
                                        }`}>
                                        {!findUser ? (
                                            <span className="loader"></span>
                                        ) : (
                                            <>
                                                <Avatar
                                                    src={
                                                        isConfirmEdit
                                                            ? userDataInNav.img
                                                            : findUser?.img
                                                    }
                                                    alt="User"
                                                    size="sm"
                                                />

                                                <span
                                                    className={`font-medium ${
                                                        isDarkMode
                                                            ? "text-[#8DD8FF]"
                                                            : "text-white"
                                                    }`}>
                                                    {isConfirmEdit
                                                        ? userDataInNav.name
                                                        : findUser?.name}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </MenuHandler>
                                {userMenuContent}
                            </Menu>
                        ) : (
                            <Link to="/Login">
                                <Button
                                    variant="filled"
                                    size="sm"
                                    className={`flex items-center gap-2 rounded-full px-6 py-2 transition-all duration-300 shadow-md hover:shadow-lg ${
                                        isDarkMode
                                            ? "bg-[#8DD8FF] text-[#0E2148] hover:bg-[#6ab6dc]"
                                            : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                                    }`}>
                                    <FaUser className="text-base" />
                                    <span className="font-medium">LOG IN</span>
                                </Button>
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center lg:hidden gap-2 ml-auto">
                        {isUserLoggedIn ? ( // Use the new check here
                            <Menu placement="bottom-end">
                                <MenuHandler>
                                    <div
                                        className={`flex items-center gap-2 px-2 py-1 cursor-pointer rounded-full shadow-lg transition-all duration-300 ${
                                            isDarkMode
                                                ? "bg-[#102C57]"
                                                : "bg-red-400"
                                        }`}>
                                        {!findUser ? (
                                            <span className="loader"></span>
                                        ) : (
                                            <>
                                                <Avatar
                                                    src={
                                                        isConfirmEdit
                                                            ? userDataInNav.img
                                                            : findUser?.img
                                                    }
                                                    alt="User"
                                                    size="sm"
                                                />
                                                <span
                                                    className={`text-sm font-medium ${
                                                        isDarkMode
                                                            ? "text-[#8DD8FF]"
                                                            : "text-white"
                                                    }`}>
                                                    {isConfirmEdit
                                                        ? userDataInNav.name
                                                        : findUser?.name}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </MenuHandler>
                                {userMenuContent}
                            </Menu>
                        ) : (
                            <Link to="/Login">
                                <Button
                                    variant="filled"
                                    size="sm"
                                    className={`flex items-center gap-2 rounded-full px-6 py-2 transition-all duration-300 shadow-md hover:shadow-lg ${
                                        isDarkMode
                                            ? "bg-[#8DD8FF] text-[#0E2148] hover:bg-[#6ab6dc]"
                                            : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                                    }`}>
                                    <FaUser className="text-base" />
                                    <span className="font-medium">LOG IN</span>
                                </Button>
                            </Link>
                        )}

                        <IconButton
                            variant="text"
                            className={`h-8 w-8 ${
                                isDarkMode
                                    ? "text-[#8DD8FF] hover:bg-[#1c2f57]"
                                    : "text-gray-700 hover:bg-gray-100"
                            } rounded-full`}
                            onClick={() => setOpenNav(!openNav)}>
                            {openNav ? (
                                <MdClose className="h-6 w-6" />
                            ) : (
                                <MdMenu className="h-6 w-6" />
                            )}
                        </IconButton>
                    </div>
                </div>

                <Collapse open={openNav} className="lg:hidden mt-4">
                    <div className="flex flex-col gap-4">
                        {renderNavLinks(true)}
                    </div>
                </Collapse>
            </div>
        </Navbar>
    );
};

export default NavBar;
