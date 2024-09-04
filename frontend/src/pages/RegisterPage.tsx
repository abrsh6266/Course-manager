import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";
import { registerRequest } from "../redux/features/user/userSlice";
import { RootState } from "../redux/store";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector(
    (state: RootState) => state.user
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    setIsFormValid(validate());
  }, [formData]);

  const validate = () => {
    let isValid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      dispatch(
        registerRequest({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
      );
      if (!error) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="card w-96 gap-y-4 shadow-lg flex flex-col bg-base-100 p-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>

        {/* Username Input */}
        <FormInput
          type="text"
          label="username"
          name="username"
          handleChange={handleChange}
          defaultValue={formData.username}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
        )}

        {/* Email Input */}
        <FormInput
          type="email"
          label="email"
          name="email"
          handleChange={handleChange}
          defaultValue={formData.email}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}

        {/* Password Input */}
        <FormInput
          type="password"
          label="password"
          name="password"
          handleChange={handleChange}
          defaultValue={formData.password}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}

        {/* Confirm Password Input */}
        <FormInput
          type="password"
          label="confirm password"
          name="confirmPassword"
          handleChange={handleChange}
          defaultValue={formData.confirmPassword}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}

        {/* Error from API */}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        {/* Submit Button */}
        <div className="mt-4">
          <SubmitBtn
            text="Register"
            disabled={!isFormValid}
            loading={loading}
          />
        </div>

        {/* Login Link */}
        <p className="text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
