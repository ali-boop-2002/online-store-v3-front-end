import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import { useState } from "react";
import LoadingSpinner from "../Newcomponents/LoadingSpinner";
import RelatedProducts from "../Newcomponents/RelatedProducts";
import Review from "@/Newcomponents/Review";
// import { useGetProductReviewsQuery } from "@/slices/reviewSlice";
import StarRating from "@/Newcomponents/StarRating";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slices/cartSlice";

function ProductScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const [quantity, setQuantity] = useState(1);
  // function handleIncreaseQuantity() {
  //   setQuantity((prev) => prev + 1);
  // }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        description: product.description,
        countInStock: product.countInStock,
        image: product.image[0],
        price: product.price,
        qty: 1, // default qty
      })
    );
  };

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [currentImage, setCurrentImage] = useState(0);
  // const {
  //   data: reviews,
  //   isLoading: LoadingReview,
  //   isError: LoadingError,
  // } = useGetProductReviewsQuery(id);
  // console.log(reviews);
  if (isLoading)
    return (
      <>
        <LoadingSpinner />
      </>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-600">Error loading product.</p>
    );

  if (!product) return <p className="text-center mt-10">No product found.</p>;

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.image.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === product.image.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-6 ">
        {/* Image carousel */}
        {/* Image carousel */}
        <div className="md:w-1/2 ">
          <div className="relative h-96 flex items-center justify-center bg-gray-100 border-2 border-gray-400 rounded-lg shadow-lg ">
            <img
              src={product.image[currentImage]}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />

            {/* Prev Button */}
            <button
              onClick={prevImage}
              className="absolute hover:cursor-pointer left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-black rounded-full p-2 hover:bg-opacity-90 shadow"
              aria-label="Previous Image"
            >
              &#8592;
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-2 hover:cursor-pointer top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-black rounded-full p-2 hover:bg-opacity-90 shadow"
              aria-label="Next Image"
            >
              &#8594;
            </button>

            {/* Image count */}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              {currentImage + 1} / {product.image.length}
            </div>
          </div>

          {/* Thumbnails below image */}
          <div className="flex gap-2 justify-center mt-4  bg-opacity-90 p-2 rounded">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setCurrentImage(index)}
                className={`w-14 h-12 object-contain cursor-pointer rounded-md shadow-sm border ${
                  currentImage === index
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="md:w-1/2 flex flex-col justify-center ">
          <h1 className="text-lg md:text-3xl font-semibold mb-4">
            {product.name}
          </h1>
          <div className="flex">
            <StarRating value={product.rating || 0} readOnly={true} />
            <span className="ml-1 mt-0.5">({product.numReviews || 0})</span>
          </div>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="text-lg md:text-2xl font-bold text-blue-700">
            ${product.price}
          </p>
          <div className="relative h-24 ">
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0">
              <button
                className="bg-amber-300 rounded-3xl h-10 w-40 px-4 hover:cursor-pointer transform hover:scale-110 shadow-2xl hover:bg-amber-400 transition-all"
                onClick={() => {
                  // handleIncreaseQuantity();
                  handleAddToCart();
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts />
      <Review />
    </>
  );
}

export default ProductScreen;
