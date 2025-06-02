import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";

import AdminLayout from "./layouts/AdminLayout";
import axios from "axios";
import NotAdmin from "./pages/user/NotAdmin";

const App = () => {
    const [myProducts, setMyProducts] = useState([]);

    const [userDataNow, setUserDataNow] = useState([]);

    const [loading, setLoading] = useState(true);

    const [adminLoading, setAdminLoading] = useState(true);

    const [isProductChange, setIsProductChange] = useState(false);

    const [isLogged, setIsLogged] = useState(false);

    const [userRole, SetUserRole] = useState("");
    const URL = import.meta.env.VITE_MAIN_URL;

    // for shop page
    const getProducts = () => {
        axios({
            method: "get",
            url: `${URL}/products`
        })
            .then(products => {
                setLoading(false);
                setAdminLoading(false);
                setMyProducts(products.data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    };

    useEffect(() => {
        getProducts();
    }, [isProductChange]);

    // for login page
    const getUsers = () => {
        axios({
            method: "get",
            url: `${URL}/users`
        })
            .then(users => {
                setAdminLoading(false);
                setUserDataNow(users.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    };

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        const currentUser = userDataNow?.find(
            user => user.id == localStorage.userId
        );

        SetUserRole(currentUser?.role);
    }, [isLogged, userDataNow]);

    return (
        <div>
            <Routes>
                <Route
                    path="/*"
                    element={
                        <UserLayout
                            myProducts={myProducts}
                            loading={loading}
                            setLoading={setLoading}
                            getProducts={getProducts}
                            userDataNow={userDataNow}
                            setUserDataNow={setUserDataNow}
                            userRole={userRole}
                            islogged={isLogged}
                            setIsLogged={setIsLogged}
                        />
                    }
                />
                {userRole === "admin" ? (
                    <Route
                        path="/Admin/*"
                        element={
                            <AdminLayout
                                userDataNow={userDataNow}
                                myProducts={myProducts}
                                setMyProducts={setMyProducts}
                                adminLoading={adminLoading}
                                setAdminLoading={setAdminLoading}
                                setIsProductChange={setIsProductChange}
                                isProductChange={isProductChange}
                            />
                        }
                    />
                ) : (
                    <Route path="/Admin/*" element={<NotAdmin />} />
                )}
            </Routes>
        </div>
    );
};

export default App;
