import React, { useEffect, useState } from "react";

import NavBar from "../components/user/NavBar";

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";

import Home from "../pages/user/Home/Home";

import Products from "../pages/user/Products/Products";

import Footer from "../components/user/Footer";

import Login from "../pages/user/Auth/Login";

import SignUp from "../pages/user/Auth/SignUp";

import NotFound from "../pages/shared/NotFound";

import EmptyShoppingCart from "../pages/user/Cart/EmptyShoppingCart";

import Profile from "../pages/user/Profile/Profile";

import LoadingAnimation from "../pages/user/Products/LoadingAnimation";

import CartWithProducts from "../pages/user/Cart/CartWithProducts";
import Swal from "sweetalert2";

const UserLayout = ({
    myProducts,
    getProducts,
    userDataNow,
    setUserDataNow,
    loading,
    setLoading,
    userRole,
    setIsLogged,
    islogged
}) => {
    const [cartItems, setCartItems] = useState([]);

    const [cartIndex, setCartIndex] = useState(0);

    const [userProfile, setUserProfile] = useState(null);

    const [userDataInNav, setUserDataInNav] = useState("");

    const [isConfirmEdit, setIsConfirmEdit] = useState(false);

    const [numberOfProductAdditions, setNumberOfProductAdditions] = useState(1);

    useEffect(() => {
        if (localStorage.userId) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, [islogged]);

    // start of functions for cart
    const addToCart = productWithQuantity => {
        const exist = cartItems.find(
            item => item.id === productWithQuantity.id
        );

        if (!exist) {
            const newItem = { ...productWithQuantity };
            setCartItems([...cartItems, newItem]);
        }
    };

    const removeItem = id => {
        const currentTheme = document.documentElement.classList.contains("dark")
            ? "dark"
            : "light";

        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to remove this product from your cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, remove it",
            cancelButtonText: "No, keep it",
            background: currentTheme === "dark" ? "#0E2148" : "#ffffff",
            color: currentTheme === "dark" ? "#8DD8FF" : "#1e293b"
        }).then(result => {
            if (result.isConfirmed) {
                setCartItems(cartItems.filter(item => item.id !== id));
                Swal.fire({
                    icon: "success",
                    title: "Removed!",
                    text: "The product has been removed from your cart.",
                    timer: 1500,
                    showConfirmButton: false,
                    toast: true,
                    position: "top-end",
                    background: currentTheme === "dark" ? "#0E2148" : "#ffffff",
                    color: currentTheme === "dark" ? "#8DD8FF" : "#1e293b"
                });
            }
        });
    };

    const increaseQuantity = id => {
        const exist = cartItems.find(item => item.id === id);

        if (exist) {
            const updatedCart = cartItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
        }
    };

    const decreaseQuantity = id => {
        const exist = cartItems.find(item => item.id === id);

        if (exist) {
            const updatedCart = cartItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
            if (exist.quantity !== 1) {
                setCartItems(updatedCart);
            } else {
            }
        }
    };
    // end of functions for cart

    return (
        <div>
            <div className="space-y-16">
                <NavBar
                    cartItems={cartItems}
                    cartIndex={cartIndex}
                    setCartIndex={setCartIndex}
                    userDataNow={userDataNow}
                    islogged={islogged}
                    setIsLogged={setIsLogged}
                    setUserProfile={setUserProfile}
                    userProfile={userProfile}
                    userDataInNav={userDataInNav}
                    isConfirmEdit={isConfirmEdit}
                    userRole={userRole}
                />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/Login"
                        element={
                            <Login
                                userDataNow={userDataNow}
                                setIsLogged={setIsLogged}
                            />
                        }
                    />
                    <Route
                        path="SignUp"
                        element={
                            <SignUp
                                setIsLogged={setIsLogged}
                                islogged={islogged}
                                userDataNow={userDataNow}
                                setUserDataNow={setUserDataNow}
                            />
                        }
                    />
                    <Route
                        path="/Products"
                        element={
                            <Products
                                myProducts={myProducts}
                                loading={loading}
                                setLoading={setLoading}
                                getProducts={getProducts}
                                addToCart={addToCart}
                                islogged={islogged}
                                setIsLogged={setIsLogged}
                                cartItems={cartItems}
                                numberOfProductAdditions={
                                    numberOfProductAdditions
                                }
                                setNumberOfProductAdditions={
                                    setNumberOfProductAdditions
                                }
                            />
                        }
                    />
                    <Route
                        path="/EmptyShoppingCart"
                        element={<EmptyShoppingCart />}
                    />

                    <Route
                        path="/Profile"
                        element={
                            islogged ? (
                                <Profile
                                    userProfile={userProfile}
                                    userDataNow={userDataNow}
                                    setUserDataInNav={setUserDataInNav}
                                    setIsConfirmEdit={setIsConfirmEdit}
                                />
                            ) : (
                                <NotFound />
                            )
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                    <Route
                        path="/LoadingAnimation"
                        element={<LoadingAnimation />}
                    />
                    <Route
                        path="/Cart"
                        element={
                            <CartWithProducts
                                cartItems={cartItems}
                                increaseQuantity={increaseQuantity}
                                decreaseQuantity={decreaseQuantity}
                                removeItem={removeItem}
                                setCartIndex={setCartIndex}
                                islogged={islogged}
                                numberOfProductAdditions={
                                    numberOfProductAdditions
                                }
                            />
                        }
                    />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default UserLayout;
