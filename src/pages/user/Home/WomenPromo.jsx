import React from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const WomenPromo = () => {
    return (
        <section className="w-full px-4 py-16 bg-[#f5eeee] dark:bg-[#132C50] transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* الكلام */}
                <div className="lg:w-1/2 text-center lg:text-left space-y-4 px-4 sm:px-0">
                    <h2 className="text-4xl font-bold text-pink-800 dark:text-[#8DD8FF]">
                        Hot Deals on Dresses
                    </h2>
                    <p className="text-gray-700 dark:text-[#8DD8FF] max-w-md mx-auto lg:mx-0">
                        Discover this season’s best-selling women’s dresses with
                        up to 50% off!
                    </p>
                    <Link to="/Products">
                        <Button className="mt-4 bg-pink-500 hover:bg-pink-600 dark:bg-[#8DD8FF] dark:text-[#0E2148] dark:hover:bg-[#71c5ea] text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300">
                            Explore Now
                        </Button>
                    </Link>
                </div>

                {/* الصورة */}
                <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-sm mx-auto lg:mx-0">
                    <img
                        src="./woman2.png"
                        alt="Promo Dresses"
                        className="rounded-xl shadow-md w-full h-auto object-contain"
                    />
                </div>
            </div>
        </section>
    );
};
