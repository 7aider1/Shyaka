import React from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const ManPromo = () => {
    return (
        <section className="w-full px-4 sm:px-6 md:px-12 py-12 md:py-16 bg-[#f5eeee] dark:bg-[#132C50] transition-colors duration-300">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* الصورة */}
                <div className="w-3/4 md:w-3/4 mx-auto md:mx-0">
                    <img
                        src="./fashion7.jpg"
                        alt="New Arrivals"
                        className="rounded-xl shadow-xl w-full max-w-md md:max-w-full h-auto object-cover mx-auto"
                    />
                </div>

                {/* المحتوى النصي */}
                <div className="text-center md:text-left px-2 sm:px-0">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 dark:text-[#8DD8FF] mb-4 leading-snug">
                        New Arrivals Are Here
                    </h3>
                    <p className="text-gray-800 dark:text-[#8DD8FF] text-sm sm:text-base mb-6 max-w-md mx-auto md:mx-0">
                        Stay ahead of the trends with our fresh drops. Find the
                        perfect style for any occasion.
                    </p>
                    <Link to="/Products">
                        <Button className="bg-red-500 hover:bg-red-600 dark:bg-[#8DD8FF] dark:text-[#132C50] dark:hover:bg-[#71c5ea] text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300">
                            View Collection
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
