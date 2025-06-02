import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
    const [openNav, setOpenNav] = React.useState(false);
    const [showNavbar, setShowNavbar] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);

    const handleWindowResize = () => {
        if (window.innerWidth >= 960) setOpenNav(false);
    };

    const handleCloseNav = () => {
        if (window.innerWidth < 960) {
            setOpenNav(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowNavbar(false); // نازل
            } else {
                setShowNavbar(true); // طالع
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    const NavList = () => (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as={Link}
                to="/Admin"
                onClick={handleCloseNav}
                variant="small"
                color="blue-gray"
                className="p-1 font-medium">
                <h1 className="flex items-center hover:text-blue-500 transition-colors">
                    Dashboard
                </h1>
            </Typography>
            <Typography
                as={Link}
                to="/Admin/users"
                onClick={handleCloseNav}
                variant="small"
                color="blue-gray"
                className="p-1 font-medium">
                <h1 className="flex items-center hover:text-blue-500 transition-colors">
                    Users
                </h1>
            </Typography>
            <Typography
                as={Link}
                to="/Admin/ProductsTable"
                onClick={handleCloseNav}
                variant="small"
                color="blue-gray"
                className="p-1 font-medium">
                <h1 className="flex items-center hover:text-blue-500 transition-colors">
                    Products
                </h1>
            </Typography>
            <Typography
                as={Link}
                to="/"
                onClick={handleCloseNav}
                variant="small"
                color="blue-gray"
                className="p-1 font-medium">
                <h1 className="flex items-center hover:text-blue-500 transition-colors">
                    MainWeb
                </h1>
            </Typography>
        </ul>
    );

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
                showNavbar ? "translate-y-0" : "-translate-y-full"
            }`}>
            <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        variant="h6"
                        className="mr-4 cursor-pointer py-1.5 playwrite text-2xl">
                        Shyaka
                    </Typography>
                    <div className="hidden lg:block">
                        <NavList />
                    </div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}>
                        {openNav ? (
                            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                        ) : (
                            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                        )}
                    </IconButton>
                </div>
                <Collapse open={openNav}>
                    <NavList />
                </Collapse>
            </Navbar>
        </div>
    );
};

export default NavbarAdmin;
