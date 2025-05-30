import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useTodoMutation } from "../../hooks/useTodoMutation";
import userService from "../../services/userService";
import toast from "react-hot-toast";
import { PasswordStrengthIndicator } from "../../utils/passwordStrength";
import "./register.css";

export default function Register() {
  const navigate = useNavigate();
  const registerMutation = useTodoMutation(userService.registerUser);

  const getErrorMessage = (error) => {
    return (
      error.response?.data?.error?.details?.message ||
      "Registration failed. Please try again."
    );
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values) => {
      const { confirmPassword, ...userData } = values;
      try {
        const response = await toast.promise(
          registerMutation.mutateAsync(userData),
          {
            loading: "Creating account...",
            success: "Registration successful!",
            error: (err) => getErrorMessage(err),
          }
        );

        if (response?.success) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
  });

  return (
    <div id="main-register">
      <div className="register-container">
        <div className="register-box">
          <h2 className="register-title">Create Account</h2>

          <form onSubmit={formik.handleSubmit} className="register-form">
            <div className="register-input-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className={
                  formik.touched.username && formik.errors.username
                    ? "input-error"
                    : ""
                }
              />
              {formik.touched.username && formik.errors.username && (
                <div className="error-message">{formik.errors.username}</div>
              )}
            </div>

            <div className="register-input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={
                  formik.touched.email && formik.errors.email
                    ? "input-error"
                    : ""
                }
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-message">{formik.errors.email}</div>
              )}
            </div>

            <div className="register-input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={
                  formik.touched.password && formik.errors.password
                    ? "input-error"
                    : ""
                }
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error-message">{formik.errors.password}</div>
              )}
              <PasswordStrengthIndicator password={formik.values.password} />
            </div>

            <div className="register-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="confirmPassword"
                placeholder="Confirm your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "input-error"
                    : ""
                }
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="error-message">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>

            <button
              type="submit"
              className="register-btn"
              disabled={!formik.isValid || registerMutation.isPending}
            >
              {registerMutation.isPending ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="login-prompt">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
