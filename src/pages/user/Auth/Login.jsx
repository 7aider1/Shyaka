import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = ({ userDataNow, setIsLogged }) => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        role: "user"
    });

    const [emailCheck, setEmailCheck] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState(false);

    const emailRegex = /^[\w.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setEmailCheck(emailRegex.test(user.email));
        setPasswordCheck(passwordRegex.test(user.password));
    }, [user.email, user.password]);

    const navigate = useNavigate();

    const handleCreateAccount = e => {
        e.preventDefault();
        setLoading(true);

        const currentTheme = document.documentElement.classList.contains("dark")
            ? "dark"
            : "light";

        if (
            emailCheck &&
            passwordCheck &&
            userDataNow.some(
                data =>
                    data.password === user.password && data.email === user.email
            )
        ) {
            const currentUser = userDataNow.find(
                data =>
                    data.password === user.password && data.email === user.email
            );

            localStorage.userId = currentUser.id;
            setIsLogged(true);
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "The operation was completed successfully!",
                confirmButtonText: "Great!",
                background: currentTheme === "dark" ? "#0E2148" : "#fff",
                color: currentTheme === "dark" ? "#8DD8FF" : "#1e293b",
                confirmButtonColor:
                    currentTheme === "dark" ? "#8DD8FF" : "#16a34a"
            }).then(() => {
                setLoading(false);
                navigate("/");
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid input or user didn't exist",
                background: currentTheme === "dark" ? "#0E2148" : "#fff",
                color: currentTheme === "dark" ? "#8DD8FF" : "#1e293b",
                confirmButtonColor:
                    currentTheme === "dark" ? "#8DD8FF" : "#ef4444"
            }).then(() => {
                setLoading(false);
            });
        }
    };

    const progressAlert = () => {
        const currentTheme = document.documentElement.classList.contains("dark")
            ? "dark"
            : "light";
        Swal.fire({
            icon: "info",
            title: "Feature in Progress 🚧",
            text: "This option is currently unavailable and under development.",
            confirmButtonText: "OK",
            background: currentTheme === "dark" ? "#0E2148" : "#fff",
            color: currentTheme === "dark" ? "#8DD8FF" : "#1e293b",
            confirmButtonColor: "#0f172a"
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#0E2148] transition-colors duration-500 px-4 py-10">
            <Card
                color="white"
                shadow={true}
                className="w-full max-w-md p-6 rounded-3xl shadow-xl dark:bg-[#0E2148] dark:border dark:border-[#1d3557] transition-all duration-500">
                <Typography
                    variant="h4"
                    className="text-center font-bold text-[#f44336] dark:text-[#8DD8FF]">
                    Welcome Back 😍
                    <span className="block mt-2 text-sm text-gray-700 dark:text-[#8DD8FF]">
                        Enter Your Account 🔥
                    </span>
                </Typography>

                <form
                    className="mt-6 mb-4 flex flex-col gap-5"
                    onSubmit={handleCreateAccount}>
                    {/* Email */}
                    <div>
                        <Input
                            onChange={e =>
                                setUser({ ...user, email: e.target.value })
                            }
                            label="Email"
                            size="lg"
                            className="dark:text-[#8DD8FF]"
                            error={!emailCheck && user.email.length > 0}
                            color="blue"
                        />
                        {!emailCheck && user.email.length > 0 && (
                            <Typography
                                variant="small"
                                color="red"
                                className="mt-1 px-2">
                                Enter a valid email (e.g. example@gmail.com)
                            </Typography>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <Input
                            onChange={e =>
                                setUser({ ...user, password: e.target.value })
                            }
                            label="Password"
                            size="lg"
                            type={showPassword ? "text" : "password"}
                            className="dark:text-[#8DD8FF]"
                            error={!passwordCheck && user.password.length > 0}
                            color="blue"
                            icon={
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="focus:outline-none"
                                    tabIndex={-1}>
                                    {showPassword ? (
                                        <FiEyeOff
                                            className="text-gray-600 dark:text-[#8DD8FF]"
                                            size={20}
                                        />
                                    ) : (
                                        <FiEye
                                            className="text-gray-600 dark:text-[#8DD8FF]"
                                            size={20}
                                        />
                                    )}
                                </button>
                            }
                        />

                        {!passwordCheck && user.password.length > 0 && (
                            <Typography
                                variant="small"
                                color="red"
                                className="mt-1 px-2">
                                Password must be 6+ chars, with letters &
                                numbers
                            </Typography>
                        )}
                    </div>

                    <Button
                        fullWidth
                        className="mt-4 bg-[#f44336] hover:bg-[#e53935] dark:bg-[#8DD8FF] dark:hover:bg-[#71c5ea] dark:text-[#0E2148] text-white transition duration-300"
                        type="submit"
                        disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </Button>

                    <h1 className="flex justify-center text-red-300 hover:text-red-500 dark:text-[#8DD8FF] dark:hover:text-red-400 transition">
                        <Link to="/SignUp">
                            Don't have an account? Let's create one!
                        </Link>
                    </h1>
                </form>

                {/* Divider */}
                <div className="flex items-center justify-between gap-2 my-4">
                    <div className="h-px flex-1 bg-gray-300 dark:bg-[#8DD8FF]" />
                    <Typography className="text-xs text-gray-500 dark:text-[#8DD8FF]">
                        Or continue with
                    </Typography>
                    <div className="h-px flex-1 bg-gray-300 dark:bg-[#8DD8FF]" />
                </div>

                {/* Social Buttons */}
                <div className="flex flex-col items-center gap-4">
                    <Button
                        size="sm"
                        variant="outlined"
                        className="flex items-center gap-3 w-[85%] justify-center border-slate-300 dark:border-[#8DD8FF] dark:text-[#8DD8FF]"
                        onClick={progressAlert}>
                        <img
                            src="https://docs.material-tailwind.com/icons/google.svg"
                            alt="google"
                            className="w-6 h-6"
                        />
                        Continue with Google
                    </Button>
                    <Button
                        size="sm"
                        variant="outlined"
                        className="flex items-center gap-3 w-[85%] justify-center border-slate-300 dark:border-[#8DD8FF] dark:text-[#8DD8FF]"
                        onClick={progressAlert}>
                        <img
                            src="./github.png"
                            alt="github"
                            className="w-6 h-6"
                        />
                        Continue with GitHub
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Login;
