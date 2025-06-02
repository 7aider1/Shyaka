import React from "react";
import { Button, Typography, Card } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

const AdminNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
            <Card className="max-w-lg w-full p-10 text-center shadow-xl rounded-3xl">
                <motion.div
                    className="flex justify-center mb-8 text-[#C0C0C0]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}>
                    <FaExclamationTriangle className="text-7xl" />
                </motion.div>

                <Typography
                    variant="h3"
                    className="mb-3 font-extrabold text-gray-900">
                    404 - Admin Page Not Found
                </Typography>

                <Typography className="mb-8 text-gray-700 text-lg leading-relaxed">
                    Ooops! The admin page you're looking for doesn't exist or
                    has been moved.
                    <br />
                    Please check the URL or return to the admin dashboard.
                </Typography>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}>
                    <Button
                        onClick={() => navigate("/Admin")}
                        className="bg-[#a09f9f] hover:bg-[#898989] text-white px-8 py-3 rounded-xl shadow-lg transition">
                        Go to Dashboard
                    </Button>
                </motion.div>
            </Card>
        </div>
    );
};

export default AdminNotFound;
