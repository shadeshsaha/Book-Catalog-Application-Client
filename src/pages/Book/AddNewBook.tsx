/* eslint-disable no-unused-vars */
import Lottie from "lottie-react";
import { ReactNode } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import signup from "../../assets/animation/addNewBook.json";
import { usePostBookMutation } from "../../redux/features/book/bookApi";
const AddNewBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [postBook] = usePostBookMutation();
  const addedBy = localStorage.getItem("email");
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data, e) => {
    e!.preventDefault();
    const options = {
      data: {
        title: data.title,
        addedBy: addedBy,
        author: data.author,
        genre: data.genre,
        publicationDate: data.publishedDate,
        year: data.year,
        price: data.price,
        bookDescription: data.bookDescription,
      },
    };

    try {
      const result = await postBook(options).unwrap();
      const { statusCode, status } = result;
      if (statusCode === 200) {
        toast.success("Book Added SuccessFully");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Book Added SuccessFully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/books");
        reset();
      }
      if (status === 409) {
        toast.error("This Book is Already Exist");
      }
    } catch (error: any) {
      if (error.status === 409) {
        toast.error("This Book is Already Exist");
      }
    }

    reset();
  };

  return (
    <div className="main-container px-20 py-16 md:hero min-h-screen   justify-items-center">
      <div className="hero min-h-screen bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse  ">
          <div className="text-center ">
            <h1 className="text-5xl font-bold">
              Add Your <span className="text-blue-500">Favorite Book</span>{" "}
            </h1>

            <div className="w-1/8 mb-10 md:mb-0 mx-auto">
              <Lottie animationData={signup} loop={true} />
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:hero font-bold "
          >
            <div className="card flex-shrink-0  w-full max-w-screen-md shadow-2xl ">
              <div className="card-body">
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
                  <select
                    {...register("genre", { required: true })}
                    name="genre"
                    className="input input-bordered"
                    aria-invalid={errors.genre ? "true" : "false"}
                  >
                   
                    <option value="nonfiction">Non-fiction</option>
                    <option value="humor">Humor</option>
                    <option value="memoir">Memoir</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="horror">Horror</option>
                    <option value="nystery">Mystery & Thriller</option>
                    <option value="historical">Historical Fiction</option>
                    <option value="science">Science-Fiction</option>
                  </select>
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

                {/* Price */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price:</span>
                  </label>
                  <input
                    {...register("price", {
                      required: "Price is required!",
                      validate: {
                        positiveNumber: (value) =>
                          value > 0 || "Price must be a positive number",
                      },
                    })}
                    name="price"
                    type="number"
                    placeholder="Price"
                    className="input input-bordered"
                    aria-invalid={errors.price ? "true" : "false"}
                  />

                  {errors.price && (
                    <small className="text-red-600">
                      {errors.price.message as ReactNode}
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
                  <button className="btn font-bold btn-primary">
                    Add Book
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewBook;
