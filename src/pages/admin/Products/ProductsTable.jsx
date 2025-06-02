import { Card, Typography } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const TABLE_HEAD = ["Products", "Price", "Operators"];

/*


*/

const ProductsTable = ({
    myProducts,
    setMyProducts,
    adminLoading,
    isProductChange,
    setIsProductChange
}) => {
    const URL = import.meta.env.VITE_MAIN_URL;

    const deleteProduct = id => {
        const targetProduct = myProducts.find(product => product.id == id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`${URL}/products/${targetProduct?.id}`, {
                    method: "DELETE"
                })
                    .then(response => {
                        if (!response.ok) {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "There was a problem connecting to the server. Please try again later.",
                                confirmButtonText: "OK"
                            });
                            throw new Error("Failed to delete the product");
                        } else {
                            setIsProductChange(!isProductChange); // تحديث الحالة لإعادة جلب البيانات
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your product has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting product:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "There was a problem connecting to the server. Please try again later.",
                            confirmButtonText: "OK"
                        });
                    });
            }
        });
    };

    return (
        <>
            {!adminLoading ? (
                <>
                    <div className="w-full flex flex-col items-center justify-center text-5xl gap-8 ">
                        <h1>Products</h1>
                        <Link to="/Admin/add">
                            <Button color="green">add a new product</Button>
                        </Link>
                    </div>
                    <Card className="h-full w-full container mx-auto overflow-auto">
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
                                {myProducts.map(
                                    ({ title, price, image, id }, index) => {
                                        const isLast =
                                            index === myProducts.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={title}>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal">
                                                        <Avatar
                                                            className="mr-4"
                                                            src={image}
                                                            alt="avatar"
                                                            size="md"
                                                        />
                                                        {title}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal">
                                                        ${price}
                                                    </Typography>
                                                </td>

                                                <td className={`${classes}`}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-medium">
                                                        <Link
                                                            to={`/Admin/view/${id}`}>
                                                            <Button
                                                                variant="gradient"
                                                                className="rounded-full mr-3">
                                                                View
                                                            </Button>
                                                        </Link>
                                                        <Link
                                                            to={`/Admin/edit/${id}`}>
                                                            <Button
                                                                variant="gradient"
                                                                className="rounded-full mr-3">
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="gradient"
                                                            color="red"
                                                            className="rounded-full"
                                                            onClick={() =>
                                                                deleteProduct(
                                                                    id
                                                                )
                                                            }>
                                                            Delete
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
                </>
            ) : (
                <div className="min-h-screen flex items-center justify-center">
                    <span className="admin-full-loader"></span>
                </div>
            )}
        </>
    );
};
export default ProductsTable;
