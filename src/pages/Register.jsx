import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { authStart, authSuccess, authFailure } from "../store/slices/authSlice";
import { registerUser } from "../services/authService";

// Updated Schema: Password min 8 chars + Complexity Format
const schema = yup
  .object({
    name: yup.string().required("Full name is required"),
    email: yup // <--- ADD THIS
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  })
  .required();

const Register = () => {
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
      // Send data directly (name, phone, password)
      const result = await registerUser(data);

      dispatch(authSuccess(result));
      navigate("/");
    } catch (err) {
      dispatch(
        authFailure(err.response?.data?.message || "Registration failed")
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            {...register("name")}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
        </div>

        {/* === ADD EMAIL FIELD HERE === */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="john@example.com"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="e.g., 9876543210"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          <p className="text-red-500 text-xs mt-1">{errors.phone?.message}</p>
        </div>

        {/* Password */}
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
          {loading ? "Registering..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
