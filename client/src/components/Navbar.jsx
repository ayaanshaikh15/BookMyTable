
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user,setLoading,setUser } = useContext(AuthContext);
const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenu, setMobileMenu] = useState(false);

  // Temporary user
  

  const isHomePage = location.pathname === "/";


const handleLogout = async () => {
   const confirmsg=window.confirm('Are you sure you want to logout');
  
 
  if(confirmsg){
    setLoading(true);
  setMobileMenu(false);
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    setUser(null);
    navigate("/");
  
  } catch (error) {
    console.error("Error during logout:", error);
  } finally {
    setLoading(false);
  }
}
};

  const closeMenu = () => {
    setMobileMenu(false);
  };

  const navClass = ({ isActive }) =>
    `rounded-full px-4 py-2.5 text-[11px] font-medium tracking-wide transition ${
      isHomePage
        ? isActive
          ? "bg-white/15 text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white"
        : isActive
        ? "bg-[#eef1eb] text-[#56634e]"
        : "text-[#777d76] hover:bg-[#f5f6f3] hover:text-[#30362f]"
    }`;

  return (
    <header
      className={`top-0 z-[100] w-full transition-all duration-300 ${
        isHomePage
          ? "absolute left-0 right-0 bg-transparent"
          : "relative border-b border-[#e8e9e4] bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">

        {/* =====================================================
            DESKTOP / MAIN NAVBAR
        ===================================================== */}

        <div className="flex h-[72px] items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="shrink-0"
          >
            <span
              className={`font-serif text-[21px] font-medium tracking-tight sm:text-[23px] ${
                isHomePage
                  ? "text-white"
                  : "text-[#20251f]"
              }`}
            >
              Book
              <span
                className={
                  isHomePage
                    ? "text-[#d7dfd0]"
                    : "text-[#68755f]"
                }
              >
                My
              </span>
              Table
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className={`absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full p-1.5 backdrop-blur-md lg:flex ${
              isHomePage
                ? "border border-white/10 bg-black/10"
                : "border border-[#e5e7e1] bg-[#fafbf9]"
            }`}
          >
            <NavLink
              to="/"
              className={navClass}
            >
              Discover
            </NavLink>
            {user?.role ==="admin"?<NavLink
              to="/admin/dashboard"
              className={navClass}
            >
             Dashboard
            </NavLink>:user?.role==="owner"?<NavLink
              to="/owner/dashboard"
              className={navClass}
            >
              Dashboard
            </NavLink>:<NavLink
              to="/restaurants"
              className={navClass}
            >
              Restaurants
            </NavLink>}
            

            {user?.role === "customer" && (
              <NavLink
                to="/my-bookings"
                className={navClass}
              >
                My Bookings
              </NavLink>
            )}
          </nav>

          {/* Desktop Right */}
          <div className="hidden items-center gap-3 lg:flex">

            {user ? (
              <>
                {/* User */}
                <div className="flex items-center gap-2" >

                  <div  onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex cursor-pointer h-9 w-9 items-center justify-center rounded-full text-[11px] font-medium uppercase ${
                      isHomePage
                        ? "border border-white/20 bg-white/10 text-white"
                        : "border border-[#dfe2da] bg-[#f1f3ed] text-[#68755f]"
                    }`}
                  >
                    {user.name?.charAt(0)}
                  </div>

                  <div className="relative">
  {/* Your existing user button */}
  <button
   
    className="flex items-center gap-2"
  >
    
    <span
      className={`max-w-[70px] truncate text-[11px] font-medium capitalize ${
        isHomePage ? "text-white/80" : "text-[#555b54]"
      }`}
    >
      {user.name}
    </span>
  </button>

  {/* Small menu */}
  {showUserMenu && (
    <div onClick={()=>setShowUserMenu(!showUserMenu)} className="absolute right-0 top-10 z-50 w-52 rounded-xl border border-[#e5e7e1] bg-white p-2 shadow-lg">
      
      {/* Name + Email */}
      <div className="border-b border-[#e5e7e1] px-3 py-2">
        <p className="truncate text-xs font-semibold text-[#1d211d]">
          {user.name}
        </p>

        <p className="truncate text-[10px] text-[#777d76]">
          {user.email}
        </p>
      </div>

      {/* My Bookings */}
      {user.role=="customer" && <button
        onClick={() =>  navigate("/my-bookings")}
        className="mt-1 w-full rounded-lg px-3 py-2 text-left text-xs text-[#333831] hover:bg-[#f7f8f5]"
      >
        My Bookings
      </button> }
      

      {/* Owner Portal */}
      {user.role === "owner" && (
        <button
          onClick={() => navigate("/owner/dashboard")}
          className="w-full rounded-lg px-3 py-2 text-left text-xs text-[#333831] hover:bg-[#f7f8f5]"
        >
          Owner Portal
        </button>
      )}

      {/* Admin Portal */}
      {user.role === "admin" && (
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="w-full rounded-lg px-3 py-2 text-left text-xs text-[#333831] hover:bg-[#f7f8f5]"
        >
          Admin Portal
        </button>
      )}

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full rounded-lg px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50"
      >
        Logout
      </button>
    </div>
  )}
</div>
                </div>

             
                
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-[11px] font-medium tracking-wide transition ${
                    isHomePage
                      ? "text-white/70 hover:text-white"
                      : "text-[#777d76] hover:text-[#30362f]"
                  }`}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className={`rounded-full px-5 py-2.5 text-[10px] font-semibold tracking-wide transition ${
                    isHomePage
                      ? "bg-white text-[#252b24] hover:bg-[#eef1eb]"
                      : "bg-[#68755f] text-white hover:bg-[#56634e]"
                  }`}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right */}
          <div className="flex items-center gap-2 lg:hidden">

            {/* User Initial */}
            {user && (
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-semibold uppercase ${
                  isHomePage
                    ? "border border-white/20 bg-white/10 text-white"
                    : "border border-[#dfe2da] bg-[#f1f3ed] text-[#68755f]"
                }`}
              >
                {user.name?.charAt(0)}
              </div>
            )}

            {/* Menu Button */}
            <button
              type="button"
              onClick={() => {setMobileMenu(!mobileMenu)}}
              aria-label="Toggle menu"
              aria-expanded={mobileMenu}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                isHomePage
                  ? "border border-white/15 bg-white/10 text-white hover:bg-white/20"
                  : "border border-[#dfe2da] bg-[#fafbf9] text-[#30362f] hover:bg-[#f0f2ed]"
              }`}
            >
              {mobileMenu ? (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            mobileMenu
              ? "max-h-[500px] pb-4 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`rounded-2xl p-3 ${
              isHomePage
                ? "border border-white/10 bg-black/40 backdrop-blur-xl"
                : "border border-[#e5e7e1] bg-[#fafbf9]"
            }`}
          >

            {/* Navigation */}
            <nav className="flex flex-col gap-1">

              <NavLink
                to="/"
                onClick={closeMenu}
                className={navClass}
              >
                Discover
              </NavLink>
              {user?.role==="customer" && 
              <NavLink
                to="/restaurants"
                onClick={closeMenu}
                className={navClass}
              >
                Restaurants
              </NavLink>}
              {user?.role==="admin" && 
              <NavLink
                to="/admin/dashboard"
                onClick={closeMenu}
                className={navClass}
              >
                Dashboard
              </NavLink>}
              {user?.role==="owner" && 
              <NavLink
                to="/owner/dashboard"
                onClick={closeMenu}
                className={navClass}
              >
                Dashboard
              </NavLink>}

              {user?.role === "customer" && (
                <NavLink
                  to="/my-bookings"
                  onClick={closeMenu}
                  className={navClass}
                >
                  My Bookings
                </NavLink>
              )}
            </nav>

            {/* Divider */}
            <div
              className={`my-3 h-px ${
                isHomePage
                  ? "bg-white/10"
                  : "bg-[#e5e7e1]"
              }`}
            />

            {/* Mobile User */}
            {user ? (
              <div className="flex items-center w-full justify-between  gap-3 px-3 py-2">

                <div className="flex min-w-0 items-center gap-3">

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold uppercase ${
                      isHomePage
                        ? "bg-white/10 text-white"
                        : "bg-[#eef1eb] text-[#68755f]"
                    }`}
                  >
                    {user.name?.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`truncate text-xs font-medium capitalize ${
                        isHomePage
                          ? "text-white"
                          : "text-[#30362f]"
                      }`}
                    >
                      {user.name}
                    </p>

                    <p
                      className={`text-[10px] ${
                        isHomePage
                          ? "text-white/50"
                          : "text-[#969b94]"
                      }`}
                    >
                      {user.role}
                      
                    </p>
                    
                  </div>
                   
                </div>
             
                  <button
        onClick={handleLogout}
        className=" rounded-lg px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50"
      >
        Logout
      </button>
              </div>
            ) : (
              <div className="flex gap-2 px-1">

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={`flex-1 rounded-full border py-3 text-center text-[11px] font-medium ${
                    isHomePage
                      ? "border-white/15 text-white"
                      : "border-[#dfe2da] text-[#555b54]"
                  }`}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="flex-1 rounded-full bg-[#68755f] py-3 text-center text-[11px] font-semibold text-white"
                >
                  Get Started
                </Link>

              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

