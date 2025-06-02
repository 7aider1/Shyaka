// src/pages/admin/Users/UsersTableView.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Card,
    CardBody,
    Typography,
    Button,
    Avatar
} from "@material-tailwind/react";

const UsersTableView = ({ user, userDataNow, adminLoading }) => {
    const navigate = useNavigate();

    const { userId } = useParams();

    const targetUser = userDataNow.find(user => user.id == userId);

    return (
        <>
            {!adminLoading ? (
                <div className="min-h-screen bg-gray-100 p-8 flex items-start justify-center">
                    <Card className="w-full max-w-4xl grid md:grid-cols-2 gap-6 p-4 shadow-lg">
                        <div className="flex items-center justify-center">
                            <Avatar
                                src={targetUser?.img || "loading..."}
                                alt={targetUser?.name || "loading..."}
                                className="w-40 h-40 border border-gray-300 shadow-md"
                            />
                        </div>

                        <CardBody>
                            <Typography variant="h5" className="mb-4">
                                {targetUser?.name || "loading..."}
                            </Typography>

                            <Typography className="mb-2 text-gray-700">
                                <strong>Email:</strong>{" "}
                                {targetUser?.email || "loading..."}
                            </Typography>

                            <Typography className="mb-2 text-gray-700">
                                <strong>Gender:</strong>{" "}
                                {targetUser?.gender || "loading..."}
                            </Typography>

                            <Typography className="mb-2 text-gray-700">
                                <strong>Role:</strong>{" "}
                                {targetUser?.role || "loading..."}
                            </Typography>
                            <Typography className="mb-2 text-gray-700">
                                <strong>Password:</strong>{" "}
                                {targetUser?.password || "loading..."}
                            </Typography>

                            <Button
                                className="mt-6 bg-black text-white"
                                onClick={() => navigate("/Admin/Users")}>
                                Back to Users
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            ) : (
                <div className="min-h-screen flex items-center justify-center">
                    <span className="admin-full-loader"></span>
                </div>
            )}
        </>
    );
};

export default UsersTableView;
