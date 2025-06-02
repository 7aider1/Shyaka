import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";
import { FaUsers } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { TbDoorEnter } from "react-icons/tb";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ userDataNow, myProducts }) => {
    const currentUser = userDataNow[userDataNow.length - 1];
    const currentProduct = myProducts[myProducts.length - 1];

    return (
        <div className="w-full min-h-screen flex flex-col items-center p-4">
            <h1 className="text-4xl mb-14 mt-8">Dashboard</h1>
            <div className="flex flex-wrap justify-around items-start w-full gap-6">
                <Card
                    color="gray"
                    variant="gradient"
                    className="w-full max-w-[20rem] p-8">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center">
                        <Typography
                            variant="h1"
                            color="white"
                            className="mt-6 flex justify-center gap-1 text-7xl font-normal">
                            <span className="mt-2 text-4xl">Users</span>
                        </Typography>
                    </CardHeader>
                    <CardBody className="p-0">
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <FaUsers />
                                </span>
                                <Typography className="font-normal">
                                    Numbers of Users:{" "}
                                    <span className="bg-orange-100 text-gray-800">
                                        {userDataNow.length}
                                    </span>
                                </Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <FaUserCheck />
                                </span>
                                <Typography className="font-normal">
                                    Last user registered:{" "}
                                    <span className="bg-orange-100 text-gray-800">
                                        {currentUser?.name}
                                    </span>
                                </Typography>
                            </li>
                        </ul>
                    </CardBody>
                    <CardFooter className="mt-12 p-0">
                        <Link to="/Admin/users">
                            <Button
                                size="lg"
                                color="white"
                                className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                                ripple={false}
                                fullWidth={true}>
                                check users
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                <Card
                    color="gray"
                    variant="gradient"
                    className="w-full max-w-[20rem] p-8">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center">
                        <Typography
                            variant="h1"
                            color="white"
                            className="mt-6 flex justify-center gap-1 text-7xl font-normal">
                            <span className="mt-2 text-4xl">Products</span>
                        </Typography>
                    </CardHeader>
                    <CardBody className="p-0">
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <AiFillProduct />
                                </span>
                                <Typography className="font-normal">
                                    Numbers of Products:{" "}
                                    <span className="bg-orange-100 text-gray-800">
                                        {myProducts.length}
                                    </span>
                                    {/* هنا حط عدد المنتاجات */}
                                </Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <TbDoorEnter />
                                </span>
                                <Typography className="font-normal">
                                    Last product added:{" "}
                                    <span className="bg-orange-100 text-gray-800">
                                        {currentProduct?.title}
                                    </span>
                                    {/* اخر منتج اتضاف للموقع */}
                                </Typography>
                            </li>
                        </ul>
                    </CardBody>
                    <CardFooter className="mt-12 p-0">
                        <Link to="/Admin/ProductsTable">
                            <Button
                                size="lg"
                                color="white"
                                className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                                ripple={false}
                                fullWidth={true}>
                                Check Products
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};
export default Dashboard;
