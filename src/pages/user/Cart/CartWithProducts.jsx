import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";
import EmptyShoppingCart from "./EmptyShoppingCart";
import Swal from "sweetalert2";

const CartWithProducts = ({
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    cartItems,
    setCartIndex,
    islogged,
    numberOfProductAdditions
}) => {
    useEffect(() => {
        cartItems.map((data, index) => {
            setCartIndex(index + 1);
        });
    }, [cartItems]);

    const getTotal = () =>
        parseFloat(
            cartItems
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)
        );

    const getTotalProducts = () =>
        cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const progressAlert = () => {
        const currentTheme = document.documentElement.classList.contains("dark")
            ? "dark"
            : "light";
        Swal.fire({
            icon: "info",
            title: "Feature in Progress 🚧",
            text: "This option is currently unavailable and under development.",
            confirmButtonText: "OK",
            background: currentTheme === "dark" ? "#0E2148" : "#fff",
            color: currentTheme === "dark" ? "#8DD8FF" : "#1e293b",
            confirmButtonColor: "#0f172a"
        });
    };

    return (
        <>
            {cartItems.length === 0 || islogged == false ? (
                <EmptyShoppingCart />
            ) : (
                <div className="min-h-screen py-10 px-4 transition-colors duration-500 bg-slate-100 text-gray-900 dark:bg-[#0E2148] dark:text-[#8DD8FF]">
                    <Typography
                        variant="h3"
                        className="text-center font-bold mb-10 mt-16 text-red-500 dark:text-[#8DD8FF]">
                        Your Shopping Cart
                    </Typography>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item, index) => (
                                <Card
                                    key={index}
                                    className="flex flex-col sm:flex-row items-center justify-between p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl border bg-white border-gray-200 text-gray-900 dark:bg-[#132C50] dark:border-[#2e4672] dark:text-[#8DD8FF]">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-200 dark:border-[#2e4672]"
                                    />
                                    <div className="flex-1 text-center sm:text-left px-4">
                                        <Typography
                                            variant="h6"
                                            className="font-semibold text-gray-900 dark:text-[#8DD8FF]">
                                            {item.title}
                                        </Typography>
                                        <Typography className="mt-1 text-gray-600 dark:text-[#A4E7FF]">
                                            Quantity: {item.quantity}
                                        </Typography>
                                        <Typography className="font-bold mt-2 text-gray-900 dark:text-[#A4E7FF]">
                                            $
                                            {parseFloat(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
                                        {/* الزرارين + و - */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(item.id)
                                                }
                                                className="w-10 h-10 flex items-center justify-center text-xl font-bold rounded-full
      border border-gray-300 text-red-500 bg-red-100 hover:bg-red-200
      dark:border-[#2e4672] dark:text-[#FF8080] dark:bg-[#2c3f64] dark:hover:bg-[#3c5077]
      transition-colors duration-300">
                                                −
                                            </button>
                                            <button
                                                onClick={() =>
                                                    increaseQuantity(item.id)
                                                }
                                                className="w-10 h-10 flex items-center justify-center text-xl font-bold rounded-full
      border border-gray-300 text-green-600 bg-green-100 hover:bg-green-200
      dark:border-[#2e4672] dark:text-[#9DFF9D] dark:bg-[#2c3f64] dark:hover:bg-[#3c5077]
      transition-colors duration-300">
                                                +
                                            </button>
                                        </div>

                                        {/* زر الحذف */}
                                        <Button
                                            variant="outlined"
                                            onClick={() => removeItem(item.id)}
                                            className="transition-all border-red-500 text-red-500 hover:bg-red-500 hover:text-white dark:border-[#4E71FF] dark:text-[#3b5de4] dark:hover:bg-[#4E71FF] dark:hover:text-white">
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <Card className="p-6 space-y-4 shadow-lg h-fit transition-shadow duration-300 hover:shadow-xl border bg-white border-gray-200 text-gray-900 dark:bg-[#132C50] dark:border-[#2e4672] dark:text-[#8DD8FF]">
                            <Typography
                                variant="h5"
                                className="font-bold text-gray-900 dark:text-[#8DD8FF]">
                                Summary
                            </Typography>
                            <div className="flex justify-between text-sm text-gray-600 dark:text-[#A4E7FF]">
                                <span>Total Items:</span>
                                <span className="font-bold text-gray-900 dark:text-[#A4E7FF]">
                                    {getTotalProducts()}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-[#A4E7FF]">
                                    Total Price:
                                </span>
                                <span className="font-bold text-gray-900 dark:text-[#A4E7FF]">
                                    ${getTotal()}
                                </span>
                            </div>
                            <Button
                                onClick={() => {
                                    progressAlert();
                                }}
                                className="w-full font-semibold shadow-md hover:shadow-xl transition-all
                                   bg-gradient-to-r  bg-red-500 hover:bg-red-600
                                   text-white dark:bg-[#8DD8FF] dark:hover:bg-[#71c5ea] dark:text-[#0E2148]">
                                Checkout
                            </Button>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartWithProducts;
