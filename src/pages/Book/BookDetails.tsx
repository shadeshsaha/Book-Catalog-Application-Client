/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import defaultBook from "../../assets/defaultbook.jpg";
import {
  usePostReviewMutation,
  useSingleBookQuery,
} from "../../redux/features/book/bookApi";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../redux/hook";
import { IBook } from "../../types/bookTypes";

import { useCreateWishListMutation } from "../../redux/features/wishlist/wishListApi";
import Footer from "../shared/Footer";
import Loading from "../shared/Loading";
import NotFound from "../shared/NotFound";

const defaultBookRating = 4.5;
const BookDetails = () => {
  const dispatch = useAppDispatch();
  const email = localStorage.getItem("email");
  const [createWishList] = useCreateWishListMutation();
  const handleAddBook = (book: IBook) => {
    dispatch(addToCart(book));
    toast.success("Product Added to Cart Successfully!");
  };

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [postReview] = usePostReviewMutation();
  const writtenBy = localStorage.getItem("firstName");
  const onSubmit: SubmitHandler<FieldValues> = async (data, e) => {
    e!.preventDefault();
    const options = {
      id: id,
      data: { title: data.title, writtenBy: writtenBy },
    };
    const result = await postReview(options).unwrap();
    const { statusCode } = result;
    if (statusCode === 200) {
      toast.success("Review Added SuccessFully");
    } else {
      toast.error("Internal Server Error!! please try again Later");
    }
    reset();
  };

  const loggedInEmail = localStorage.getItem("email");
  const { data: book, isLoading } = useSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 9000,
  });
  if (isLoading) {
    return <Loading />;
  }
  if (book?.data[0] === undefined) {
    return <NotFound />;
  }
  const bookData = book?.data[0];
  const reviewData = bookData?.review;

  const handleWishList = async (book: IBook) => {
    try {
      const options = {
        data: { wishList: bookData, email: email },
      };
  
      const result = await createWishList(options).unwrap();
      toast.success("Book is Added to Wishlist Successfully!");
    } catch (error) {
  
      toast.error("WishList is Already Exists");
    }
  };

  return (
    <div className="">
      <div className="hero px-10 py-24  min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={bookData?.bookImage || defaultBook}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <p className="text-xs font-bold">{id}</p>
            <h1 className="text-xl text-cyan-400 font-bold">
              {bookData?.title}
            </h1>

            <p className=" text-md text-teal-500 font-semibold ">
              Written By : {bookData?.author}
            </p>
            <p className=" text-md text-red-400 font-semibold ">
              Genre : {bookData?.genre}
            </p>

            <p className=" text-md font-semibold ">
              Description :{" "}
              <span className="text-sm text-cyan-800">
                {bookData?.bookDescription}
              </span>
            </p>

            <p className=" text-md font-semibold ">
              Publication Date : {bookData?.publicationDate}
            </p>

            <p className=" text-md font-semibold ">
              Rating : {bookData?.rating || defaultBookRating}
            </p>
            <p className=" text-md font-semibold ">
              Price : $ {bookData?.price}
            </p>

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            {loggedInEmail && (
              <>
                <button
                  onClick={() => handleWishList(book)}
                  className="btn btn-outline btn-defult btn-sm mx-2  "
                >
                  Add to WishList
                </button>

                <button
                  onClick={() => handleAddBook(bookData)}
                  className="btn btn-outline btn-primary btn-sm mx-2  "
                >
                  Add to Cart
                </button>
              </>
            )}

            {loggedInEmail === bookData?.addedBy && (
              <Link to={`/edit-book/${id}`}>
                <button className="btn ml-2 btn-outline btn-sm">
                  Edit this Book
                </button>
              </Link>
            )}

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            <small className=" text-xs text-blue-700 font-semibold ">
              This Book is Added By : {bookData?.addedBy}
            </small>
          </div>
        </div>
      </div>

      {loggedInEmail && (
        <div className="flex mb-5  ">
          <div className="w-25 ">
            {reviewData &&
              reviewData
                .slice()
                .reverse()
                .map((item: any) => (
                  <div className="card w-96 h-32 mb-5 bg-base-300 shadow-xl">
                    <div className="card-body">
                      <h2 className="text-cyan-500 font-bold">
                        <small className="text-xs">Reviewed By:</small>
                        {item?.writtenBy}
                      </h2>
                      <p className="text-sm text-gray-900">{item.title}</p>
                      <p className="text-xs font-bold text-red-800">
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))}
          </div>

          <div className="w-full flex  items-start  justify-end">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="md:hero font-bold mt-5 ml-16"
            >
              <div className="card flex-shrink-0 w-full  max-w-screen-sm shadow-2xl ">
                <div className="card-body">
                  {/* Book Review */}

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Add Review For that Book
                      </span>
                    </label>
                    <textarea
                      {...register("title", { required: true })}
                      name="title"
                      placeholder="Write Review here....."
                      className="input input-bordered h-32"
                      aria-invalid={errors.title ? "true" : "false"}
                    />
                    {errors.title?.type === "required" && (
                      <small className="text-red-600">
                        Book Review is required!
                      </small>
                    )}
                  </div>

                  <div className="form-control mt-6">
                    <button className="btn font-bold btn-primary">
                      Add Review
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BookDetails;
