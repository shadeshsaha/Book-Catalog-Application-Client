/* eslint-disable no-unused-vars */
import Lottie from "lottie-react";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import signup from "../../assets/animation/118046-lf20-oahmox5rjson.json";
import { createUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isSuccess, error } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (isSuccess && !error) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Congratulation!! Signup Successfully Done!!❤️",
        showConfirmButton: true,
        timer: 2500,
      });
      reset();
      navigate("/login");
    }
    if (error) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Signup Failure ! please try again!",
        showConfirmButton: true,
        timer: 2500,
      });
      reset();
    }
  }, [error, isSuccess, reset]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(
      createUser({
        email: data.email,
        password: data.password,
        lastName: data.lastName,
        firstName: data.firstName,
      })
    );
  };

  return (
    <div className="main-container px-20 py-16 md:hero min-h-screen   justify-items-center">
      <div className="hero min-h-screen bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse  ">
          <div className="text-center ">
            <h1 className="text-5xl font-bold">
              SignUp <span className="text-blue-500">Now!</span>{" "}
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
                {/* FirstName */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text"> First Name: </span>
                  </label>

                  <input
                    {...register("firstName", { required: true })}
                    name="firstName"
                    placeholder="First Name"
                    className="input input-bordered"
                    aria-invalid={errors.firstName ? "true" : "false"}
                  />
                  {errors.firstName?.type === "required" && (
                    <small className="text-red-600">
                      First name is required!
                    </small>
                  )}
                </div>
                {/* Last Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>

                  <input
                    {...register("lastName", { required: true })}
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered"
                  />
                  {errors.lastName?.type === "required" && (
                    <small className="text-red-600">
                      Last name is required!
                    </small>
                  )}
                </div>

                {/* email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Email:</span>
                  </label>

                  <input
                    {...register("email", {
                      required: "Email is required",
                      validate: {
                        maxLength: (v) =>
                          v.length <= 50 ||
                          "The email should have at most 50 characters",
                        matchPattern: (v) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            v
                          ) || "Email address must be a valid address",
                      },
                    })}
                    name="email"
                    placeholder="Email"
                    className="input input-bordered"
                  />

                  {typeof errors.email?.message === "string" && (
                    <small className="text-red-600">
                      {errors.email.message}
                    </small>
                  )}
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password : </span>
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      validate: {
                        maxLength: (v) =>
                          v.length <= 15 ||
                          "The Password have at most 15 characters",
                        minLength: (v) =>
                          v.length >= 6 ||
                          "The Password have at least 6 characters",
                      },
                    })}
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input input-bordered"
                  />
                  {typeof errors.password?.message === "string" && (
                    <small className="text-red-600">
                      {errors.password.message}
                    </small>
                  )}
                </div>

                <div className="form-control mt-6">
                  <button className="btn font-bold btn-primary">
                    Register
                  </button>
                  <p className="text-sm font-bold mt-4">
                    Already have an Account?{" "}
                    <Link to="/login" className="text-blue-500 ">
                      Login
                    </Link>{" "}
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
