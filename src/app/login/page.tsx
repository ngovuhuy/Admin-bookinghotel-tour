"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { FormEvent, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import "../../../public/css/authen.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import userService from "../services/userService";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPassword, setIsPassword] = useState(true);
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const router = useRouter();
  useEffect(() => {
    const message = searchParams.get("message");
    if (message === "missingCredentials") {
      toast.error("Missing credentials. Please log in.");
    } else if (message === "notAuthorized") {
      toast.error("You are not authorized to access this page.");
    }
  }, [searchParams]);


  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = await userService.loginAdmin(email, password);

    if (result.success) {
      setSuccessMessage("Login successful! Redirecting...");
      setErrorMessage(""); // Clear any previous error message
      const redirectUrl = searchParams.get("redirect") || "/manage/dashboard";
        router.push(decodeURIComponent(redirectUrl)); // Chuyển hướng đến URL đã lưu trữ hoặc trang chủ nếu không có URL
    } else {
      setSuccessMessage(""); // Clear any previous success message
      setErrorMessage(result.errorMessage || "Account or password is incorrect.");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPassword(!isPassword);
  };

  return (
    <div>
      <div className="image-bk">
        <div className="login">
          <div className="text-login">
            <h3 className="text-center font-bold color-black">Log In</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="text-input relative">
              <p className="color-black m-0 pt-2 pb-1">Enter your email</p>
              <input
                className="input-text"
                type="text"
                placeholder="Email/ Phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <p className="m-0 pt-4 pb-1">Enter your password</p>
              <input
                className="input-text"
                type={isPassword ? "password" : "text"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* <img
                src="/image/hide.png"
                className="inout-hide cursor-pointer"
                onClick={togglePasswordVisibility}
                alt="Toggle visibility"
              /> */}
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <div className="flex justify-center">
                <button
                  className="w-4/5 text-xl text-white button-text mt-4"
                  style={{ backgroundColor: "#305A61", borderRadius: "20px" }}
                >
                  Continue
                </button>
              </div>
              <div className="nav-sign flex justify-between pt-3 pb-4">
                <Link
                  className="pt-2 text-right text-base cursor-pointer text-decoration"
                  href="/signup_client"
                ></Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default function WrappedLoginClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginAdmin />
    </Suspense>
  );
}