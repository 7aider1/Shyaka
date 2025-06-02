import {
    Card,
    Input,
    Button,
    Typography,
    Select,
    Option
} from "@material-tailwind/react";
import { FaInfoCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Spinner } from "@material-tailwind/react";

const SignUp = ({
    setIsLogged,
    userDataNow, // This prop should contain ALL users
    setUserDataNow // This prop should be a function to update ALL users
}) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
        gender: "",
        img: ""
    });

    const myURL = import.meta.env.VITE_MAIN_URL;
    const [nameCheck, setNameCheck] = useState(false);
    const [emailCheck, setEmailCheck] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const userNameRegex = /^[A-Z][a-zA-Z0-9_]{0,19}$/;
    const emailRegex = /^[\w.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUser(currentUser => ({
            ...currentUser,
            img: currentUser.gender === "male" ? "/male.png" : "/female.png"
        }));
    }, [user.gender]);

    useEffect(() => {
        setNameCheck(userNameRegex.test(user.name));
        setEmailCheck(emailRegex.test(user.email));
        setPasswordCheck(passwordRegex.test(user.password));
    }, [user.name, user.email, user.password]);

    const navigate = useNavigate();

    const handleCreateAccount = e => {
        e.preventDefault();

        const currentTheme = document.documentElement.classList.contains("dark")
            ? "dark"
            : "light";

        const userExists = userDataNow.some(
            data => data.name === user.name || data.email === user.email
        );

        if (
            !userNameRegex.test(user.name) ||
            !emailRegex.test(user.email) ||
            !passwordRegex.test(user.password) ||
            user.gender === "" ||
            userExists
        ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: userExists
                    ? "User with this name or email already exists!"
                    : "Some inputs are missing or contain invalid values.",
                background: currentTheme === "dark" ? "#0E2148" : "#fff",
                color: currentTheme === "dark" ? "#8DD8FF" : "#1e293b",
                confirmButtonColor:
                    currentTheme === "dark" ? "#8DD8FF" : "#ef4444"
            });
        } else {
            Swal.fire({
                title: "Confirm Sign Up",
                text: "Are you sure you want to create this account?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes, create it!",
                cancelButtonText: "Cancel",
                background: currentTheme === "dark" ? "#0E2148" : "#fff",
                color: currentTheme === "dark" ? "#8DD8FF" : "#1e293b",
                confirmButtonColor:
                    currentTheme === "dark" ? "#16a34a" : "#16a34a",
                cancelButtonColor:
                    currentTheme === "dark" ? "#ef4444" : "#ef4444"
            }).then(result => {
                if (result.isConfirmed) {
                    setLoading(true);

                    fetch(`${myURL}/users`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(response.status);
                            } else {
                                return response.json();
                            }
                        })
                        .then(newUser => {
                            const updatedUserData = [...userDataNow, newUser];
                            setUserDataNow(updatedUserData);

                            localStorage.setItem("userId", newUser.id);
                            setIsLogged(true);

                            Swal.fire({
                                icon: "success",
                                title: "Success!",
                                text: "Your account has been created successfully!",
                                confirmButtonText: "Great!",
                                background:
                                    currentTheme === "dark"
                                        ? "#0E2148"
                                        : "#fff",
                                color:
                                    currentTheme === "dark"
                                        ? "#8DD8FF"
                                        : "#1e293b",
                                confirmButtonColor:
                                    currentTheme === "dark"
                                        ? "#8DD8FF"
                                        : "#16a34a"
                            }).then(() => {
                                navigate("/");
                            });
                        })
                        .catch(error => {
                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: "There was a problem creating your account. Please try again.",
                                background:
                                    currentTheme === "dark"
                                        ? "#0E2148"
                                        : "#fff",
                                color:
                                    currentTheme === "dark"
                                        ? "#8DD8FF"
                                        : "#1e293b",
                                confirmButtonColor:
                                    currentTheme === "dark"
                                        ? "#8DD8FF"
                                        : "#ef4444"
                            });
                        })
                        .finally(() => setLoading(false));
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Cancelled",
                        text: "You cancelled the account creation.",
                        background:
                            currentTheme === "dark" ? "#0E2148" : "#fff",
                        color: currentTheme === "dark" ? "#8DD8FF" : "#1e293b",
                        confirmButtonColor:
                            currentTheme === "dark" ? "#8DD8FF" : "#ef4444"
                    });
                }
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
                    Create Your Account 🔥
                </Typography>
                <h1 className="mt-1 text-center text-sm text-red-300 hover:text-red-500 transition-colors duration-200 dark:text-[#8DD8FF] dark:hover:text-red-400">
                    <Link to="/Login">Do you already have an account?</Link>
                </h1>

                <form
                    className="mt-6 flex flex-col gap-5"
                    onSubmit={handleCreateAccount}>
                    {/* Username */}
                    <div className="flex flex-col gap-1">
                        <Input
                            label="Username"
                            size="lg"
                            color="blue"
                            onChange={e =>
                                setUser({ ...user, name: e.target.value })
                            }
                            error={!nameCheck && user.name.length > 0}
                            className="dark:text-[#8DD8FF] placeholder:opacity-90 placeholder:text-sm"
                        />
                        {!nameCheck && user.name.length > 0 && (
                            <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                                <span>
                                    Username must start with uppercase and be up
                                    to 20 characters, letters, digits, or
                                    underscores.
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <Input
                            label="Email"
                            size="lg"
                            color="blue"
                            onChange={e =>
                                setUser({ ...user, email: e.target.value })
                            }
                            error={!emailCheck && user.email.length > 0}
                            className="dark:text-[#8DD8FF] placeholder:opacity-90 placeholder:text-sm"
                        />
                        {!emailCheck && user.email.length > 0 && (
                            <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                                <span>Please enter a valid email address.</span>
                            </div>
                        )}
                    </div>
                    {/* Password */}
                    <div className="flex flex-col gap-1 relative">
                        <div className="relative">
                            <Input
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                size="lg"
                                color="blue"
                                onChange={e =>
                                    setUser({
                                        ...user,
                                        password: e.target.value
                                    })
                                }
                                error={
                                    !passwordCheck && user.password.length > 0
                                }
                                className="dark:text-[#8DD8FF] placeholder:opacity-90 placeholder:text-sm pr-12"
                            />
                            <span
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer dark:text-[#8DD8FF]"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                    <AiFillEyeInvisible />
                                ) : (
                                    <AiFillEye />
                                )}
                            </span>
                        </div>
                        {!passwordCheck && user.password.length > 0 && (
                            <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                                <span>
                                    Password must be at least 6 characters and
                                    include letters and numbers.
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Gender */}
                    <Select
                        label="Select Gender"
                        value={user.gender}
                        onChange={val => setUser({ ...user, gender: val })}
                        className="text-sm dark:text-[#8DD8FF]"
                        menuProps={{
                            className: "dark:bg-[#0E2148] dark:text-[#8DD8FF]"
                        }}>
                        <Option value="" disabled>
                            Select a gender
                        </Option>
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                    </Select>

                    {/* Submit */}
                    <Button
                        fullWidth
                        type="submit"
                        disabled={loading}
                        className={`mt-4 bg-[#f44336] hover:bg-[#e53935] dark:bg-[#8DD8FF] dark:hover:bg-[#71c5ea] dark:text-[#0E2148] text-white transition duration-300 flex justify-center items-center gap-2`}>
                        {loading && (
                            <Spinner
                                size="sm"
                                className="text-white dark:text-[#0E2148]"
                            />
                        )}
                        Sign Up
                    </Button>
                </form>

                {/* Divider */}
                <div className="flex items-center justify-center gap-2 my-6">
                    <div className="h-px flex-1 bg-gray-300 dark:bg-[#8DD8FF]" />
                    <Typography className="text-sm text-gray-500 dark:text-[#8DD8FF]">
                        Or continue with
                    </Typography>
                    <div className="h-px flex-1 bg-gray-300 dark:bg-[#8DD8FF]" />
                </div>

                {/* Social Buttons */}
                <div className="flex flex-col items-center gap-3">
                    <Button
                        color="blue-gray"
                        size="sm"
                        variant="outlined"
                        className="flex items-center gap-3 w-[85%] border-slate-300 hover:transition justify-center dark:border-[#8DD8FF] dark:text-[#8DD8FF]"
                        onClick={progressAlert}>
                        <img
                            src="https://docs.material-tailwind.com/icons/google.svg"
                            alt="google"
                            className="w-6 h-6"
                        />
                        Continue with Google
                    </Button>
                    <Button
                        color="blue-gray"
                        size="sm"
                        variant="outlined"
                        className="flex items-center gap-3 w-[85%] border-slate-300 hover:transition justify-center dark:border-[#8DD8FF] dark:text-[#8DD8FF]"
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

export default SignUp;
