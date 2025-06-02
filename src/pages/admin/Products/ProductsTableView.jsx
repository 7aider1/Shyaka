import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import ProductNotFound from "./ProductNotFound";

const ProductsTableView = ({ myProducts, adminLoading }) => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const currentProduct = myProducts.find(product => {
        return product.id == productId;
    });

    if (!currentProduct) {
        return <ProductNotFound />;
    }

    return (
        <>
            {!adminLoading ? (
                <div className="min-h-screen py-6 px-2 sm:px-4 flex items-start justify-center">
                    <Card className="w-full max-w-6xl grid gap-6 md:grid-cols-2 p-4 sm:p-6 shadow-xl rounded-2xl">
                        {/* الصورة */}
                        <div className="flex items-center justify-center bg-white rounded-xl p-3 sm:p-4">
                            <img
                                src={currentProduct?.image}
                                alt={currentProduct?.title}
                                className="rounded-xl w-full max-w-[200px] sm:max-w-xs object-contain"
                            />
                        </div>

                        {/* التفاصيل */}
                        <CardBody className="flex flex-col justify-between text-sm sm:text-base">
                            <div>
                                <Typography
                                    variant="h5"
                                    className="mb-3 sm:mb-4 font-semibold text-gray-800 text-lg sm:text-xl">
                                    {currentProduct?.title}
                                </Typography>

                                <Typography className="mb-2 text-lg sm:text-xl text-black font-bold">
                                    ${currentProduct?.price}
                                </Typography>

                                <Typography className="mb-2 text-xs sm:text-sm text-gray-600 capitalize">
                                    {currentProduct?.category}
                                </Typography>

                                <Typography className="mb-3 sm:mb-4 text-gray-700 leading-relaxed text-sm sm:text-base">
                                    {currentProduct?.description}
                                </Typography>

                                <Typography className="flex items-center gap-1 text-black font-medium text-base sm:text-lg">
                                    {currentProduct?.rating.rate}
                                    <span>⭐</span>
                                </Typography>
                            </div>

                            <div className="mt-5 sm:mt-6">
                                <Button
                                    className="bg-black text-white px-4 sm:px-6 py-2 rounded-md shadow-md text-sm sm:text-base"
                                    onClick={() =>
                                        navigate("/Admin/ProductsTable")
                                    }>
                                    BACK TO PRODUCTS
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            ) : (
                <div className="min-h-screen flex items-center justify-center">
                    <span className="admin-full-loader"></span>
                </div>
            )}
        </>
    );
};

export default ProductsTableView;
