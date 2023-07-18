/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Lottie from "lottie-react";

import { ReactNode } from "react";
import { toast } from "react-hot-toast";
import login from "../../assets/animation/38435-register.json";
import { loginUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { userEmail, loading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const result = await dispatch(
        loginUser({ email: data.email, password: data.password })
      );

      if (result.payload?.statusCode) {
        toast.success("Successfully Logged In !! ");
        reset();
      } else {
        toast.error("Incorrect Password");
      }
    } catch (error) {
      toast.error("Login error:");
    }
  };
  useEffect(() => {
    if (userEmail && !loading) {
      navigate(from, { replace: true });
    }
  }, [loading, userEmail]);

  return (
    <div className="main-container  p-4 py-20 md:hero min-h-screen   justify-items-center">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className=" text-center">
            <h1 className="text-5xl font-bold">
              Login <span className="text-blue-500">Here !</span>{" "}
            </h1>

            <div className="w-1/8 mb-10 md:mb-0 mx-auto">
              <Lottie animationData={login} loop={true} />
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:hero font-bold "
          >
            <div className="card flex-shrink-0 w-full max-w-screen-sm  shadow-2xl ">
              <div className="card-body">
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

                  {errors.email && (
                    <small className="text-red-600">
                      {errors.email.message as ReactNode}
                    </small>
                  )}
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password : </span>
                  </label>
                  <input
                    {...register("password", { required: true })}
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input input-bordered"
                  />
                  {errors.password?.type === "required" && (
                    <span className="text-red-600">Password is required!</span>
                  )}
                </div>

                <label className="label">
                  <Link
                    to="/forgot-password"
                    className="label-text-alt text-blue-500 "
                  >
                    Forgot password?
                  </Link>
                </label>

                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                  <p className="text-sm font-bold mt-4">
                    Don't you have any Account ?{" "}
                    <Link to="/signup" className="text-blue-500 ">
                      Register
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

export default Login;
