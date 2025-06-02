import React from "react";
import { Button, Typography, Card } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
            <Card className="max-w-xl w-full p-8 text-center shadow-lg bg-white rounded-2xl">
                <motion.div
                    className="flex justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}>
                    <FaBoxOpen className="text-[#C0C0C0] text-6xl" />
                </motion.div>

                <Typography
                    variant="h4"
                    className="mb-4 text-gray-800 font-bold">
                    Product Not Found
                </Typography>

                <Typography className="mb-6 text-gray-600">
                    We couldn't find the product you're looking for.
                    <br />
                    It might have been removed or never existed.
                </Typography>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}>
                    <Button
                        onClick={() => navigate("/Admin/ProductsTable")}
                        className="bg-black text-white px-6 py-2 rounded-md shadow hover:shadow-md transition">
                        Back to Products
                    </Button>
                </motion.div>
            </Card>
        </div>
    );
};

export default ProductNotFound;
