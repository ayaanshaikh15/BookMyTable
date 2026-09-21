
import { useState } from "react";

const OwnerBookings = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Temporary booking data
  // Replace this later with data from your backend.

  const bookings = [
    {
      id: "BKG001",
      customer: "Rahul Patil",
      email: "rahul@example.com",
      phone: "+91 98765 43210",
      date: "18 Sep 2026",
      rawDate: "2026-09-18",
      time: "7:30 PM",
      guests: 2,
      table: "Table 04",
      status: "Confirmed",
      amount: "₹1,200",
      bookedOn: "15 Sep 2026",
    },
    {
      id: "BKG002",
      customer: "Sneha Kulkarni",
      email: "sneha@example.com",
      phone: "+91 98765 12345",
      date: "18 Sep 2026",
      rawDate: "2026-09-18",
      time: "8:00 PM",
      guests: 4,
      table: "Table 03",
      status: "Pending",
      amount: "₹2,400",
      bookedOn: "16 Sep 2026",
    },
    {
      id: "BKG003",
      customer: "Aditya Joshi",
      email: "aditya@example.com",
      phone: "+91 98765 67890",
      date: "19 Sep 2026",
      rawDate: "2026-09-19",
      time: "7:00 PM",
      guests: 3,
      table: "Table 02",
      status: "Confirmed",
      amount: "₹1,800",
      bookedOn: "16 Sep 2026",
    },
    {
      id: "BKG004",
      customer: "Priya Desai",
      email: "priya@example.com",
      phone: "+91 99887 66554",
      date: "20 Sep 2026",
      rawDate: "2026-09-20",
      time: "8:30 PM",
      guests: 6,
      table: "Table 05",
      status: "Completed",
      amount: "₹3,600",
      bookedOn: "12 Sep 2026",
    },
    {
      id: "BKG005",
      customer: "Karan Shah",
      email: "karan@example.com",
      phone: "+91 91234 56789",
      date: "17 Sep 2026",
      rawDate: "2026-09-17",
      time: "7:30 PM",
      guests: 2,
      table: "Table 01",
      status: "Cancelled",
      amount: "₹1,000",
      bookedOn: "14 Sep 2026",
    },
  ];

  // Filter bookings

  const filteredBookings = bookings.filter((booking) => {
    const matchesTab =
      activeTab === "all" ||
      booking.status.toLowerCase() === activeTab;

    const matchesSearch =
      booking.customer
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      booking.id
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      booking.table
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesDate =
      !selectedDate || booking.rawDate === selectedDate;

    return matchesTab && matchesSearch && matchesDate;
  });

  const handleStatusChange = (bookingId, status) => {
    console.log("Update booking:", bookingId, status);

    // Later connect this to your backend.
  };

  const handleViewBooking = (booking) => {
    console.log("View booking:", booking);
  };

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-5 py-8 text-[#1d211d] lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#68755f]">
              Reservations
            </p>

            <h1 className="mt-2 font-serif text-4xl tracking-tight text-[#20251f] sm:text-5xl">
              Bookings
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#777d76]">
              Manage your restaurant reservations, view customer
              details and keep track of your dining schedule.
            </p>

          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white px-5 py-4">

            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
              Total bookings
            </p>

            <p className="mt-1 font-serif text-2xl text-[#20251f]">
              {bookings.length}
            </p>

          </div>

        </div>

        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total */}

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">

            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
              All bookings
            </p>

            <p className="mt-3 font-serif text-3xl text-[#20251f]">
              {bookings.length}
            </p>

            <p className="mt-1 text-[10px] text-[#858b84]">
              Total reservations
            </p>

          </div>

          {/* Pending */}

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">

            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
              Pending
            </p>

            <p className="mt-3 font-serif text-3xl text-[#20251f]">
              {
                bookings.filter(
                  (booking) => booking.status === "Pending"
                ).length
              }
            </p>

            <p className="mt-1 text-[10px] text-[#858b84]">
              Need your attention
            </p>

          </div>

          {/* Confirmed */}

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">

            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
              Confirmed
            </p>

            <p className="mt-3 font-serif text-3xl text-[#20251f]">
              {
                bookings.filter(
                  (booking) => booking.status === "Confirmed"
                ).length
              }
            </p>

            <p className="mt-1 text-[10px] text-[#858b84]">
              Upcoming reservations
            </p>

          </div>

          {/* Completed */}

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">

            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
              Completed
            </p>

            <p className="mt-3 font-serif text-3xl text-[#20251f]">
              {
                bookings.filter(
                  (booking) => booking.status === "Completed"
                ).length
              }
            </p>

            <p className="mt-1 text-[10px] text-[#858b84]">
              Completed visits
            </p>

          </div>

        </div>

        {/* =====================================================
            FILTER SECTION
        ===================================================== */}

        <section className="mt-8 rounded-2xl border border-[#e5e7e1] bg-white p-4 sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}

            <div className="relative w-full lg:max-w-md">

              <svg
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#969b94]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  strokeWidth="1.7"
                />

                <path
                  strokeLinecap="round"
                  strokeWidth="1.7"
                  d="m20 20-4-4"
                />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customer, booking or table..."
                className="w-full rounded-full border border-[#dfe2da] bg-[#fafbf9] py-3 pl-11 pr-4 text-xs text-[#30362f] outline-none transition focus:border-[#68755f]"
              />

            </div>

            {/* Date */}

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-full border border-[#dfe2da] bg-[#fafbf9] px-4 py-3 text-xs text-[#555d53] outline-none focus:border-[#68755f]"
            />

          </div>

          {/* Tabs */}

          <div className="mt-5 flex gap-2 overflow-x-auto border-t border-[#eceee9] pt-4">

            {[
              ["all", "All"],
              ["pending", "Pending"],
              ["confirmed", "Confirmed"],
              ["completed", "Completed"],
              ["cancelled", "Cancelled"],
            ].map(([value, label]) => (

              <button
                key={value}
                type="button"
                onClick={() => setActiveTab(value)}
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-[10px] font-medium transition ${
                  activeTab === value
                    ? "bg-[#68755f] text-white"
                    : "border border-[#dfe2da] bg-white text-[#777d76] hover:border-[#68755f] hover:text-[#68755f]"
                }`}
              >
                {label}
              </button>

            ))}

          </div>

        </section>

        {/* =====================================================
            BOOKINGS TABLE
        ===================================================== */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-[#e5e7e1] bg-white">

          {/* Desktop Header */}

          <div className="hidden border-b border-[#e5e7e1] bg-[#fafbf9] px-5 py-4 lg:grid lg:grid-cols-[1.5fr_1fr_1fr_0.8fr_0.8fr_1fr] lg:items-center lg:gap-4">

            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
              Customer
            </p>

            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
              Date & time
            </p>

            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
              Table
            </p>

            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
              Guests
            </p>

            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
              Status
            </p>

            <p className="text-right text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
              Action
            </p>

          </div>

          {/* Booking Rows */}

          {filteredBookings.length > 0 ? (

            <div className="divide-y divide-[#eceee9]">

              {filteredBookings.map((booking) => (

                <div
                  key={booking.id}
                  className="px-5 py-5 transition hover:bg-[#fcfcfa]"
                >

                  {/* Desktop */}

                  <div className="hidden lg:grid lg:grid-cols-[1.5fr_1fr_1fr_0.8fr_0.8fr_1fr] lg:items-center lg:gap-4">

                    {/* Customer */}

                    <div className="min-w-0">

                      <p className="truncate text-sm font-medium text-[#30362f]">
                        {booking.customer}
                      </p>

                      <p className="mt-1 truncate text-[10px] text-[#969b94]">
                        {booking.id}
                      </p>

                    </div>

                    {/* Date */}

                    <div>

                      <p className="text-xs font-medium text-[#555d53]">
                        {booking.date}
                      </p>

                      <p className="mt-1 text-[10px] text-[#969b94]">
                        {booking.time}
                      </p>

                    </div>

                    {/* Table */}

                    <div>

                      <span className="rounded-full bg-[#f3f5f0] px-3 py-1.5 text-[10px] font-medium text-[#68755f]">
                        {booking.table}
                      </span>

                    </div>

                    {/* Guests */}

                    <p className="text-xs text-[#555d53]">
                      {booking.guests}
                    </p>

                    {/* Status */}

                    <div>

                      <span
                        className={`rounded-full px-3 py-1.5 text-[10px] font-medium ${
                          booking.status === "Confirmed"
                            ? "bg-[#f3f5f0] text-[#68755f]"
                            : booking.status === "Pending"
                              ? "bg-[#f8f3e8] text-[#9a7b42]"
                              : booking.status === "Completed"
                                ? "bg-[#f1f2f0] text-[#6d746a]"
                                : "bg-[#f8eeee] text-[#a25c5c]"
                        }`}
                      >
                        {booking.status}
                      </span>

                    </div>

                    {/* Action */}

                    <div className="flex justify-end">

                      <button
                        type="button"
                        onClick={() =>
                          handleViewBooking(booking)
                        }
                        className="rounded-full border border-[#dfe2da] px-4 py-2 text-[10px] font-medium text-[#68755f] transition hover:bg-[#f7f8f5]"
                      >
                        View
                      </button>

                    </div>

                  </div>

                  {/* =================================================
                      MOBILE / TABLET CARD
                  ================================================= */}

                  <div className="lg:hidden">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <div className="flex items-center gap-2">

                          <h3 className="text-sm font-medium text-[#30362f]">
                            {booking.customer}
                          </h3>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[9px] font-medium ${
                              booking.status === "Confirmed"
                                ? "bg-[#f3f5f0] text-[#68755f]"
                                : booking.status === "Pending"
                                  ? "bg-[#f8f3e8] text-[#9a7b42]"
                                  : booking.status === "Completed"
                                    ? "bg-[#f1f2f0] text-[#6d746a]"
                                    : "bg-[#f8eeee] text-[#a25c5c]"
                            }`}
                          >
                            {booking.status}
                          </span>

                        </div>

                        <p className="mt-1 text-[10px] text-[#969b94]">
                          {booking.id}
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleViewBooking(booking)
                        }
                        className="rounded-full border border-[#dfe2da] px-4 py-2 text-[10px] font-medium text-[#68755f]"
                      >
                        View
                      </button>

                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[#eceee9] pt-4 sm:grid-cols-4">

                      <div>

                        <p className="text-[9px] font-semibold uppercase tracking-wider text-[#969b94]">
                          Date
                        </p>

                        <p className="mt-1 text-xs text-[#555d53]">
                          {booking.date}
                        </p>

                      </div>

                      <div>

                        <p className="text-[9px] font-semibold uppercase tracking-wider text-[#969b94]">
                          Time
                        </p>

                        <p className="mt-1 text-xs text-[#555d53]">
                          {booking.time}
                        </p>

                      </div>

                      <div>

                        <p className="text-[9px] font-semibold uppercase tracking-wider text-[#969b94]">
                          Table
                        </p>

                        <p className="mt-1 text-xs text-[#555d53]">
                          {booking.table}
                        </p>

                      </div>

                      <div>

                        <p className="text-[9px] font-semibold uppercase tracking-wider text-[#969b94]">
                          Guests
                        </p>

                        <p className="mt-1 text-xs text-[#555d53]">
                          {booking.guests}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      PENDING ACTIONS
                  ================================================= */}

                  {booking.status === "Pending" && (

                    <div className="mt-5 flex flex-wrap gap-2 border-t border-[#eceee9] pt-4">

                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(
                            booking.id,
                            "Confirmed"
                          )
                        }
                        className="rounded-full bg-[#68755f] px-5 py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#56634e]"
                      >
                        Confirm booking
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(
                            booking.id,
                            "Cancelled"
                          )
                        }
                        className="rounded-full border border-[#dfe2da] px-5 py-2.5 text-[10px] font-medium text-[#777d76] transition hover:border-red-200 hover:text-red-500"
                      >
                        Decline
                      </button>

                    </div>

                  )}

                  {/* =================================================
                      CONFIRMED ACTION
                  ================================================= */}

                  {booking.status === "Confirmed" && (

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#eceee9] pt-4">

                      <div>

                        <p className="text-[9px] uppercase tracking-wider text-[#969b94]">
                          Customer contact
                        </p>

                        <p className="mt-1 text-[10px] text-[#777d76]">
                          {booking.phone}
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(
                            booking.id,
                            "Completed"
                          )
                        }
                        className="rounded-full border border-[#dfe2da] px-4 py-2.5 text-[10px] font-medium text-[#68755f] transition hover:bg-[#f7f8f5]"
                      >
                        Mark completed
                      </button>

                    </div>

                  )}

                </div>

              ))}

            </div>

          ) : (

            /* =====================================================
                EMPTY STATE
            ===================================================== */

            <div className="px-6 py-20 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fafbf9] text-[#68755f] ring-1 ring-[#e8e9e4]">

                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="17"
                    rx="2"
                    strokeWidth="1.5"
                  />

                  <path
                    strokeWidth="1.5"
                    d="M16 2v4M8 2v4M3 10h18"
                  />

                </svg>

              </div>

              <h2 className="mt-5 font-serif text-2xl text-[#20251f]">
                No bookings found
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#858b84]">
                Try changing your search, date or booking
                status filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedDate("");
                  setActiveTab("all");
                }}
                className="mt-6 rounded-full bg-[#68755f] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#56634e]"
              >
                Clear filters
              </button>

            </div>

          )}

        </section>

      </div>

    </main>
  );
};

export default OwnerBookings;

