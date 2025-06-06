import { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import LoadingAnimation from "./LoadingAnimation";
import React from "react";
import Swal from "sweetalert2";

import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const Products = ({
    myProducts,
    loading,
    setLoading,
    getProducts,
    addToCart,
    islogged,
    cartItems,
    numberOfProductAdditions,
    setNumberOfProductAdditions
}) => {
    const [isProductModalOpen, SetIsProductModelOpen] = useState(false);

    const [productModalProp, setProductModalProp] = useState(null);

    const decrementNumberOfProductAdditions = () => {
        if (numberOfProductAdditions > 1) {
            setNumberOfProductAdditions(numberOfProductAdditions - 1);
        }
    };
    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (isProductModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isProductModalOpen]);

    return (
        <div
            className="py-10 px-4 min-h-screen
                        bg-slate-100 dark:bg-[#0E2148] transition-colors duration-500">
            <Typography
                variant="h3"
                className="text-center font-bold mb-10 mt-12
                                   text-[#f44336] dark:text-[#8DD8FF]">
                Our Products 🛍️
            </Typography>
            {loading ? (
                <LoadingAnimation />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-4">
                    {myProducts.map(product => (
                        <Card
                            key={product.id}
                            className="shadow-lg rounded-xl border flex flex-col justify-between h-full
                                   bg-white border-gray-300 dark:bg-[#132C50] dark:border-[#2e4672]">
                            <CardBody className="flex flex-col gap-3 flex-grow">
                                <div className="w-full h-48 overflow-hidden rounded-lg">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>

                                <Typography
                                    variant="h6"
                                    className="font-bold text-lg
                                           text-slate-900 dark:text-[#8DD8FF]">
                                    {product.title}
                                </Typography>
                                <div
                                    className="text-sm h-16 overflow-y-auto pr-1
                                            text-gray-600 dark:text-[#A4E7FF] custom-scrollbar">
                                    {product.description}
                                </div>
                                <Typography
                                    className="font-semibold text-lg mt-auto
                                                   text-[#f44336] dark:text-[#A4E7FF]">
                                    {" "}
                                    ${product.price}
                                </Typography>
                            </CardBody>

                            {/* زر سلة */}
                            <CardFooter className="pt-0">
                                <Button
                                    onClick={() => {
                                        const currentTheme =
                                            document.documentElement.classList.contains(
                                                "dark"
                                            )
                                                ? "dark"
                                                : "light";

                                        if (islogged) {
                                            const isAlreadyInCart =
                                                cartItems.some(
                                                    item =>
                                                        item.id === product.id
                                                );

                                            if (isAlreadyInCart) {
                                                Swal.fire({
                                                    icon: "warning",
                                                    title: "Already in Cart",
                                                    text: "This product is already in your cart.",
                                                    toast: true,
                                                    position: "top-end",
                                                    timer: 2000,
                                                    showConfirmButton: false,
                                                    background:
                                                        currentTheme === "dark"
                                                            ? "#0E2148"
                                                            : "#ffffff",
                                                    color:
                                                        currentTheme === "dark"
                                                            ? "#8DD8FF"
                                                            : "#1e293b"
                                                });
                                            } else {
                                                SetIsProductModelOpen(true);
                                                setNumberOfProductAdditions(1);
                                                setProductModalProp(product);
                                            }
                                        } else {
                                            Swal.fire({
                                                icon: "info",
                                                title: "Something is wrong 😕",
                                                text: "You must have an account to be able to add a product to the cart.",
                                                confirmButtonText: "OK",
                                                background:
                                                    currentTheme === "dark"
                                                        ? "#0E2148"
                                                        : "#fff",
                                                color:
                                                    currentTheme === "dark"
                                                        ? "#8DD8FF"
                                                        : "#1e293b",
                                                confirmButtonColor: "#0f172a"
                                            });
                                        }
                                    }}
                                    fullWidth
                                    className="flex items-center justify-center gap-2
           bg-[#f44336] hover:bg-[#e53935] text-white
           dark:bg-[#8DD8FF] dark:hover:bg-[#71c5ea] dark:text-[#0E2148]">
                                    <FaShoppingCart />
                                    Add to Cart
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
            {isProductModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="w-full max-w-md p-4">
                        <Card className="rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-[#0E2148] text-black dark:text-[#A4E7FF]">
                            {productModalProp?.image && (
                                <img
                                    src={productModalProp?.image}
                                    alt={productModalProp?.title}
                                    className="w-full h-40 object-contain bg-white dark:bg-[#132C50]"
                                />
                            )}
                            <CardBody className="space-y-4 p-6">
                                <Typography
                                    variant="h5"
                                    className="text-center font-semibold text-slate-900 dark:text-[#8DD8FF]">
                                    {productModalProp?.title}
                                </Typography>
                                <div className="max-h-24 overflow-y-auto pr-1 text-sm text-center text-gray-600 dark:text-[#A4E7FF] custom-scrollbar">
                                    {productModalProp?.description}
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-[#A4E7FF]">
                                    <h1>Price:</h1>
                                    <div className="text-right">
                                        ${productModalProp?.price}
                                    </div>
                                    <div>Category:</div>
                                    <div className="text-right">
                                        {productModalProp?.category}
                                    </div>
                                    <div>rate:</div>
                                    <div className="text-right">
                                        {productModalProp?.rating.rate}
                                    </div>
                                </div>

                                <Typography
                                    variant="h6"
                                    className="text-center font-bold pt-2 text-[#f44336] dark:text-[#8DD8FF]">
                                    Total: $
                                    {(
                                        numberOfProductAdditions *
                                        productModalProp?.price
                                    ).toFixed(2)}
                                </Typography>

                                <div className="flex items-center justify-between py-2">
                                    <Button
                                        variant="outlined"
                                        size="sm"
                                        onClick={() => {
                                            decrementNumberOfProductAdditions();
                                        }}
                                        className="border-[#f44336] bg-[#fa584c] dark:bg-[#8DD8FF] dark:hover:bg-[#71c5ea] dark:border-[#8DD8FF] text-white dark:text-[#0E2148] text-md mb-3">
                                        <FaMinus />
                                    </Button>
                                    <span className="font-semibold text-black dark:text-[#A4E7FF]">
                                        {numberOfProductAdditions}
                                    </span>
                                    <Button
                                        variant="outlined"
                                        size="sm"
                                        onClick={() => {
                                            setNumberOfProductAdditions(
                                                numberOfProductAdditions + 1
                                            );
                                        }}
                                        className="border-[#f44336] bg-[#fa584c] dark:bg-[#8DD8FF] dark:hover:bg-[#71c5ea] dark:border-[#8DD8FF] text-white dark:text-[#0E2148] text-md mb-3">
                                        <FaPlus />
                                    </Button>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        className="border-gray-400 dark:border-[#2e4672] text-black dark:text-[#A4E7FF]"
                                        onClick={() =>
                                            SetIsProductModelOpen(false)
                                        }>
                                        Cancel
                                    </Button>
                                    <Button
                                        fullWidth
                                        className="bg-[#f44336] hover:bg-[#e53935] text-white dark:bg-[#8DD8FF] dark:hover:bg-[#71c5ea] dark:text-[#0E2148]"
                                        onClick={() => {
                                            SetIsProductModelOpen(false);
                                            addToCart({
                                                ...productModalProp,
                                                quantity:
                                                    numberOfProductAdditions
                                            });

                                            const currentTheme =
                                                document.documentElement.classList.contains(
                                                    "dark"
                                                )
                                                    ? "dark"
                                                    : "light";
                                            Swal.fire({
                                                icon: "success",
                                                title: "Added to Cart 🛒",
                                                text: `${productModalProp?.title} has been added successfully!`,
                                                toast: true,
                                                position: "top-end",
                                                timer: 2000,
                                                showConfirmButton: false,
                                                background:
                                                    currentTheme === "dark"
                                                        ? "#0E2148"
                                                        : "#ffffff",
                                                color:
                                                    currentTheme === "dark"
                                                        ? "#8DD8FF"
                                                        : "#1e293b"
                                            });
                                        }}>
                                        Add to Cart
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Products;
