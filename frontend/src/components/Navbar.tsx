"use client";
import { FaBarsStaggered } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";
import { logout } from "../redux/features/user/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { token, username, role } = useSelector(
    (state: RootState) => state.user
  );
  const location = useLocation();
  const currentPath = location.pathname;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Navigation links based on roles
  const navLinks = [
    role === "instructor" && {
      id: 10,
      label: "Assigned Courses",
      href: "/assigned-courses",
    },
    role === "user" && {
      id: 7,
      label: "AvailableCourses",
      href: "/available-courses",
    },
    role === "user" && { id: 2, label: "My Courses", href: "/my-courses" },
    role === "admin" && { id: 4, label: "Admin Dashboard", href: "/" },
    role === "admin" && {
      id: 3,
      label: "Manage Courses",
      href: "/courses",
    },
    role === "admin" && { id: 5, label: "Manage Users", href: "/users" },
  ].filter(Boolean);

  useEffect(() => {}, [token, username, role]);

  return (
    <nav className="navbar bg-base-300 shadow-lg mb-8">
      <div className="navbar align-element mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <Link
            to="/"
            className="hidden btn mask mask-hexagon-2 lg:flex h-full rounded-full text-3xl items-center"
          >
            AP
          </Link>
          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              {/* NavLinks */}
              {navLinks.map(({ id, label, href }: any) => (
                <li
                  className={
                    href === currentPath
                      ? "capitalize bg-gray-400 rounded-lg hover:bg-base-500 mx-2"
                      : "capitalize hover:bg-base-500 hover:rounded-lg mx-2"
                  }
                  key={id}
                >
                  <Link className="text-2xl" to={href}>
                    {label}
                  </Link>
                </li>
              ))}
              {!token && (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="capitalize hover:bg-base-500 hover:rounded-lg mx-2"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="capitalize hover:bg-base-500 hover:rounded-lg mx-2"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            {navLinks.map(({ id, label, href }: any) => (
              <li
                className={
                  href === currentPath
                    ? "text-2xl capitalize bg-gray-400 rounded-lg hover:bg-base-500 mx-2"
                    : "text-2xl capitalize hover:bg-base-500 hover:rounded-lg mx-2"
                }
                key={id}
              >
                <Link to={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        {token ? (
          <div className="navbar-end space-x-8 relative">
            <div className="avatar cursor-pointer" onClick={toggleDropdown}>
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <div className="bg-white text-3xl rounded-full flex items-center justify-center">
                  {username?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-32 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="navbar-end space-x-8">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
