import React, { useEffect, useState } from "react";
import { Input, Button, Textarea } from "@material-tailwind/react";
import { MdAttachMoney } from "react-icons/md";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import ProductNotFound from "./ProductNotFound";

/*

if (!currentProduct) {
        return <ProductNotFound />;
    }

*/

const SpinnerComponent = () => (
    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
);

const ProductsTableEdit = ({
    myProducts,
    setIsProductChange,
    isProductChange
}) => {
    // states

    const [titleInput, setTitleInput] = useState("");
    const [priceInput, setPriceInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [imageInput, setImageInput] = useState("");
    const [ratingRateInput, setRatingRateInput] = useState("");
    const [ratingCountInput, setRatingCountInput] = useState("");
    const [loading, setLoading] = useState(false);

    const { editProductId } = useParams();

    const currentProduct = myProducts.find(product => {
        return product.id == editProductId;
    });

    useEffect(() => {
        if (currentProduct) {
            setTitleInput(currentProduct.title);
            setPriceInput(currentProduct.price);
            setDescriptionInput(currentProduct.description);
            setCategoryInput(currentProduct.category);
            setImageInput(currentProduct.image);
            setRatingRateInput(currentProduct.rating?.rate);
            setRatingCountInput(currentProduct.rating?.count);
        }
    }, [currentProduct]);
    const navigate = useNavigate();

    const titleRegex = /^[a-zA-Z0-9\s\-.,'":;()\/\\!?%&@#+=_]{5,100}$/;

    const priceRegex = /^\d+(\.\d+)?$/;
    const descriptionRegex = /^.{5,}$/;
    const categoryRegex = /^[a-zA-Z\s']{5,30}$/;
    const imageRegex = /^https:\/\/[^"]+\.(jpg|jpeg|png|gif)$/;
    const ratingRateRegex = /^(?:[0-4](?:\.\d)?|5(?:\.0)?)$/;
    const ratingCountRegex = /^\d{1,4}$/;
    const isProductExists = myProducts?.some(
        product =>
            product.title === titleInput &&
            product.price === priceInput &&
            product.description === descriptionInput &&
            product.category === categoryInput &&
            product.image === imageInput &&
            product.rating?.rate === ratingRateInput &&
            product.rating?.count === ratingCountInput
    );

    const handleSubmit = e => {
        e.preventDefault();
        const URL = import.meta.env.VITE_MAIN_URL;

        if (
            !titleRegex.test(titleInput) ||
            !priceRegex.test(priceInput) ||
            !descriptionRegex.test(descriptionInput) ||
            !categoryRegex.test(categoryInput) ||
            !imageRegex.test(imageInput) ||
            !ratingRateRegex.test(ratingRateInput) ||
            !ratingCountRegex.test(ratingCountInput) ||
            isProductExists
        ) {
            Swal.fire({
                title: "Warning",
                text: "Please make sure all fields are valid and the product doesn't already exist.",
                icon: "warning",
                confirmButtonText: "OK"
            });
        } else {
            Swal.fire({
                title: "Are you sure you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes, Save",
                denyButtonText: `Don't Save`
            }).then(result => {
                if (result.isConfirmed) {
                    setLoading(true);

                    fetch(`${URL}/products/${editProductId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            title: titleInput,
                            price: priceInput,
                            description: descriptionInput,
                            category: categoryInput,
                            image: imageInput,
                            rating: {
                                rate: ratingRateInput,
                                count: ratingCountInput
                            }
                        })
                    })
                        .then(res => {
                            if (!res.ok) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "There was a problem connecting to the server. Please try again later.",
                                    confirmButtonText: "OK"
                                });
                                throw new Error("Network response was not ok");
                            }
                            return res.json();
                        })
                        .then(data => {
                            Swal.fire(
                                "Saved!",
                                "Product updated successfully!",
                                "success"
                            );
                            setIsProductChange(!isProductChange);
                            navigate("/Admin/ProductsTable");
                        })
                        .catch(error => {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "There was a problem connecting to the server. Please try again later.",
                                confirmButtonText: "OK"
                            });
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                } else if (result.isDenied) {
                    Swal.fire("Changes were not saved", "", "info");
                }
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-6">
                <h2 className="text-3xl font-bold text-center text-black mb-6">
                    Edit Product
                </h2>

                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    onSubmit={handleSubmit}>
                    {/* Title */}
                    <div>
                        <Input
                            label="Title"
                            name="title"
                            onChange={e => setTitleInput(e.target.value)}
                            error={
                                titleInput !== "" &&
                                !titleRegex.test(titleInput)
                            }
                            value={titleInput}
                        />
                        {titleInput !== "" && !titleRegex.test(titleInput) && (
                            <p className="text-red-500 text-sm mt-1">
                                Please enter a valid title (5-50 characters).
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div className="relative">
                        <Input
                            label="Price"
                            name="price"
                            icon={<MdAttachMoney className="text-gray-700" />}
                            onChange={e => setPriceInput(e.target.value)}
                            error={
                                priceInput !== "" &&
                                !priceRegex.test(priceInput)
                            }
                            value={priceInput}
                        />
                        {priceInput !== "" && !priceRegex.test(priceInput) && (
                            <p className="text-red-500 text-sm mt-1">
                                Please enter a valid price (number, decimals
                                allowed).
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <Textarea
                            label="Description"
                            name="description"
                            onChange={e => setDescriptionInput(e.target.value)}
                            error={
                                descriptionInput !== "" &&
                                !descriptionRegex.test(descriptionInput)
                            }
                            value={descriptionInput}
                        />
                        {descriptionInput !== "" &&
                            !descriptionRegex.test(descriptionInput) && (
                                <p className="text-red-500 text-sm mt-1">
                                    Please enter a valid description (5-150
                                    characters).
                                </p>
                            )}
                    </div>

                    {/* Category */}
                    <div>
                        <Input
                            label="Category"
                            name="category"
                            onChange={e => setCategoryInput(e.target.value)}
                            error={
                                categoryInput !== "" &&
                                !categoryRegex.test(categoryInput)
                            }
                            value={categoryInput}
                        />
                        {categoryInput !== "" &&
                            !categoryRegex.test(categoryInput) && (
                                <p className="text-red-500 text-sm mt-1">
                                    Please enter a valid category (5-30
                                    letters).
                                </p>
                            )}
                    </div>

                    {/* Image URL */}
                    <div>
                        <Input
                            label="Image URL (must start with https)"
                            name="image"
                            placeholder="https://example.com/image.jpg"
                            onChange={e => setImageInput(e.target.value)}
                            error={
                                imageInput !== "" &&
                                !imageRegex.test(imageInput)
                            }
                            value={imageInput}
                        />
                        {imageInput !== "" && !imageRegex.test(imageInput) && (
                            <p className="text-red-500 text-sm mt-1">
                                Please enter a valid image URL (https and
                                jpg/png/gif).
                            </p>
                        )}
                    </div>

                    {/* Rating */}
                    <div>
                        <Input
                            label="Rating (0-5)"
                            name="rate"
                            onChange={e => setRatingRateInput(e.target.value)}
                            error={
                                ratingRateInput !== "" &&
                                !ratingRateRegex.test(ratingRateInput)
                            }
                            value={ratingRateInput}
                        />
                        {ratingRateInput !== "" &&
                            !ratingRateRegex.test(ratingRateInput) && (
                                <p className="text-red-500 text-sm mt-1">
                                    Please enter a rating between 0 and 5.
                                </p>
                            )}
                    </div>

                    {/* Rating Count */}
                    <div>
                        <Input
                            label="Rating Count"
                            name="count"
                            onChange={e => setRatingCountInput(e.target.value)}
                            error={
                                ratingCountInput !== "" &&
                                !ratingCountRegex.test(ratingCountInput)
                            }
                            value={ratingCountInput}
                        />
                        {ratingCountInput !== "" &&
                            !ratingCountRegex.test(ratingCountInput) && (
                                <p className="text-red-500 text-sm mt-1">
                                    Please enter a rating count (1-4 digits).
                                </p>
                            )}
                    </div>

                    <div className="flex justify-end md:col-span-2 text-right ">
                        <Button
                            type="submit"
                            className="bg-black text-white min-w-[120px] flex items-center justify-center"
                            disabled={loading}>
                            {loading && <SpinnerComponent className="mr-2" />}
                            {loading ? "Loading" : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default ProductsTableEdit;
