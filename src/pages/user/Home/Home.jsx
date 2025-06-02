import React from "react";
import { Button } from "@material-tailwind/react";
import { WomenPromo } from "./WomenPromo";
import { ManPromo } from "./ManPromo";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col dark:bg-[#132C50] text-[#FF6B6B] dark:text-[#B0E0FF] bg-[#f5eeee] min-h-screen">
            <section className="relative px-4 sm:px-8 md:px-12 lg:px-20 py-12 md:py-20 overflow-hidden flex items-center lg:mt-8">
                {/* الخلفيات */}
                <div
                    className="absolute inset-0 z-10 scale-x-[-1] bg-cover bg-center bg-no-repeat bg-fixed
          opacity-100 dark:opacity-0 md:block hidden"
                    style={{
                        backgroundImage: "url('/erasebg-transformed.png')"
                    }}
                />
                <div
                    className="absolute inset-0 z-10 scale-x-[-1] bg-cover bg-center bg-no-repeat bg-fixed
          opacity-0 dark:opacity-100 md:block hidden"
                    style={{
                        backgroundImage: "url('/erasebg-transformed.png')"
                    }}
                />

                {/* المحتوى */}
                <div
                    className="relative z-20 flex flex-col lg:flex-row w-full mt-24 sm:mt-24
          items-center justify-center text-center
          md:items-start md:justify-between md:text-left max-w-7xl mx-auto">
                    {/* النص */}
                    <div className="w-full lg:w-1/2 space-y-4 md:space-y-6 lg:space-y-8 px-4 md:px-0 flex flex-col items-center md:items-start">
                        <h4 className="text-[#FF8A8A] dark:text-[#8AC7FF] font-semibold uppercase tracking-widest text-base sm:text-lg">
                            Shyaka Collections
                        </h4>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#FF6B6B] dark:text-[#8AC7FF]">
                            Timeless Style
                            <br className="hidden sm:block" />
                            Modern Spirit
                        </h1>
                        <p className="text-base sm:text-lg max-w-md text-[#FF6B6B] dark:text-[#89B9E8]">
                            Discover the essence of elegance in every season.
                            From bold summer statements to cozy winter layers —
                            crafted with care, designed to inspire. Where
                            quality meets confidence.
                        </p>
                        <Link to="/Products">
                            <Button
                                size="lg"
                                className="bg-[#ef7373] dark:bg-[#5D5DFF] hover:bg-[#FF6B6B] dark:hover:bg-[#4A4AFF] text-white py-3 px-8 font-semibold mt-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                SHOP NOW
                            </Button>
                        </Link>
                    </div>

                    <div className="w-full flex justify-center items-center mt-10 custom:hidden lg:hidden">
                        <img
                            src="./fashion5.jpg"
                            alt="Fashion Promo"
                            className="w-3/4 max-w-xs h-auto object-cover rounded-xl shadow-lg"
                        />
                    </div>
                </div>
            </section>

            <WomenPromo />
            <ManPromo />
        </div>
    );
};

export default Home;
