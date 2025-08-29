import {
  useGetProductReviewsQuery,
  useWriteProductReviewMutation,
} from "@/slices/reviewSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";
import StarRating from "./StarRating";
import { useSelector } from "react-redux";
Modal.setAppElement("#root");

function Review() {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productReview, SetProductReview] = useState("");
  const [productRating, setProductRating] = useState(0);
  const { data: reviews, isLoading, isError } = useGetProductReviewsQuery(id);
  const [writeProductReview, { isLoading: writing, isError: ProductError }] =
    useWriteProductReviewMutation();
  const handleSubmit = async () => {
    try {
      const review = {
        review: productReview,
        rating: productRating,
        product: id,
      };

      await writeProductReview(review).unwrap();
      toast.success("Review updated");
      SetProductReview("");
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong ");
    }
  };
  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p>Error loading reviews.</p>;
  //   if (!reviews || reviews.length === 0) return <p>No reviews found.</p>;

  return (
    <div className=" flex flex-col items-center mt-5 ">
      {userInfo && (
        <label
          className="bg-gray-200 px-4 py-2 rounded-full mt-2 hover:cursor-pointer hover:bg-gray-300 active:to-blue-600"
          onClick={() => setModalIsOpen(true)}
        >
          Write a customer review
        </label>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Write Review Modal"
        className="bg-blue-200 p-2 md:p-6 rounded-xl shadow-lg md:w-120 mx-auto md:mt-32"
        overlayClassName="fixed inset-0  bg-opacity-50 flex items-center justify-center"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            handleSubmit(); // Call your async submit function
            setModalIsOpen(false); // Close modal
          }}
        >
          <h2 className="md:text-xl font-bold mb-4">Write Your Review</h2>
          <div className="m-4  flex justify-center items-center">
            <StarRating
              readOnly={false}
              value={productRating}
              onChange={(newRating) => {
                setProductRating(newRating);
              }}
            />
          </div>
          <input
            type="text"
            value={productReview}
            placeholder="write review"
            className="w-110 h-30 text-2xl px-2 flex justify-start bg-gray-100 rounded-2xl"
            onChange={(e) => SetProductReview(e.target.value)}
          />
          <div className="flex justify-end gap-2 m-2 ">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:cursor-pointer"
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {reviews.map((review) => (
        <div key={review._id} className=" flex justify-center items-center">
          <div className=" mt-2 p-2 border-b-2 pb-5 border-gray-200 md:min-w-[calc(100vw-500px)] min-w-screen">
            <div className=" text-black flex justify-center rounded-2xl border-2 border-gray-500 min-w-20 px-4 py-1">
              {review.user?.name.slice(0, 20)}
            </div>
            <div className="ml-5">
              <StarRating value={review.rating} readOnly={true} />
            </div>

            <div>{review.review}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Review;
