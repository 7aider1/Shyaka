import React from "react";

import Dashboard from "../pages/admin/Dashboard/Dashboard";
import NavbarAdmin from "../components/admin/NavbarAdmin";
import ProductsTable from "../pages/admin/Products/ProductsTable";
import ProductsTableView from "../pages/admin/Products/ProductsTableView";
import ProductsTableAdd from "../pages/admin/Products/ProductsTableAdd";
import ProductsTableEdit from "../pages/admin/Products/ProductsTableEdit";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import ProductNotFound from "../pages/admin/Products/ProductNotFound";
import AdminNotFound from "../components/shared/AdminNotFound";
import { UsersTable } from "../pages/admin/Users/UsersTable";
import UsersTableView from "../pages/admin/Users/UsersTableView";

const AdminLayout = ({
    userDataNow,
    myProducts,
    setMyProducts,
    adminLoading,

    setIsProductChange,
    isProductChange
}) => {
    return (
        <div className="space-y-28 bg-white">
            <NavbarAdmin />

            <Routes>
                <Route
                    index
                    element={
                        <Dashboard
                            userDataNow={userDataNow}
                            myProducts={myProducts}
                        />
                    }
                />
                <Route
                    path="ProductsTable"
                    element={
                        <ProductsTable
                            myProducts={myProducts}
                            setMyProducts={setMyProducts}
                            adminLoading={adminLoading}
                            isProductChange={isProductChange}
                            setIsProductChange={setIsProductChange}
                        />
                    }
                />
                <Route
                    path="view/:productId"
                    element={
                        <ProductsTableView
                            myProducts={myProducts}
                            adminLoading={adminLoading}
                        />
                    }
                />
                <Route
                    path="add"
                    element={
                        <ProductsTableAdd
                            myProducts={myProducts}
                            setIsProductChange={setIsProductChange}
                            isProductChange={isProductChange}
                        />
                    }
                />
                <Route
                    path="edit/:editProductId"
                    element={
                        <ProductsTableEdit
                            myProducts={myProducts}
                            adminLoading={adminLoading}
                            setIsProductChange={setIsProductChange}
                            isProductChange={isProductChange}
                        />
                    }
                />
                <Route
                    path="users"
                    element={
                        <UsersTable
                            userDataNow={userDataNow}
                            adminLoading={adminLoading}
                        />
                    }
                />
                <Route
                    path="viewUser/:userId"
                    element={
                        <UsersTableView
                            userDataNow={userDataNow}
                            adminLoading={adminLoading}
                        />
                    }
                />
                <Route path="*" element={<AdminNotFound />} />
            </Routes>
        </div>
    );
};

export default AdminLayout;
