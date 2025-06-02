import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaLock, FaArrowLeft, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";

const NotAdmin = () => {
    return (
        <div
            className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center
                       bg-slate-100 text-gray-700 dark:bg-[#0E2148] dark:text-[#A4E7FF] transition-colors duration-500">
            {/* أيقونة كبيرة متحركة */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                className="mb-6">
                <FaUserShield className="text-7xl text-red-500 dark:text-[#8DD8FF]" />
            </motion.div>

            {/* العنوان */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}>
                <Typography
                    variant="h2"
                    className="font-extrabold text-red-500 dark:text-[#8DD8FF] drop-shadow mb-3">
                    Access Denied
                </Typography>
            </motion.div>

            {/* الوصف */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}>
                <Typography
                    variant="paragraph"
                    className="max-w-md mx-auto text-gray-600 dark:text-[#A4E7FF] mb-6">
                    You’re not the admin to access this page. If you think this
                    is a mistake, please contact your administrator.
                </Typography>
            </motion.div>

            {/* زر الرجوع */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}>
                <Button
                    size="lg"
                    className="rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300
                               bg-red-500 hover:bg-red-600 text-white
                               dark:bg-[#8DD8FF] dark:hover:bg-[#71c5ea] dark:text-[#0E2148]">
                    <Link to="/" className="flex items-center gap-2">
                        <FaArrowLeft />
                        <span>Back to Home</span>
                    </Link>
                </Button>
            </motion.div>
        </div>
    );
};

export default NotAdmin;
