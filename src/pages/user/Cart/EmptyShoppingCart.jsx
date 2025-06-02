// src/components/user/EmptyShoppingCart.jsx
import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const EmptyShoppingCart = () => {
    return (
        // div الرئيسية للصفحة
        // الخلفية: فاتح (slate-100)، داكن (#0E2148)
        // لون النص الأساسي (للنصوص الثانوية): فاتح (gray-600)، داكن (#A4E7FF)
        <div
            className="min-h-screen flex flex-col justify-center items-center px-6 text-center
                        bg-slate-100 text-gray-600 dark:bg-[#0E2148] dark:text-[#A4E7FF] transition-colors duration-500">
            {/* أيقونة سلة التسوق */}
            {/* اللون: فاتح (red-500)، داكن (#8DD8FF) ليتناسق مع ألوان الدارك مود */}
            <FaCartArrowDown
                className="text-6xl mb-6 animate-bounce
                                       text-red-500 dark:text-[#8DD8FF]"
            />

            {/* عنوان "Your Shopping Cart is Empty" */}
            {/* اللون: فاتح (gray-900)، داكن (#8DD8FF) */}
            <Typography
                variant="h4"
                className="font-bold mb-4
                                               text-gray-900 dark:text-[#8DD8FF]">
                Your Shopping Cart is Empty
            </Typography>

            {/* النص الوصفي */}
            {/* اللون: فاتح (gray-600)، داكن (#A4E7FF) */}
            <Typography
                className="mb-6 max-w-md
                                   text-gray-600 dark:text-[#A4E7FF]">
                Looks like you haven't added anything to your cart yet. Start
                Browse our products to find something you like.
            </Typography>

            {/* زر "Shop Now" */}
            {/* الخلفية: فاتح (تدرج أحمر)، داكن (الأزرق #8DD8FF) */}
            {/* hover الخلفية: فاتح (تدرج أحمر أغمق)، داكن (الأزرق #71c5ea) */}
            {/* لون النص: فاتح (أبيض)، داكن (لون الخلفية الداكن #0E2148) */}
            <Button
                size="lg"
                className="rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300
                           bg-gradient-to-r bg-red-500 hover:bg-red-600
                           text-white dark:bg-[#8DD8FF] dark:hover:bg-[#71c5ea] dark:text-[#0E2148]">
                <Link to="/Products" className="flex items-center gap-2">
                    <span>Shop Now</span>
                </Link>
            </Button>
        </div>
    );
};

export default EmptyShoppingCart;
