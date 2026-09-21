import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmReservation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Data can later come from RestaurantDetails / booking state
  const reservation = location.state || {
    restaurant: {
      id: "1",
      name: "The Olive Table",
      location: "Belagavi, Karnataka",
      cuisine: "Italian · Continental",
      image:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=85",
    },
    date: "2026-09-25",
    time: "7:30 PM",
    guests: "2",
  };
 console.log("Reservation:", reservation);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    occasion: "None",
    requests: "",
    updates: true,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const formatDate = (date) => {
    if (!date) return "Select date";

    const parsedDate = new Date(date);

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone
    ) {
      setError("Please fill in all required details.");
      return;
    }

    const bookingData = {
      ...reservation,
      guestDetails: formData,
    };

    console.log("Reservation:", bookingData);

    // Later connect this to your backend
    navigate("/booking-success", {
      state: bookingData,
    });
  };

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-4 py-8 text-[#20251f] sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-5 flex items-center gap-2 text-xs font-medium text-[#68755f] transition hover:text-[#56634e]"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                d="M19 12H5"
                strokeLinecap="round"
              />
              <path
                d="m12 19-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            Back to restaurant
          </button>

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#68755f]">
            Almost there
          </p>

          <h1 className="mt-2 font-serif text-4xl tracking-tight text-[#20251f] sm:text-5xl">
            Confirm your reservation
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#858b84]">
            Enter your details below to complete your table
            reservation.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-[390px_1fr]">

          {/* =====================================================
              RESERVATION SUMMARY
          ===================================================== */}

          <section className="h-fit rounded-2xl border border-[#e5e7e1] bg-white p-5 shadow-sm sm:p-6">

            <div className="border-b border-[#eceee9] pb-5">
              <h2 className="font-serif text-2xl text-[#20251f]">
                Reservation Summary
              </h2>
            </div>

            {/* Restaurant */}
            <div className="mt-5 flex gap-4">

              <img
                src={reservation.image}
                alt={reservation.name}
                className="h-20 w-20 shrink-0 rounded-xl object-cover"
              />

              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#68755f]">
                  {reservation.cuisine
                    ?.split("·")[0]
                    ?.trim()}
                </p>

                <h3 className="mt-1 font-serif text-xl text-[#20251f]">
                  {reservation.name}
                </h3>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-[#858b84]">
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path
                      d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="10" r="2" />
                  </svg>

                  {reservation.location}
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="mt-7 space-y-5">

              {/* Date */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f3ed] text-[#68755f]">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="17"
                        rx="2"
                      />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </div>

                  <span className="text-xs text-[#777d76]">
                    Date
                  </span>
                </div>

                <span className="text-sm font-medium text-[#30362f]">
                  {formatDate(reservation.date)}
                </span>
              </div>

              {/* Time */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f3ed] text-[#68755f]">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path
                        d="M12 7v5l3 2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <span className="text-xs text-[#777d76]">
                    Time
                  </span>
                </div>

                <span className="text-sm font-medium text-[#30362f]">
                  {reservation.time}
                </span>
              </div>

              {/* Guests */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f3ed] text-[#68755f]">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <circle cx="9" cy="8" r="3" />
                      <path
                        d="M3 20c.4-3.3 2.4-5 6-5s5.6 1.7 6 5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M15 5.5a3 3 0 0 1 0 5.5M17 15c2.4.4 3.7 2 4 5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <span className="text-xs text-[#777d76]">
                    Party size
                  </span>
                </div>

                <span className="text-sm font-medium text-[#30362f]">
                  {reservation.guests}{" "}
                  {Number(reservation.guests) === 1
                    ? "Guest"
                    : "Guests"}
                </span>
              </div>
            </div>

            {/* Cancellation */}
            <div className="mt-8 border-t border-[#eceee9] pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#30362f]">
                Cancellation policy
              </p>

              <p className="mt-2 text-xs leading-5 text-[#858b84]">
                We hold reservations for a maximum of 15
                minutes. Cancellations or changes can be made
                free of charge up to 24 hours in advance.
              </p>
            </div>
          </section>

          {/* =====================================================
              GUEST DETAILS
          ===================================================== */}

          <section className="rounded-2xl border border-[#e5e7e1] bg-white p-5 shadow-sm sm:p-7 lg:p-8">

            <div className="border-b border-[#eceee9] pb-5">
              <h2 className="font-serif text-2xl text-[#20251f]">
                Guest Details
              </h2>

              <p className="mt-2 text-xs text-[#858b84]">
                Please provide the details needed for your
                reservation.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6"
            >

              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">

                {/* Full Name */}
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#858b84]">
                    Full name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="mt-2 w-full border-b border-[#dfe2da] bg-transparent px-0 py-3 text-sm text-[#30362f] outline-none transition placeholder:text-[#aaaFA9] focus:border-[#68755f]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#858b84]">
                    Email address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="mt-2 w-full border-b border-[#dfe2da] bg-transparent px-0 py-3 text-sm text-[#30362f] outline-none transition placeholder:text-[#aaaFA9] focus:border-[#68755f]"
                  />
                </div>
              </div>

              {/* Phone + Occasion */}
              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                {/* Phone */}
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#858b84]">
                    Phone number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="mt-2 w-full border-b border-[#dfe2da] bg-transparent px-0 py-3 text-sm text-[#30362f] outline-none transition placeholder:text-[#aaaFA9] focus:border-[#68755f]"
                  />
                </div>

                {/* Occasion */}
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#858b84]">
                    Special occasion
                  </label>

                  <div className="relative">
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      className="mt-2 w-full appearance-none border-b border-[#dfe2da] bg-transparent px-0 py-3 pr-8 text-sm text-[#30362f] outline-none focus:border-[#68755f]"
                    >
                      <option value="None">None</option>
                      <option value="Birthday">
                        Birthday
                      </option>
                      <option value="Anniversary">
                        Anniversary
                      </option>
                      <option value="Date">
                        Date
                      </option>
                      <option value="Business">
                        Business
                      </option>
                      <option value="Other">
                        Other
                      </option>
                    </select>

                    <svg
                      className="pointer-events-none absolute right-1 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-[#68755f]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <path
                        d="m6 9 6 6 6-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="mt-6">

                <label className="text-[10px] font-semibold uppercase tracking-wider text-[#858b84]">
                  Special requests
                  <span className="font-normal normal-case tracking-normal">
                    {" "}
                    (optional)
                  </span>
                </label>

                <textarea
                  name="requests"
                  value={formData.requests}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Allergies, dietary restrictions, table preference..."
                  className="mt-2 w-full resize-none rounded-xl border border-[#e1e4dd] bg-[#fafbf9] px-4 py-3 text-sm text-[#30362f] outline-none transition placeholder:text-[#aaaFA9] focus:border-[#68755f] focus:bg-white"
                />
              </div>

              {/* Checkbox */}
              <label className="mt-5 flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="updates"
                  checked={formData.updates}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#68755f]"
                />

                <span className="text-xs leading-5 text-[#777d76]">
                  Send me occasional dining recommendations,
                  new restaurant updates and special offers
                  from BookMyTable.
                </span>
              </label>

              {/* Error */}
              {error && (
                <div className="mt-5 rounded-xl border border-[#eadcdc] bg-[#f8f0f0] px-4 py-3 text-xs text-[#8a5d5d]">
                  {error}
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                className="mt-7 w-full rounded-full bg-[#68755f] px-6 py-4 text-xs font-semibold tracking-[0.08em] text-white transition hover:bg-[#56634e] active:scale-[0.99]"
              >
                BOOK TABLE
              </button>

              <p className="mt-4 text-center text-[10px] leading-5 text-[#9a9f98]">
                By booking, you agree to BookMyTable's
                reservation terms and cancellation policy.
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ConfirmReservation;