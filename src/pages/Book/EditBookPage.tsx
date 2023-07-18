/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import defaultBook from "../../assets/defaultbook.jpg";
import {
  useDeleteBookMutation,
  useEditBookMutation,
  useSingleBookQuery,
} from "../../redux/features/book/bookApi";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../redux/hook";
import { IBook } from "../../types/bookTypes";

import { ReactNode, useEffect } from "react";
import Footer from "../shared/Footer";
import Loading from "../shared/Loading";
import NotFound from "../shared/NotFound";
import Swal from "sweetalert2";

const EditBookPage = () => {

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: book, isLoading } = useSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 9000,
  });

  const bookData = book?.data[0];

  useEffect(() => {
    if (bookData) {
      setValue("title", bookData.title);
      setValue("author", bookData.author);
      setValue("genre", bookData.genre);
      setValue("publishedDate", bookData.publicationDate);
      setValue("year", bookData.year);
      setValue("price", bookData.price);
      setValue("bookDescription", bookData.bookDescription);
    }
  }, [bookData, setValue]);

  const [editBook] = useEditBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const editedBy = localStorage.getItem("email");

  const onSubmit: SubmitHandler<FieldValues> = async (data, e) => {
    e!.preventDefault();
    const options = {
      id: id,
      data: {
        title: data.title,
        editedBy: editedBy,
        author: data.author,
        genre: data.genre,
        publicationDate: data.publishedDate,
        year: data.year,
        price: data.price,
        bookDescription: data.bookDescription,
      },
    };
    const result = await editBook(options).unwrap();
    const { statusCode } = result;

    if (statusCode === 200) {
      toast.success("Book Edited SuccessFully");
      navigate(`/book-details/${id}`)
    } else {
      toast.error("Internal Server Error!! please try again Later");
    }
    reset();
  };

  const handleDeleteBook = async (id: any) => {
  
    Swal.fire({
      title: 'Do you want to delete this Book ?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Delete Book',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', '', 'success');
        result = await deleteBook(id).unwrap();
        navigate("/books")
      }
    });

  };
  
  const loggedInEmail = localStorage.getItem("email");
  if (isLoading) {
    return <Loading />;
  }
  if (book?.data[0] === undefined) {
    return <NotFound />;
  }

  return (
    <div className="">
      <div className="hero px-10 py-1   min-h-screen">
        <div className="hero-content   w-full  flex-col lg:flex-row">
          <img
            src={bookData?.bookImage || defaultBook}
            className="max-w-sm  rounded-lg shadow-2xl"
          />

          <div className=" bg-base-200 p-16 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className=" font-bold ">
              <div className="  ">
                <p className="text-cyan-500  ">Edit Book </p>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                {/* Title */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text"> Title: </span>
                  </label>
                  <input
                    {...register("title", { required: true })}
                    name="title"
                    placeholder="Book Title "
                    className="input input-bordered"
                    aria-invalid={errors.title ? "true" : "false"}
                  />
                  {errors.title?.type === "required" && (
                    <small className="text-red-600">Title is required!</small>
                  )}
                </div>
                {/* Author */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Author:</span>
                  </label>
                  <input
                    {...register("author", { required: true })}
                    name="author"
                    placeholder="Author"
                    className="input input-bordered"
                    aria-invalid={errors.author ? "true" : "false"}
                  />
                  {errors.author?.type === "required" && (
                    <small className="text-red-600">Author is required!</small>
                  )}
                </div>

                {/* Genre */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Genre:</span>
                  </label>
                  <input
                    {...register("genre", { required: true })}
                    name="genre"
                    placeholder="Genre"
                    className="input input-bordered"
                    aria-invalid={errors.genre ? "true" : "false"}
                  />
                  {errors.genre?.type === "required" && (
                    <small className="text-red-600">Genre is required!</small>
                  )}
                </div>

                {/* Published Date */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Published Date:</span>
                  </label>
                  <input
                    {...register("publishedDate", { required: true })}
                    name="publishedDate"
                    type="date"
                    className="input input-bordered"
                    aria-invalid={errors.publishedDate ? "true" : "false"}
                  />
                  {errors.publishedDate?.type === "required" && (
                    <small className="text-red-600">
                      Published Date is required!
                    </small>
                  )}
                </div>

                {/* Year */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Year:</span>
                  </label>
                  <input
                    {...register("year", {
                      required: true,
                      pattern: {
                        value: /^\d{4}$/,
                        message: "Year must be a 4-digit number",
                      },
                    })}
                    name="year"
                    type="number"
                    placeholder="Year"
                    className="input input-bordered"
                    aria-invalid={errors.year ? "true" : "false"}
                  />
                  {errors.year?.type === "required" && (
                    <small className="text-red-600">Year is required!</small>
                  )}
                  {errors.year?.type === "pattern" && (
                    <small className="text-red-600">
                      {errors.year.message as ReactNode}
                    </small>
                  )}
                </div>

                {/* Book Description */}

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Book Description:</span>
                  </label>
                  <textarea
                    {...register("bookDescription", {
                      required: "Book Description is required!",
                    })}
                    name="bookDescription"
                    placeholder="Book Description"
                    className="input input-bordered h-32"
                    aria-invalid={errors.bookDescription ? "true" : "false"}
                  />
                  {errors.bookDescription && (
                    <small className="text-red-600">
                      {errors.bookDescription.message as ReactNode}
                    </small>
                  )}
                </div>

                <div className="form-control mt-6">
                  {loggedInEmail === bookData?.addedBy && (
                    <button className="btn font-bold btn-primary">
                      Edit This Book
                    </button>
                  )}
                </div>
              </div>
            </form>

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            {loggedInEmail === bookData?.addedBy && (
              <>
                <button
                  onClick={() => handleDeleteBook(id)}
                  className="btn ml-2   btn-outline btn-sm"
                >
                  Delete this Book
                </button>
              </>
            )}

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            <small className=" text-xs text-blue-700 font-semibold ">
              Last Edited By : {bookData?.addedBy} at{" "}
              <span className="text-red-500">{bookData?.lastUpdateTime}</span>
            </small>
            <br />
            <small className=" text-xs text-blue-700 font-semibold ">
              This Book is Added By : {bookData?.addedBy}
            </small>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditBookPage;
