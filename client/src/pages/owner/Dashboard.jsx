
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
  // Temporary dashboard data
  // Replace these values later with API data.

  const stats = [
    {
      label: "Today's bookings",
      value: "18",
      change: "+12%",
      description: "vs. yesterday",
    },
    {
      label: "Today's revenue",
      value: "₹24,800",
      change: "+8.4%",
      description: "vs. yesterday",
    },
    {
      label: "Table occupancy",
      value: "76%",
      change: "+6%",
      description: "vs. last week",
    },
    {
      label: "Total customers",
      value: "324",
      change: "+18",
      description: "this month",
    },
  ];

  const upcomingBookings = [
    {
      id: "BKG001",
      customer: "Rahul Patil",
      time: "7:00 PM",
      guests: 2,
      table: "Table 04",
      status: "Confirmed",
    },
    {
      id: "BKG002",
      customer: "Sneha Kulkarni",
      time: "7:30 PM",
      guests: 4,
      table: "Table 03",
      status: "Pending",
    },
    {
      id: "BKG003",
      customer: "Aditya Joshi",
      time: "8:00 PM",
      guests: 3,
      table: "Table 02",
      status: "Confirmed",
    },
    {
      id: "BKG004",
      customer: "Priya Desai",
      time: "8:30 PM",
      guests: 6,
      table: "Table 05",
      status: "Confirmed",
    },
  ];

  const popularTimes = [
    {
      time: "7:00 PM",
      bookings: 12,
      percentage: 80,
    },
    {
      time: "7:30 PM",
      bookings: 16,
      percentage: 92,
    },
    {
      time: "8:00 PM",
      bookings: 18,
      percentage: 100,
    },
    {
      time: "8:30 PM",
      bookings: 14,
      percentage: 86,
    },
    {
      time: "9:00 PM",
      bookings: 9,
      percentage: 65,
    },
  ];

  const weeklyData = [
    { day: "Mon", bookings: 18 },
    { day: "Tue", bookings: 24 },
    { day: "Wed", bookings: 20 },
    { day: "Thu", bookings: 29 },
    { day: "Fri", bookings: 38 },
    { day: "Sat", bookings: 46 },
    { day: "Sun", bookings: 34 },
  ];

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-5 py-8 text-[#1d211d] lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <section className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#68755f]">
              Restaurant overview
            </p>

            <h1 className="mt-2 font-serif text-4xl tracking-tight text-[#20251f] sm:text-5xl">
              Good evening, Alex.
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#777d76]">
              Here's what's happening at your restaurant today.
            </p>

          </div>

          <Link
            to="/owner/bookings"
            className="w-fit rounded-full bg-[#68755f] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#56634e]"
          >
            Manage bookings
          </Link>

        </section>

        {/* =====================================================
            RESTAURANT CARD
        ===================================================== */}

       

        {/* =====================================================
            STATISTICS
        ===================================================== */}

       

        {/* =====================================================
            MAIN DASHBOARD GRID
        ===================================================== */}

       
        {/* =====================================================
            LOWER GRID
        ===================================================== */}

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">

          {/* =================================================
              UPCOMING BOOKINGS
          ================================================= */}

          <div className="overflow-hidden rounded-2xl border border-[#e5e7e1] bg-white">

            <div className="flex items-center justify-between border-b border-[#e5e7e1] px-5 py-5 sm:px-6">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#68755f]">
                  Today
                </p>

                <h2 className="mt-2 font-serif text-2xl text-[#20251f]">
                  Upcoming bookings
                </h2>

              </div>

              <Link
                to="/owner/bookings"
                className="text-[10px] font-medium text-[#68755f] hover:underline"
              >
                View all →
              </Link>

            </div>

            <div className="divide-y divide-[#eceee9]">

              {upcomingBookings.map((booking) => (

                <div
                  key={booking.id}
                  className="flex flex-col gap-4 px-5 py-5 transition hover:bg-[#fcfcfa] sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >

                  <div className="flex items-center gap-4">

                    {/* Time */}

                    <div className="w-16 shrink-0">

                      <p className="text-xs font-semibold text-[#30362f]">
                        {booking.time}
                      </p>

                      <p className="mt-1 text-[9px] text-[#969b94]">
                        Today
                      </p>

                    </div>

                    {/* Customer */}

                    <div>

                      <p className="text-sm font-medium text-[#30362f]">
                        {booking.customer}
                      </p>

                      <p className="mt-1 text-[10px] text-[#969b94]">
                        {booking.guests}{" "}
                        {booking.guests === 1
                          ? "guest"
                          : "guests"}{" "}
                        · {booking.table}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <span
                      className={`rounded-full px-3 py-1.5 text-[9px] font-medium ${
                        booking.status === "Confirmed"
                          ? "bg-[#f3f5f0] text-[#68755f]"
                          : "bg-[#f8f3e8] text-[#9a7b42]"
                      }`}
                    >
                      {booking.status}
                    </span>

                    <Link
                      to="/owner/bookings"
                      className="rounded-full border border-[#dfe2da] px-4 py-2 text-[9px] font-medium text-[#68755f] transition hover:bg-[#f7f8f5]"
                    >
                      View
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* =================================================
              RESTAURANT PERFORMANCE
          ================================================= */}

        
        </section>

        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

        <section className="mt-6">

          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#68755f]">
            Quick actions
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">

            <Link
              to="/owner/bookings"
              className="group rounded-2xl border  border-[#e5e7e1] bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-sm"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f5f0] text-[#68755f]">

                <svg
                  className="h-5 w-5"
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
                    strokeWidth="1.6"
                  />

                  <path
                    strokeWidth="1.6"
                    d="M16 2v4M8 2v4M3 10h18"
                  />

                </svg>

              </div>

              <h3 className="mt-4 text-sm font-medium text-[#30362f]">
                Manage bookings
              </h3>

              <p className="mt-1 text-[10px] text-[#969b94]">
                View and manage reservations
              </p>

            </Link>

            <Link
              to="/owner/tables"
              className="group rounded-2xl border border-[#e5e7e1] bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-sm"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f5f0] text-[#68755f]">

                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="4"
                    y="5"
                    width="16"
                    height="14"
                    rx="2"
                    strokeWidth="1.6"
                  />

                  <path
                    strokeWidth="1.6"
                    d="M8 9h8M8 13h5"
                  />

                </svg>

              </div>

              <h3 className="mt-4 text-sm font-medium text-[#30362f]">
                Manage tables
              </h3>

              <p className="mt-1 text-[10px] text-[#969b94]">
                Update table availability
              </p>

            </Link>

            <Link
              to="/owner/restaurant"
              className="group rounded-2xl border border-[#e5e7e1] bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-sm"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f5f0] text-[#68755f]">

                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 21h16M5 21V9h14v12M3 9l2-5h14l2 5"
                  />

                  <path
                    strokeWidth="1.6"
                    d="M8 13h2M14 13h2M8 17h2M14 17h2"
                  />

                </svg>

              </div>

              <h3 className="mt-4 text-sm font-medium text-[#30362f]">
                Restaurant profile
              </h3>

              <p className="mt-1 text-[10px] text-[#969b94]">
                Update restaurant information
              </p>

            </Link>

  

          </div>

        </section>

      </div>

    </main>
  );
};

export default OwnerDashboard;
