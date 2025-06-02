import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaPhone,
    FaEnvelope
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#f7e7e7] dark:bg-[#0A1834] text-gray-700 dark:text-[#8DD8FF] px-6 sm:px-10 md:px-16 py-10">
            {/* الأقسام الرئيسية */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12">
                {/* اللوجو + وصف */}
                <div className="text-center md:text-left">
                    <h2 className="playwrite text-4xl font-bold text-[#f44336] dark:text-[#4FC3F7] mb-6">
                        Shyaka
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-[#A4E7FF] max-w-sm mx-auto md:mx-0">
                        Premium shopping experience for everyone. Enjoy our wide
                        selection of products and exclusive offers.
                    </p>
                </div>

                {/* الروابط السريعة */}
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-sm">
                        {[
                            { label: "Home", href: "/" },
                            { label: "Shop", href: "/Products" },

                            { label: "Cart", href: "/EmptyShoppingCart" }
                        ].map((link, idx) => (
                            <li key={idx}>
                                <Link
                                    to={link.href}
                                    className="hover:text-[#f44336] dark:hover:text-white transition">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* التواصل والسوشيال ميديا */}
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Get in Touch
                    </h3>
                    <ul className="text-sm space-y-2">
                        <li className="flex justify-center md:justify-start items-center gap-2">
                            <FaPhone className="text-[#f44336] dark:text-[#4FC3F7]" />
                            <span>+20 120 807 0445</span>
                        </li>
                        <li className="flex justify-center md:justify-start items-center gap-2">
                            <FaEnvelope className="text-[#f44336] dark:text-[#4FC3F7]" />
                            <span>omar.heder.store@gmail.com</span>
                        </li>
                    </ul>
                    <div className="flex justify-center md:justify-start gap-4 mt-4 text-lg text-gray-600 dark:text-[#A4E7FF]">
                        <h1 className="hover:text-[#f44336] dark:hover:text-white">
                            <FaFacebook />
                        </h1>
                        <h1 className="hover:text-[#f44336] dark:hover:text-white">
                            <FaInstagram />
                        </h1>
                        <h1 className="hover:text-[#f44336] dark:hover:text-white">
                            <FaTwitter />
                        </h1>
                    </div>
                </div>
            </div>

            {/* حقوق الملكية */}
            <div className="text-center text-sm text-gray-500 dark:text-[#7BB4E0] mt-10 border-t border-gray-300 dark:border-[#1e345a] pt-5">
                &copy; {new Date().getFullYear()} Shyaka. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
