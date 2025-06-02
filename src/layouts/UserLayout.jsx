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

    useEffect(() => {
        if (localStorage.userId) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, [islogged]);

    // start of functions for cart
    const addToCart = id => {
        const findProduct = myProducts.find(product => product.id === id);

        const exist = cartItems.find(item => item.id === id);

        if (!exist) {
            const newItem = { ...findProduct, quantity: 1 };
            setCartItems([...cartItems, newItem]);
        }
    };

    const removeItem = id => {
        setCartItems(cartItems.filter(item => item.id !== id));
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
            if (exist.quantity == 1) {
                removeItem(id);
            } else {
                setCartItems(updatedCart);
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
