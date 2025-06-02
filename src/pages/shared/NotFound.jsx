// src/pages/user/NotFound.jsx
import { Typography, Button } from "@material-tailwind/react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center px-6 text-center
                       bg-slate-100 text-gray-600 dark:bg-[#0E2148] dark:text-[#A4E7FF] transition-colors duration-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            {/* أيقونة التحذير */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}>
                <FaExclamationTriangle className="text-6xl mb-6 text-red-500 dark:text-[#8DD8FF]" />
            </motion.div>

            {/* العنوان */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}>
                <Typography
                    variant="h2"
                    className="font-bold mb-2 text-red-500 dark:text-[#8DD8FF]">
                    404 - Not Found
                </Typography>
            </motion.div>

            {/* الوصف */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}>
                <Typography
                    variant="paragraph"
                    className="mb-6 max-w-md text-gray-600 dark:text-[#A4E7FF]">
                    Oops! The page you're looking for doesn't exist or has been
                    moved.
                </Typography>
            </motion.div>

            {/* الزر */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}>
                <Button
                    size="lg"
                    className="rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300
                               bg-gradient-to-r bg-red-500 hover:bg-red-600
                               text-white dark:bg-[#8DD8FF] dark:hover:bg-[#71c5ea] dark:text-[#0E2148]">
                    <Link to="/" className="flex items-center gap-2">
                        <span>Back to Home</span>
                    </Link>
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default NotFound;
