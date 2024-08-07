/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Link from "../../../node_modules/next/link";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
const NavSupplier = () => {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    Cookies.remove("roleName");
    Cookies.remove("userName");
    toast.success("Logout successful");
    router.push("/login");
  };
  return (
    <div>
      <header className="nav-supllier">
        <div className="logo">
          <p className="text-white text-center font-bold text-2xl pt-4">
            Trek Booking
          </p>
        </div>
        <div className="list-choose pt-10 px-4 pb-14">
          <ul className="pl-0">
            <div className="py-2">
              <li className="flex items-center pb-2">
              <Link
                className={`flex no-underline  nav-i-hover py-2 pl-3 pr-16 ${
                  pathname === "/manage/dashboard" ? "active-link" : ""
                } `}
                href="/manage/dashboard"
              >
                <img className="w-7 h-7 " src="/image/darhboard.png" alt="" />
                <span className="text-white ml-2 text-xl font-semibold">
                  Dashboard
                </span>
              </Link>
              </li>
            </div>
            <li className="flex items-center pb-6 ">
              <Link
                className={`flex no-underline  nav-i-hover py-2 pl-3 pr-16 ${
                  pathname === "/manage/hotel" ? "active-link" : ""
                } `}
                href="/manage/hotel"
              >
                <img className="w-7 h-7 " src="/image/suitcase.png" alt="" />
                <span className="text-white ml-2 text-xl font-semibold">
                  Manage Hotel
                </span>
              </Link>
            </li>
            <li className="flex items-center pb-6 ">
              <Link
                className={`flex no-underline  nav-i-hover py-2 pl-3 pr-16 ${
                  pathname === "/manage/tour" ? "active-link" : ""
                } `}
                href="/manage/tour"
              >
                <img className="w-7 h-7 " src="/image/suitcase.png" alt="" />
                <span className="text-white ml-2 text-xl font-semibold">
                  Manage Tour
                </span>
              </Link>
            </li>
            <li className="flex items-center pb-6 ">
              <Link
                className={`flex no-underline  nav-i-hover py-2 pl-3 pr-16 ${
                  pathname === "/manage/user" ? "active-link" : ""
                } `}
                href="/manage/user"
              >
                <img className="w-7 h-7 " src="/image/staff.png" alt="" />
                <span className="text-white ml-2 text-xl font-semibold">
                  Manage User
                </span>
              </Link>
            </li>
            <li className="flex items-center pb-6">
              <Link
                className="flex no-underline nav-i-hover py-2 pl-3 pr-16"
                href="/manage/supplier"
              >
                <img className="w-7 h-7 " src="/image/staff.png" alt="" />
                <span className="text-white ml-2 text-xl font-semibold">
                  Manage Supplier
                </span>
              </Link>
            </li>
            {/* <li className="flex items-center pb-6 ">
              <Link
                className={`flex no-underline  nav-i-hover py-2 pl-3 pr-16 ${
                  pathname === "/manage/role" ? "active-link" : ""
                } `}
                href="/manage/role"
              >
                <img className="w-7 h-7 " src="/image/suitcase.png" alt="" />
                <span className="text-white ml-2 text-xl font-semibold">
                  Manage Roles
                </span>
              </Link>
            </li> */}
            <li className="flex items-center">
              <Link
                className={`flex no-underline  nav-i-hover py-2 pl-3 pr-16 ${
                  pathname === "/manage/service" ? "active-link" : ""
                } `}
                href="/manage/service"
              >
                <img className="w-7 h-7 " src="/image/gift.png" alt="" />
                <span className="text-white ml-2 text-xl font-semibold">
                  Manage Room Service
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="border-solid border-t-2 border-white pt-3">
          <Link
            href="/"
            onClick={handleLogout}
            className="bottom-logout flex justify-center items-center  no-underline text-white"
          >
            <img className="w-7 h-7 " src="/image/out.png" alt="" />
            <p className="color-white mb-0 ml-1 font-semibold text-xl">
              Log out
            </p>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default NavSupplier;
