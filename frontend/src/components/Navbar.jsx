import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const isActive = (path) => location.pathname.startsWith(path);
  const closeOnNav = () => {
    setOpen(false);
    setUserMenuOpen(false);
  };

  useEffect(() => {
    const onClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl items-center justify-between mx-auto p-4 w-full">
        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Collapsible container  */}
        <div
          id="navbar-default"
          className={`${
            open ? "block" : "hidden"
          } w-full md:flex md:items-center md:gap-8`}
        >
          {/* Left links */}
          <ul className="pt-4 md:pt-0 font-medium flex flex-col gap-3 md:flex-row md:gap-8 md:items-center">
            <li>
              <Link
                to="/"
                onClick={closeOnNav}
                className={`${
                  isActive("/") && location.pathname === "/"
                    ? "menu-item-active"
                    : "link-hover"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/companies"
                onClick={closeOnNav}
                className={`${
                  isActive("/companies")
                    ? "menu-item-active"
                    : "link-hover"
                }`}
              >
                Companies
              </Link>
            </li>
            <li>
              <Link
                to="/employees"
                onClick={closeOnNav}
                className={`${
                  isActive("/employees")
                    ? "menu-item-active"
                    : "link-hover"
                }`}
              >
                Employees
              </Link>
            </li>
          </ul>

          {/* right auth */}
          <div className="mt-4 md:mt-0 md:ml-auto">
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                  className="flex items-center gap-2 link-hover text-sm"
                >
                  <span className="text-sm">{user?.username}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.957a.75.75 0 111.08 1.04l-4.25 4.53a.75.75 0 01-1.08 0l-4.25-4.53a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div
                    role="menu"
                    className="absolute md:right-0 z-20 mt-2 w-44 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
                  >
                    <button
                      role="menuitem"
                      onClick={() => {
                        logout();
                        closeOnNav();
                      }}
                      className="block w-full px-4 py-2 text-left text-sm link-hover"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  onClick={closeOnNav}
                  className={`${
                    isActive("/login")
                      ? "menu-item-active"
                      : "link-hover"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={closeOnNav}
                  className={`${
                    isActive("/signup")
                      ? "menu-item-active"
                      : "link-hover"
                  }`}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
