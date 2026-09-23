import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ user, isOwner, isAdmin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative" >
      {/* Small User Logo */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#68755f] text-white transition hover:bg-[#56634e]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
          />
        </svg>
      </button>

      {/* Small Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-10 z-50 w-56 rounded-xl border border-[#e5e7e1] bg-white p-2 shadow-lg">
          
          {/* User Info */}
          <div className="border-b border-[#e5e7e1] px-3 py-2.5">
            <p className="truncate text-sm font-semibold text-[#1d211d]">
              {user.name}
            </p>
            <p className="truncate text-[11px] text-[#777d76]">
              {user.email}
            </p>
          </div>

          {/* My Booking */}
          <button
            onClick={() => {
              navigate("/my-bookings");
              setIsOpen(false);
            }}
            className="mt-1 flex w-full items-center rounded-lg px-3 py-2 text-xs text-[#333831] hover:bg-[#f7f8f5]"
          >
            My Bookings
          </button>

          {/* Owner Portal */}
          {isOwner && (
            <button
              onClick={() => {
                navigate("/owner");
                setIsOpen(false);
              }}
              className="flex w-full items-center rounded-lg px-3 py-2 text-xs text-[#333831] hover:bg-[#f7f8f5]"
            >
              Owner Portal
            </button>
          )}

          {/* Admin Portal */}
          {isAdmin && (
            <button
              onClick={() => {
                navigate("/admin");
                setIsOpen(false);
              }}
              className="flex w-full items-center rounded-lg px-3 py-2 text-xs text-[#333831] hover:bg-[#f7f8f5]"
            >
              Admin Portal
            </button>
          )}

          {/* Logout */}
          <button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="flex w-full items-center rounded-lg px-3 py-2 text-xs text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;