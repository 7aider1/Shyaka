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
import { useNavigate } from "react-router-dom";

const Products = ({
    myProducts,
    loading,
    setLoading,
    getProducts,
    addToCart,
    islogged,
    cartItems
}) => {
    useEffect(() => {
        getProducts();
    }, []);
    const navigate = useNavigate();
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
                                                addToCart(product.id);
                                                Swal.fire({
                                                    icon: "success",
                                                    title: "Added to Cart 🛒",
                                                    text: `${product.title} has been added successfully!`,
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
        </div>
    );
};

export default Products;
