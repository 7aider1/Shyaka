import React from "react";
import { motion } from "framer-motion";
import { FaTshirt } from "react-icons/fa";

const LoadingAnimation = () => {
    return (
        <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-100 dark:bg-[#0E2148] transition-colors duration-500">
            {/* بلوب حمراء */}
            <motion.div
                className="absolute w-52 h-52  opacity-20 rounded-full blur-3xl top-[-3rem] left-[-3rem]"
                animate={{
                    y: [0, 30, 0],
                    x: [0, 30, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* بلوب زرقاء */}
            <motion.div
                className="absolute w-52 h-52 bg-[#8DD8FF] opacity-20 rounded-full blur-3xl bottom-[-3rem] right-[-3rem]"
                animate={{
                    y: [0, -20, 0],
                    x: [0, -20, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* أيقونة التيشيرت */}
            <motion.div
                animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-6xl z-10 text-[#f44336] dark:text-[#8DD8FF]">
                <FaTshirt />
            </motion.div>

            {/* نص التحميل */}
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 0.5, 1], y: [10, 0, 10] }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                }}
                className="font-semibold text-xl z-10 text-gray-700 dark:text-[#A4E7FF]">
                Preparing your looks...
            </motion.h2>
        </div>
    );
};

export default LoadingAnimation;
