import { Avatar, Button, Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const TABLE_HEAD = ["Name", "Role", "Image", "Operators", ""];

export function UsersTable({ userDataNow, adminLoading }) {
    return (
        <div className="min-h-screen w-screen flex flex-col items-center justify-start p-8 gap-8">
            {/* العنوان */}
            <h1 className="text-5xl font-bold">Users</h1>

            {/* الجدول */}
            {!adminLoading ? (
                <Card className="w-full max-w-7xl overflow-auto shadow-lg">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map(head => (
                                    <th
                                        key={head}
                                        className="border-b text-center border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70">
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {userDataNow.map(
                                ({ name, role, img, id }, index) => {
                                    const isLast =
                                        index === userDataNow.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={name}>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal flex justify-center text-lg">
                                                    {name}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal flex justify-center text-lg">
                                                    {role}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal flex justify-center text-lg">
                                                    <Avatar
                                                        src={img}
                                                        alt="avatar"
                                                        variant="rounded"
                                                    />
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    as={Link}
                                                    to={`/Admin/viewUser/${id}`}
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-medium flex justify-center">
                                                    <Button variant="gradient">
                                                        View
                                                    </Button>
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </Card>
            ) : (
                <div className="min-h-screen flex items-center justify-center">
                    <span className="admin-full-loader"></span>
                </div>
            )}
        </div>
    );
}
