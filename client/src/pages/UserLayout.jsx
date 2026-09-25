import { useEffect, useRef, useState } from "react";
import {
  Menu, X, Home, History, BadgeDollarSign, Goal, UserCircle, SlidersVertical
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppProvider";
import SkeletonLoader from "../components/SkeletonLoader";

export default function UserLayout() {
  const { setSearch, logout, navigate, user, loading } = useAppContext();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);
  const userDropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      const res = await logout();
    } catch (error) {
      return null;
    }
  }

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, href: "/" },
    { name: "Add Transactions", icon: <BadgeDollarSign size={20} />, href: "/add-transactions" },
    { name: "Budgets", icon: <Goal size={20} />, href: "/budgets" },
    { name: "Set Budgets", icon: <SlidersVertical size={20} />, href: "/set-budgets" },
    { name: "Transactions", icon: <History size={20} />, href: "/transactions" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isMobile = window.innerWidth < 768;

      if (isMobile && isOpen &&
        !sidebarRef.current?.contains(e.target) &&
        !toggleRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }

      if (showUserDropdown && !userDropdownRef.current?.contains(e.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, showUserDropdown]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-slate-900/80 backdrop-blur-md border-r border-slate-800 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-5 py-8">
          <span
            onClick={() => navigate("/")}
            className="text-xl text-emerald-400 font-bold flex items-center gap-2 cursor-pointer"
          >
            <img src="./logo.png" alt="" className="size-8 drop-shadow-md" /> FinTrack
          </span>
          <button
            ref={toggleRef}
            className="md:hidden text-slate-400 hover:text-slate-200"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="px-5 space-y-4">
          {menuItems.map(({ name, icon, href }) => (
            <Link
              key={href}
              to={href}
              className={`flex items-center gap-3 py-3 px-2.5 font-semibold rounded-lg border transition-all
              ${location.pathname === href
                  ? "bg-slate-800 text-blue-400 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                  : "border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
            >
              {icon} <span>{name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-4 flex items-center justify-between gap-4">
          <button
            ref={toggleRef}
            className="md:hidden text-slate-400 hover:text-slate-200"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center justify-between md:w-full gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center border pl-3 gap-2 bg-slate-800/50 border-slate-700 h-[46px] rounded-lg w-full max-w-md focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full h-full text-sm text-slate-200 placeholder-slate-400 bg-transparent outline-none"
                onChange={(e) => {
                  setSearch(e.target.value);
                  navigate("/transactions");
                }}
              />
            </div>

            {/* User Dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <button onClick={() => setShowUserDropdown(prev => !prev)} className="cursor-pointer">
                <UserCircle size={30} className="text-slate-400 hover:text-slate-200 transition-colors" />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg border border-slate-700 p-4 z-50 shadow-xl">
                  <p className="text-sm font-semibold text-slate-200 mb-3 truncate">{user.email}</p>
                  <button
                    className="text-rose-400 hover:text-rose-300 cursor-pointer bg-slate-900 border w-full px-3 py-2 rounded-lg border-rose-500/50 hover:border-rose-400 hover:bg-rose-500/10 transition-all text-sm font-medium"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          {loading ? <SkeletonLoader /> : <Outlet />}
        </main>
      </div>
    </div>
  );
}
