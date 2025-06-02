import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Button,
    Input,
    Select,
    Option
} from "@material-tailwind/react";
import {
    FaUser,
    FaEnvelope,
    FaVenusMars,
    FaLock,
    FaInfoCircle
} from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";

import LoadingAnimation from "../Products/LoadingAnimation";

const Profile = ({
    userDataNow,
    setUserDataNow,
    setUserDataInNav,
    setIsConfirmEdit
}) => {
    const [currentUserProfile, setCurrentUserProfile] = useState(null);
    const [editableUserData, setEditableUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const userNameRegex = /^[A-Z][a-zA-Z0-9_]{0,19}$/;
    const emailRegex = /^[\w.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    const [nameCheck, setNameCheck] = useState(true);
    const [emailCheck, setEmailCheck] = useState(true);
    const [passwordCheck, setPasswordCheck] = useState(true);

    const [isLoadingEdit, setIsLoadingEdit] = useState(false);

    const myURL = import.meta.env.VITE_MAIN_URL;

    useEffect(() => {
        if (localStorage.userId && userDataNow) {
            const foundUser = userDataNow.find(
                user => user.id === Number(localStorage.userId)
            );
            if (foundUser) {
                setCurrentUserProfile(foundUser);
                setEditableUserData(foundUser);
            }
        }
    }, [userDataNow]);

    useEffect(() => {
        if (editableUserData) {
            setEditableUserData({
                ...editableUserData,
                img:
                    editableUserData.gender === "male"
                        ? "/male.png"
                        : "/female.png"
            });
        }
    }, [editableUserData?.gender]);

    useEffect(() => {
        if (editableUserData) {
            setNameCheck(userNameRegex.test(editableUserData.name));
            setEmailCheck(emailRegex.test(editableUserData.email));

            if (
                editableUserData.password &&
                editableUserData.password.length > 0
            ) {
                setPasswordCheck(passwordRegex.test(editableUserData.password));
            } else if (!isEditing) {
                setPasswordCheck(true);
            }
        }
    }, [
        editableUserData?.name,
        editableUserData?.email,
        editableUserData?.password,
        isEditing
    ]);

    const getCurrentTheme = () =>
        document.documentElement.classList.contains("dark") ? "dark" : "light";

    const handleEditClick = () => {
        setIsEditing(true);

        setEditableUserData({ ...currentUserProfile });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditableUserData({ ...currentUserProfile });
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setEditableUserData({
            ...editableUserData,
            [name]: value
        });
    };

    const handleSelectChange = value => {
        setEditableUserData({
            ...editableUserData,
            gender: value
        });
    };

    const handleConfirmEditing = () => {
        const currentTheme = getCurrentTheme();

        if (!editableUserData || !currentUserProfile) {
            // هنا ممكن تضيف تحكم لو البيانات ناقصة
        } else {
            if (
                !userNameRegex.test(editableUserData.name) ||
                !emailRegex.test(editableUserData.email) ||
                !passwordRegex.test(editableUserData.password) ||
                editableUserData.gender === ""
            ) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid input or missing gender selection. Please check all fields carefully.",
                    background: currentTheme === "dark" ? "#0E2148" : "#fff",
                    color: currentTheme === "dark" ? "#8DD8FF" : "#1e293b",
                    confirmButtonColor:
                        currentTheme === "dark" ? "#8DD8FF" : "#ef4444"
                });
            } else {
                const isNameOrEmailTakenByOtherUser = userDataNow.some(
                    user =>
                        user.id !== currentUserProfile.id &&
                        (user.name === editableUserData.name ||
                            user.email === editableUserData.email)
                );

                if (isNameOrEmailTakenByOtherUser) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "This username or email is already taken by another user. Please choose a different one.",
                        background:
                            currentTheme === "dark" ? "#0E2148" : "#fff",
                        color: currentTheme === "dark" ? "#8DD8FF" : "#1e293b",
                        confirmButtonColor:
                            currentTheme === "dark" ? "#8DD8FF" : "#ef4444"
                    });
                } else {
                    const hasChanged = Object.keys(editableUserData).some(
                        key =>
                            key !== "id" &&
                            editableUserData[key] !== currentUserProfile[key]
                    );

                    if (!hasChanged) {
                        Swal.fire({
                            icon: "info",
                            title: "No Changes",
                            text: "No changes were made to save.",
                            background:
                                currentTheme === "dark" ? "#0E2148" : "#fff",
                            color:
                                currentTheme === "dark" ? "#8DD8FF" : "#1e293b",
                            confirmButtonColor:
                                currentTheme === "dark" ? "#8DD8FF" : "#16a34a"
                        });
                        setIsEditing(false);
                    } else {
                        Swal.fire({
                            title: "Are you sure you want to edit now?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Yes, edit it!",
                            cancelButtonText: "No, cancel",
                            background:
                                currentTheme === "dark" ? "#0E2148" : "#fff",
                            color:
                                currentTheme === "dark" ? "#8DD8FF" : "#1e293b",
                            confirmButtonColor:
                                currentTheme === "dark" ? "#8DD8FF" : "#16a34a",
                            cancelButtonColor:
                                currentTheme === "dark" ? "#555" : "#ef4444"
                        }).then(result => {
                            if (result.isConfirmed) {
                                setIsLoadingEdit(true);

                                fetch(
                                    `${myURL}/users/${currentUserProfile.id}`,
                                    {
                                        method: "PUT",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(editableUserData)
                                    }
                                )
                                    .then(response => {
                                        if (!response.ok) {
                                            return response
                                                .json()
                                                .then(errorData => {
                                                    Swal.fire({
                                                        icon: "error",
                                                        title: "Error!",
                                                        text:
                                                            errorData.message ||
                                                            "There was a problem updating your account. Please try again.",
                                                        background:
                                                            currentTheme ===
                                                            "dark"
                                                                ? "#0E2148"
                                                                : "#fff",
                                                        color:
                                                            currentTheme ===
                                                            "dark"
                                                                ? "#8DD8FF"
                                                                : "#1e293b",
                                                        confirmButtonColor:
                                                            currentTheme ===
                                                            "dark"
                                                                ? "#8DD8FF"
                                                                : "#ef4444"
                                                    });
                                                    setIsLoadingEdit(false);
                                                    throw new Error(
                                                        "API Error"
                                                    );
                                                });
                                        }
                                        return response.json();
                                    })
                                    .then(updatedUser => {
                                        setCurrentUserProfile(updatedUser);
                                        setEditableUserData(updatedUser);

                                        if (setUserDataNow) {
                                            setUserDataNow(
                                                userDataNow.map(user =>
                                                    user.id === updatedUser.id
                                                        ? updatedUser
                                                        : user
                                                )
                                            );
                                        }
                                        setUserDataInNav(editableUserData);
                                        setIsConfirmEdit(true);
                                        setIsLoadingEdit(false);

                                        Swal.fire({
                                            icon: "success",
                                            title: "Success!",
                                            text: "Your profile has been updated successfully!",
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
                                        });

                                        setIsEditing(false);
                                    })
                                    .catch(error => {
                                        if (error.message !== "API Error") {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Error!",
                                                text: "A network error occurred. Please check your connection and try again.",
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
                                        }
                                        setIsLoadingEdit(false);
                                    });
                            }
                        });
                    }
                }
            }
        }
    };

    return (
        <>
            {currentUserProfile ? (
                <div
                    className="min-h-screen px-4 py-12 flex flex-col items-center
                                     bg-slate-50 dark:bg-[#0E2148] transition-colors duration-500 space-y-6">
                    {/* Card الصورة */}
                    <Card className="w-80 rounded-xl overflow-hidden flex flex-col items-center p-4 bg-transparent shadow-none">
                        <img
                            src={
                                editableUserData?.img || currentUserProfile.img
                            }
                            alt={`${currentUserProfile.name} Profile`}
                            className="w-full h-72 object-cover rounded-lg"
                        />
                    </Card>

                    {/* Card باقي البيانات بدون خلفية */}
                    <Card
                        className="w-full max-w-4xl p-6
                                         bg-transparent dark:bg-transparent dark:border dark:border-[#2e4672]">
                        <CardBody>
                            <Typography
                                variant="h4"
                                className="font-bold mb-1
                                                 text-green-600 dark:text-[#8DD8FF]">
                                {currentUserProfile.name}
                            </Typography>

                            <Typography
                                className="mb-6
                                                 text-gray-700 dark:text-[#A4E7FF]">
                                Username :{" "}
                                <strong className="dark:text-[#8DD8FF]">
                                    {currentUserProfile.name}
                                </strong>
                                <br />
                                My name is {currentUserProfile.name}, I'm a{" "}
                                {currentUserProfile.gender} and I'm a member
                                here.
                            </Typography>

                            <div className="space-y-6">
                                {/* قسم اسم المستخدم */}
                                <div>
                                    <Typography
                                        className="mb-1 font-medium
                                                         text-gray-900 dark:text-[#A4E7FF]">
                                        Your User Name
                                    </Typography>
                                    <Input
                                        disabled={!isEditing}
                                        value={editableUserData?.name || ""}
                                        name="name"
                                        onChange={handleInputChange}
                                        icon={
                                            <FaUser className="text-gray-700 dark:text-[#8DD8FF]" />
                                        }
                                        className="bg-white text-gray-800 dark:bg-[#12335a] dark:text-[#8DD8FF] placeholder:opacity-70 placeholder:text-sm"
                                        labelProps={{ className: "hidden" }}
                                        containerProps={{
                                            className: "min-w-0"
                                        }}
                                        error={
                                            isEditing &&
                                            !nameCheck &&
                                            editableUserData?.name.length > 0
                                        }
                                        color="blue"
                                        crossOrigin=""
                                    />

                                    {isEditing &&
                                        !nameCheck &&
                                        editableUserData?.name.length > 0 && (
                                            <Typography
                                                color="red"
                                                className="text-sm mt-1 flex items-center gap-1">
                                                <FaInfoCircle /> Username must
                                                be at least 3 characters, start
                                                with a letter, and contain only
                                                letters, numbers, or
                                                underscores.
                                            </Typography>
                                        )}
                                    {!isEditing && (
                                        <Typography
                                            className="text-sm mt-1
                                                         text-gray-500 dark:text-[#A4E7FF]">
                                            Better to have a unique user name to
                                            give good impression to others
                                        </Typography>
                                    )}
                                </div>

                                {/* قسم البريد الإلكتروني */}
                                <div>
                                    <Typography
                                        className="mb-1 font-medium
                                                         text-gray-900 dark:text-[#A4E7FF]">
                                        Your E-Mail
                                    </Typography>
                                    <Input
                                        disabled={!isEditing}
                                        value={editableUserData?.email || ""}
                                        name="email"
                                        onChange={handleInputChange}
                                        icon={
                                            <FaEnvelope className="text-gray-700 dark:text-[#8DD8FF]" />
                                        }
                                        className="bg-white text-gray-800 dark:bg-[#12335a] dark:text-[#8DD8FF] placeholder:opacity-70 placeholder:text-sm"
                                        labelProps={{ className: "hidden" }}
                                        containerProps={{
                                            className: "min-w-0"
                                        }}
                                        error={
                                            isEditing &&
                                            !emailCheck &&
                                            editableUserData?.email.length > 0
                                        }
                                        color="blue"
                                        crossOrigin=""
                                    />

                                    {isEditing &&
                                        !emailCheck &&
                                        editableUserData?.email.length > 0 && (
                                            <Typography
                                                color="red"
                                                className="text-sm mt-1 flex items-center gap-1">
                                                <FaInfoCircle /> Invalid email
                                                format.
                                            </Typography>
                                        )}
                                    {!isEditing && (
                                        <Typography
                                            className="text-sm mt-1
                                                         text-gray-500 dark:text-[#A4E7FF]">
                                            Better to have a readable E-Mail to
                                            give good impression to others
                                        </Typography>
                                    )}
                                </div>

                                {/* قسم النوع */}
                                <div>
                                    <Typography className="mb-1 font-medium text-gray-900 dark:text-[#A4E7FF]">
                                        Your Gender
                                    </Typography>
                                    {isEditing ? (
                                        <Select
                                            value={
                                                editableUserData?.gender || ""
                                            }
                                            onChange={handleSelectChange}
                                            className="text-sm text-gray-800 dark:bg-[#12335a] dark:text-[#8DD8FF]"
                                            menuProps={{
                                                className:
                                                    "dark:bg-[#0E2148] dark:text-[#8DD8FF]"
                                            }}
                                            animate={{
                                                mount: { y: 0 },
                                                unmount: { y: 25 }
                                            }}>
                                            <Option value="male">Male</Option>
                                            <Option value="female">
                                                Female
                                            </Option>
                                        </Select>
                                    ) : (
                                        <Input
                                            disabled
                                            value={
                                                currentUserProfile?.gender || ""
                                            }
                                            icon={
                                                <FaVenusMars className="text-gray-700 dark:text-[#8DD8FF]" />
                                            }
                                            className="bg-white text-gray-800 dark:bg-[#12335a] dark:text-[#8DD8FF]"
                                            labelProps={{ className: "hidden" }}
                                            containerProps={{
                                                className: "min-w-0"
                                            }}
                                            crossOrigin=""
                                        />
                                    )}
                                    <Typography className="text-sm mt-1 text-gray-500 dark:text-[#A4E7FF]">
                                        This is your current gender information.
                                    </Typography>
                                </div>

                                {/* قسم كلمة المرور - Now editable */}
                                <div>
                                    <Typography
                                        className="mb-1 font-medium
                                                         text-gray-900 dark:text-[#A4E7FF]">
                                        Your Password
                                    </Typography>
                                    <div className="relative">
                                        <Input
                                            disabled={!isEditing}
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            size="lg"
                                            color="blue"
                                            name="password"
                                            value={
                                                editableUserData?.password || ""
                                            }
                                            onChange={handleInputChange}
                                            error={
                                                isEditing &&
                                                !passwordCheck &&
                                                editableUserData?.password
                                                    .length > 0
                                            }
                                            className="bg-white dark:bg-[#12335a] dark:text-[#8DD8FF] placeholder:opacity-70 placeholder:text-sm pr-12"
                                            crossOrigin=""
                                        />

                                        <span
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer dark:text-[#8DD8FF]"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }>
                                            {showPassword ? (
                                                <AiFillEyeInvisible />
                                            ) : (
                                                <AiFillEye />
                                            )}
                                        </span>
                                    </div>
                                    {isEditing &&
                                        !passwordCheck &&
                                        editableUserData?.password.length >
                                            0 && (
                                            <Typography
                                                color="red"
                                                className="text-sm mt-1 flex items-center gap-1">
                                                <FaInfoCircle /> Password must
                                                be at least 6 characters, and
                                                contain at least one letter and
                                                one number.
                                            </Typography>
                                        )}
                                    {!isEditing && (
                                        <Typography
                                            className="text-sm mt-1
                                                         text-gray-500 dark:text-[#A4E7FF]">
                                            Your password is securely hidden.
                                        </Typography>
                                    )}
                                </div>

                                {/* أزرار التحكم */}
                                <div className="flex gap-4 pt-6">
                                    {!isEditing && (
                                        <Button
                                            onClick={handleEditClick}
                                            className="text-white
                                                         bg-gray-900 hover:bg-gray-800
                                                         dark:bg-[#4E71FF] dark:hover:bg-[#3b5de4]">
                                            EDIT
                                        </Button>
                                    )}

                                    {isEditing && (
                                        <>
                                            <Button
                                                onClick={handleConfirmEditing}
                                                color="red"
                                                disabled={isLoadingEdit}
                                                className={`
    text-white 
    bg-red-500 hover:bg-red-600 
    dark:bg-[#8DD8FF] dark:hover:bg-[#71c5ea] dark:text-[#0E2148]
    flex items-center justify-center gap-2
    disabled:opacity-60 disabled:cursor-not-allowed
    transition-colors duration-300 ease-in-out
  `}
                                                type="button">
                                                {isLoadingEdit ? (
                                                    <>
                                                        <svg
                                                            className="animate-spin h-5 w-5 text-white dark:text-[#0E2148]"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24">
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"></circle>
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                                        </svg>
                                                        Loading...
                                                    </>
                                                ) : (
                                                    "CONFIRM EDITING"
                                                )}
                                            </Button>

                                            <Button
                                                onClick={handleCancelEdit}
                                                color="blue-gray"
                                                variant="outlined"
                                                className="dark:border-[#8DD8FF] dark:text-[#8DD8FF] hover:bg-gray-100 dark:hover:bg-[#1d3557]">
                                                CANCEL
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            ) : (
                <LoadingAnimation />
            )}
        </>
    );
};

export default Profile;
