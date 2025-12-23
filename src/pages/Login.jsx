import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { authStart, authSuccess, authFailure } from "../store/slices/authSlice";
import { loginUser } from "../services/authService";

// Schema: Validate Phone & Password
const schema = yup
  .object({
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    dispatch(authStart());
    try {
      // 1. Authenticate User
      const result = await loginUser(data);
      dispatch(authSuccess(result));

      // 2. CHECK ROLE & REDIRECT
      // Note: Depending on your backend, role might be inside result.user.role or just result.role
      const role = result.role || result.user?.role;

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "vendor") {
        navigate("/vendor/dashboard");
      } else {
        navigate("/"); // Customers go to Home/Shop
      }
    } catch (err) {
      dispatch(
        authFailure(
          err.response?.data?.message || "Invalid phone number or password"
        )
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Phone Number Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="Enter your 10-digit number"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          <p className="text-red-500 text-xs mt-1">{errors.phone?.message}</p>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.password?.message}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* FOOTER LINKS */}
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign up (Customer)
          </Link>
        </p>

        {/* Added Link for Vendor Registration */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-gray-500">
            Want to sell products?{" "}
            <Link
              to="/vendor/register"
              className="text-purple-600 hover:underline font-bold"
            >
              Register as Vendor
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
