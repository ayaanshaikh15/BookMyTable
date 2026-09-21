import { useMemo, useState } from "react";

const AdminDashboard = () => {
  const [period, setPeriod] = useState("This month");

  const stats = {
    restaurants: 48,
    customers: 1248,
    bookings: 3826,
    revenue: "₹8.42L",
  };

  const bookingData = useMemo(() => {
    if (period === "This week") {
      return [
        { day: "Mon", value: 42 },
        { day: "Tue", value: 58 },
        { day: "Wed", value: 51 },
        { day: "Thu", value: 74 },
        { day: "Fri", value: 89 },
        { day: "Sat", value: 106 },
        { day: "Sun", value: 82 },
      ];
    }

    if (period === "Last month") {
      return [
        { day: "1", value: 72 },
        { day: "5", value: 94 },
        { day: "10", value: 118 },
        { day: "15", value: 105 },
        { day: "20", value: 142 },
        { day: "25", value: 128 },
        { day: "30", value: 156 },
      ];
    }

    return [
      { day: "Week 1", value: 210 },
      { day: "Week 2", value: 286 },
      { day: "Week 3", value: 318 },
      { day: "Week 4", value: 392 },
    ];
  }, [period]);

  const recentBookings = [
    {
      id: "TB-1048",
      customer: "Rahul Sharma",
      restaurant: "The Olive Table",
      date: "18 Sep 2026",
      time: "7:30 PM",
      guests: 4,
      amount: "₹1,200",
      status: "Confirmed",
    },
    {
      id: "TB-1047",
      customer: "Priya Patil",
      restaurant: "Urban Fork",
      date: "18 Sep 2026",
      time: "8:00 PM",
      guests: 2,
      amount: "₹850",
      status: "Completed",
    },
    {
      id: "TB-1046",
      customer: "Aditya Kulkarni",
      restaurant: "The Olive Table",
      date: "19 Sep 2026",
      time: "1:00 PM",
      guests: 6,
      amount: "₹1,800",
      status: "Confirmed",
    },
    {
      id: "TB-1045",
      customer: "Sneha Joshi",
      restaurant: "Casa Verde",
      date: "19 Sep 2026",
      time: "7:00 PM",
      guests: 4,
      amount: "₹1,450",
      status: "Pending",
    },
    {
      id: "TB-1044",
      customer: "Karan Desai",
      restaurant: "Urban Fork",
      date: "20 Sep 2026",
      time: "8:30 PM",
      guests: 2,
      amount: "₹900",
      status: "Cancelled",
    },
  ];

  const topRestaurants = [
    {
      name: "The Olive Table",
      location: "Belagavi",
      bookings: 428,
      rating: 4.8,
    },
    {
      name: "Urban Fork",
      location: "Bengaluru",
      bookings: 391,
      rating: 4.7,
    },
    {
      name: "Casa Verde",
      location: "Mysuru",
      bookings: 347,
      rating: 4.6,
    },
    {
      name: "Saffron House",
      location: "Hubballi",
      bookings: 312,
      rating: 4.5,
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "border-[#dce8d8] bg-[#eef4eb] text-[#58704f]";

      case "Completed":
        return "border-[#dfe2da] bg-[#f3f4f0] text-[#68755f]";

      case "Pending":
        return "border-[#e7ded0] bg-[#f5f0e8] text-[#8a7050]";

      case "Cancelled":
        return "border-[#eadcdc] bg-[#f6eeee] text-[#8a5d5d]";

      default:
        return "border-[#e1e4dd] bg-[#f7f8f5] text-[#777d76]";
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-5 py-8 text-[#1d211d] lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium tracking-wide text-[#68755f]">
              Platform overview
            </p>

            <h1 className="font-serif text-4xl tracking-tight text-[#20251f] sm:text-5xl">
              Admin dashboard
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#858b84]">
              Keep track of your restaurants, customers, reservations, and
              platform activity.
            </p>
          </div>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-fit rounded-full border border-[#dfe2da] bg-white px-5 py-2.5 text-sm text-[#555b54] outline-none transition focus:border-[#68755f]"
          >
            <option>This week</option>
            <option>This month</option>
            <option>Last month</option>
          </select>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

          {/* Restaurants */}
          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#858b84]">
                  Restaurants
                </p>

                <p className="mt-2 font-serif text-3xl text-[#20251f]">
                  {stats.restaurants}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1f3ed] text-[#68755f]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M4 10h16" />
                  <path d="M5 10v9h14v-9" />
                  <path d="M3 10 5 4h14l2 6" />
                  <path d="M9 19v-5h6v5" />
                </svg>
              </div>
            </div>

            <p className="mt-4 text-xs text-[#68755f]">
              +6 this month
            </p>
          </div>

          {/* Customers */}
          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#858b84]">
                  Customers
                </p>

                <p className="mt-2 font-serif text-3xl text-[#20251f]">
                  {stats.customers.toLocaleString()}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1f3ed] text-[#68755f]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <circle cx="9" cy="8" r="3" />
                  <path d="M3.5 20c.5-3.5 2.3-5 5.5-5s5 1.5 5.5 5" />
                  <path d="M16 11c2.3 0 4 1.2 4.5 4" />
                  <path d="M16 5.5a3 3 0 0 1 0 5.8" />
                </svg>
              </div>
            </div>

            <p className="mt-4 text-xs text-[#68755f]">
              +12.4% from last month
            </p>
          </div>

          {/* Bookings */}
          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#858b84]">
                  Bookings
                </p>

                <p className="mt-2 font-serif text-3xl text-[#20251f]">
                  {stats.bookings.toLocaleString()}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1f3ed] text-[#68755f]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect x="4" y="5" width="16" height="15" rx="2" />
                  <path d="M8 3v4M16 3v4M4 10h16" />
                </svg>
              </div>
            </div>

            <p className="mt-4 text-xs text-[#68755f]">
              +8.7% from last month
            </p>
          </div>

          {/* Revenue */}
          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#858b84]">
                  Platform revenue
                </p>

                <p className="mt-2 font-serif text-3xl text-[#20251f]">
                  {stats.revenue}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1f3ed] text-[#68755f]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M12 3v18" />
                  <path d="M17 7.5c0-1.7-2-3-5-3s-5 1.3-5 3 1.7 2.7 5 3.5 5 1.8 5 3.5-2 3-5 3-5-1.3-5-3" />
                </svg>
              </div>
            </div>

            <p className="mt-4 text-xs text-[#68755f]">
              +14.2% from last month
            </p>
          </div>
        </div>

        {/* Chart + Activity */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">

          {/* Booking Chart */}
          <section className="rounded-2xl border border-[#e5e7e1] bg-white p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#68755f]">
                  Reservations
                </p>

                <h2 className="mt-1 font-serif text-2xl text-[#20251f]">
                  Booking activity
                </h2>
              </div>

              <p className="text-xs text-[#969b94]">
                {period}
              </p>
            </div>

            {/* Chart */}
            <div className="mt-8">
              <div className="flex h-64 items-end gap-3 sm:gap-5">
                {bookingData.map((item) => {
                  const max = Math.max(
                    ...bookingData.map((entry) => entry.value)
                  );

                  const height = `${(item.value / max) * 100}%`;

                  return (
                    <div
                      key={item.day}
                      className="flex h-full flex-1 flex-col justify-end"
                    >
                      <div className="mb-2 text-center text-[10px] text-[#969b94]">
                        {item.value}
                      </div>

                      <div
                        className="w-full rounded-t-xl bg-[#68755f] transition-all duration-500 hover:bg-[#56634e]"
                        style={{ height }}
                      />

                      <div className="mt-3 text-center text-[10px] text-[#969b94] sm:text-xs">
                        {item.day}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Platform Activity */}
          <section className="rounded-2xl border border-[#e5e7e1] bg-white p-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#68755f]">
                Platform activity
              </p>

              <h2 className="mt-1 font-serif text-2xl text-[#20251f]">
                Overview
              </h2>
            </div>

            <div className="mt-7 space-y-6">

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-[#777d76]">
                    Confirmed bookings
                  </span>

                  <span className="text-sm font-medium text-[#30362f]">
                    72%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#e9ebe6]">
                  <div className="h-full w-[72%] rounded-full bg-[#68755f]" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-[#777d76]">
                    Completed bookings
                  </span>

                  <span className="text-sm font-medium text-[#30362f]">
                    61%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#e9ebe6]">
                  <div className="h-full w-[61%] rounded-full bg-[#7b866f]" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-[#777d76]">
                    Customer retention
                  </span>

                  <span className="text-sm font-medium text-[#30362f]">
                    84%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#e9ebe6]">
                  <div className="h-full w-[84%] rounded-full bg-[#68755f]" />
                </div>
              </div>

              <div className="border-t border-[#eceee9] pt-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#30362f]">
                      Active restaurants
                    </p>

                    <p className="mt-1 text-xs text-[#969b94]">
                      Currently accepting reservations
                    </p>
                  </div>

                  <p className="font-serif text-2xl text-[#20251f]">
                    43
                    <span className="ml-1 text-sm text-[#969b94]">
                      / 48
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Recent Bookings + Top Restaurants */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">

          {/* Recent Bookings */}
          <section className="overflow-hidden rounded-2xl border border-[#e5e7e1] bg-white">

            <div className="flex items-center justify-between border-b border-[#eceee9] p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#68755f]">
                  Latest activity
                </p>

                <h2 className="mt-1 font-serif text-2xl text-[#20251f]">
                  Recent bookings
                </h2>
              </div>

              <button className="text-xs font-medium text-[#68755f] hover:underline">
                View all
              </button>
            </div>

            <div className="divide-y divide-[#eceee9]">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col gap-4 p-5 transition hover:bg-[#fcfcfa] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f1f3ed] font-serif text-xs text-[#68755f]">
                      {booking.customer
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-[#30362f]">
                        {booking.customer}
                      </p>

                      <p className="mt-1 text-xs text-[#969b94]">
                        {booking.restaurant} · {booking.guests} guests
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-5 sm:justify-end">

                    <div className="text-left sm:text-right">
                      <p className="text-xs text-[#777d76]">
                        {booking.date}
                      </p>

                      <p className="mt-1 text-xs text-[#969b94]">
                        {booking.time}
                      </p>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1.5 text-[11px] font-medium ${getStatusStyle(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top Restaurants */}
          <section className="rounded-2xl border border-[#e5e7e1] bg-white">

            <div className="border-b border-[#eceee9] p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-[#68755f]">
                Performance
              </p>

              <h2 className="mt-1 font-serif text-2xl text-[#20251f]">
                Top restaurants
              </h2>
            </div>

            <div className="divide-y divide-[#eceee9]">
              {topRestaurants.map((restaurant, index) => (
                <div
                  key={restaurant.name}
                  className="flex items-center gap-4 p-5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f1f3ed] font-serif text-sm text-[#68755f]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#30362f]">
                      {restaurant.name}
                    </p>

                    <p className="mt-1 text-xs text-[#969b94]">
                      {restaurant.location} · {restaurant.bookings} bookings
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-[#555b54]">
                    <span className="text-[#68755f]">★</span>
                    {restaurant.rating}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#eceee9] p-5">
              <button className="w-full rounded-full border border-[#dfe2da] py-2.5 text-xs font-medium text-[#68755f] transition hover:border-[#68755f] hover:bg-[#f7f8f5]">
                Manage restaurants
              </button>
            </div>
          </section>
        </div>

        {/* Quick Actions */}
        <section className="mt-6 rounded-2xl border border-[#e5e7e1] bg-white p-6">
          <div className="mb-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[#68755f]">
              Administration
            </p>

            <h2 className="mt-1 font-serif text-2xl text-[#20251f]">
              Quick actions
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <button className="group rounded-2xl border border-[#eceee9] bg-[#fafbf9] p-5 text-left transition hover:border-[#cfd4ca] hover:bg-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ea] text-[#68755f]">
                +
              </div>

              <p className="mt-4 text-sm font-medium text-[#30362f]">
                Add restaurant
              </p>

              <p className="mt-1 text-xs leading-5 text-[#969b94]">
                Register a new restaurant on Tablely.
              </p>
            </button>

            <button className="group rounded-2xl border border-[#eceee9] bg-[#fafbf9] p-5 text-left transition hover:border-[#cfd4ca] hover:bg-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ea] text-[#68755f]">
                ≡
              </div>

              <p className="mt-4 text-sm font-medium text-[#30362f]">
                View bookings
              </p>

              <p className="mt-1 text-xs leading-5 text-[#969b94]">
                Monitor all platform reservations.
              </p>
            </button>

            <button className="group rounded-2xl border border-[#eceee9] bg-[#fafbf9] p-5 text-left transition hover:border-[#cfd4ca] hover:bg-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ea] text-[#68755f]">
                ◇
              </div>

              <p className="mt-4 text-sm font-medium text-[#30362f]">
                Manage customers
              </p>

              <p className="mt-1 text-xs leading-5 text-[#969b94]">
                Review registered Tablely customers.
              </p>
            </button>

            <button className="group rounded-2xl border border-[#eceee9] bg-[#fafbf9] p-5 text-left transition hover:border-[#cfd4ca] hover:bg-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ea] text-[#68755f]">
                ⚙
              </div>

              <p className="mt-4 text-sm font-medium text-[#30362f]">
                Platform settings
              </p>

              <p className="mt-1 text-xs leading-5 text-[#969b94]">
                Configure platform-level settings.
              </p>
            </button>

          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminDashboard;