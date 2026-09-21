
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BookingSucess() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  const isValid =
    booking?.name &&
    booking?.date &&
    booking?.time &&
    booking?.guests &&
    booking?.table;

  if (!isValid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8f5] px-4">
        <div className="w-full max-w-xs rounded-2xl bg-white p-6 text-center shadow-sm border border-[#e5e7e1]">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
            <span className="text-lg text-red-500">×</span>
          </div>

          <h2 className="mt-3 text-lg font-semibold text-[#1d211d]">
            Booking Failed
          </h2>

          <p className="mt-1 text-[11px] text-[#777d76]">
            We couldn't confirm your booking.
          </p>

          <button
            onClick={() => navigate("/restaurants")}
            className="mt-4 rounded-full bg-[#68755f] px-5 py-2 text-xs font-medium text-white hover:bg-[#56634e]"
          >
            Back to Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f8f5] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[#e5e7e1] bg-white p-5 shadow-sm">

        {/* Success */}
        <div className="text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f0f4ed]">
            <svg
              className="h-5 w-5 text-[#68755f]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="mt-3 text-lg font-semibold text-[#1d211d]">
            Booking Confirmed
          </h2>

          <p className="mt-1 text-[11px] text-[#777d76]">
            Your table has been reserved successfully.
          </p>
        </div>

        {/* Restaurant */}
        <div className="mt-5 flex gap-3">
          <img
            src={booking.image}
            alt={booking.name}
            className="h-16 w-16 rounded-xl object-cover"
          />

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-[#1d211d]">
              {booking.name}
            </h3>

            <p className="mt-0.5 text-[10px] text-[#777d76]">
              {booking.cuisine}
            </p>

            <p className="mt-0.5 text-[10px] text-[#777d76]">
              {booking.location}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-[#f7f8f5] p-3">
          <div>
            <p className="text-[9px] text-[#969b94]">DATE</p>
            <p className="mt-0.5 text-xs font-medium text-[#30362f]">
              {booking.date}
            </p>
          </div>

          <div>
            <p className="text-[9px] text-[#969b94]">TIME</p>
            <p className="mt-0.5 text-xs font-medium text-[#30362f]">
              {booking.time}
            </p>
          </div>

          <div>
            <p className="text-[9px] text-[#969b94]">GUESTS</p>
            <p className="mt-0.5 text-xs font-medium text-[#30362f]">
              {booking.guests}
            </p>
          </div>

          <div>
            <p className="text-[9px] text-[#969b94]">TABLE</p>
            <p className="mt-0.5 text-xs font-medium text-[#30362f]">
              {booking.table}
            </p>
          </div>
        </div>

        {/* Booking ID */}
        <div className="mt-3 flex items-center justify-between text-[10px]">
          <span className="text-[#969b94]">Booking ID</span>
          <span className="font-medium text-[#30362f]">
            #{booking.id}
          </span>
        </div>

        <button
          onClick={() => navigate("/my-bookings")}
          className="mt-4 w-full rounded-full bg-[#68755f] py-2.5 text-xs font-medium text-white transition hover:bg-[#56634e]"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
}

export default BookingSucess;
