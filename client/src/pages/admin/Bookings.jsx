import { useMemo, useState } from "react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([
    {
      id: "TB-1048",
      customer: "Rahul Sharma",
      email: "rahul@gmail.com",
      restaurant: "The Olive Table",
      date: "18 Sep 2026",
      time: "7:30 PM",
      guests: 4,
      table: "Table 03",
      amount: "₹1,200",
      status: "Confirmed",
    },
    {
      id: "TB-1047",
      customer: "Priya Patil",
      email: "priya@gmail.com",
      restaurant: "Urban Fork",
      date: "18 Sep 2026",
      time: "8:00 PM",
      guests: 2,
      table: "Table 02",
      amount: "₹850",
      status: "Completed",
    },
    {
      id: "TB-1046",
      customer: "Aditya Kulkarni",
      email: "aditya@gmail.com",
      restaurant: "The Olive Table",
      date: "19 Sep 2026",
      time: "1:00 PM",
      guests: 6,
      table: "Table 05",
      amount: "₹1,800",
      status: "Confirmed",
    },
    {
      id: "TB-1045",
      customer: "Sneha Joshi",
      email: "sneha@gmail.com",
      restaurant: "Casa Verde",
      date: "19 Sep 2026",
      time: "7:00 PM",
      guests: 4,
      table: "Table 08",
      amount: "₹1,450",
      status: "Pending",
    },
    {
      id: "TB-1044",
      customer: "Karan Desai",
      email: "karan@gmail.com",
      restaurant: "Urban Fork",
      date: "20 Sep 2026",
      time: "8:30 PM",
      guests: 2,
      table: "Table 04",
      amount: "₹900",
      status: "Cancelled",
    },
    {
      id: "TB-1043",
      customer: "Meera Rao",
      email: "meera@gmail.com",
      restaurant: "Casa Verde",
      date: "20 Sep 2026",
      time: "7:30 PM",
      guests: 8,
      table: "Table 12",
      amount: "₹2,400",
      status: "Confirmed",
    },
    {
      id: "TB-1042",
      customer: "Arjun Shetty",
      email: "arjun@gmail.com",
      restaurant: "The Olive Table",
      date: "21 Sep 2026",
      time: "8:00 PM",
      guests: 4,
      table: "Table 06",
      amount: "₹1,300",
      status: "Pending",
    },
    {
      id: "TB-1041",
      customer: "Neha Kulkarni",
      email: "neha@gmail.com",
      restaurant: "Urban Fork",
      date: "21 Sep 2026",
      time: "1:30 PM",
      guests: 2,
      table: "Table 01",
      amount: "₹700",
      status: "Completed",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [restaurantFilter, setRestaurantFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const restaurants = [
    "All",
    ...new Set(bookings.map((booking) => booking.restaurant)),
  ];

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.id.toLowerCase().includes(search.toLowerCase()) ||
        booking.customer.toLowerCase().includes(search.toLowerCase()) ||
        booking.email.toLowerCase().includes(search.toLowerCase()) ||
        booking.restaurant.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || booking.status === statusFilter;

      const matchesRestaurant =
        restaurantFilter === "All" ||
        booking.restaurant === restaurantFilter;

      return matchesSearch && matchesStatus && matchesRestaurant;
    });
  }, [bookings, search, statusFilter, restaurantFilter]);

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((item) => item.status === "Confirmed").length,
    pending: bookings.filter((item) => item.status === "Pending").length,
    completed: bookings.filter((item) => item.status === "Completed").length,
    cancelled: bookings.filter((item) => item.status === "Cancelled").length,
  };

  const updateStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

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
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium tracking-wide text-[#68755f]">
            Platform management
          </p>

          <h1 className="font-serif text-4xl tracking-tight text-[#20251f] sm:text-5xl">
            Bookings
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#858b84]">
            Monitor and manage all reservations across restaurants on Tablely.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">Total bookings</p>
            <p className="mt-2 font-serif text-3xl text-[#20251f]">
              {stats.total}
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">Confirmed</p>
            <p className="mt-2 font-serif text-3xl text-[#58704f]">
              {stats.confirmed}
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">Pending</p>
            <p className="mt-2 font-serif text-3xl text-[#8a7050]">
              {stats.pending}
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">Completed</p>
            <p className="mt-2 font-serif text-3xl text-[#68755f]">
              {stats.completed}
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">Cancelled</p>
            <p className="mt-2 font-serif text-3xl text-[#8a5d5d]">
              {stats.cancelled}
            </p>
          </div>
        </div>

        {/* Main Card */}
        <section className="overflow-hidden rounded-2xl border border-[#e5e7e1] bg-white">

          {/* Toolbar */}
          <div className="border-b border-[#eceee9] p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              {/* Search */}
              <div className="relative w-full lg:max-w-md">
                <svg
                  className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#969b94]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>

                <input
                  type="text"
                  placeholder="Search booking, customer or restaurant..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-[#dfe2da] bg-[#fafbf9] py-3 pl-11 pr-4 text-sm text-[#30362f] outline-none transition placeholder:text-[#a1a59f] focus:border-[#68755f] focus:bg-white"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col gap-2 sm:flex-row">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-full border border-[#dfe2da] bg-white px-4 py-2.5 text-sm text-[#555b54] outline-none focus:border-[#68755f]"
                >
                  <option value="All">All statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <select
                  value={restaurantFilter}
                  onChange={(e) => setRestaurantFilter(e.target.value)}
                  className="rounded-full border border-[#dfe2da] bg-white px-4 py-2.5 text-sm text-[#555b54] outline-none focus:border-[#68755f]"
                >
                  {restaurants.map((restaurant) => (
                    <option key={restaurant} value={restaurant}>
                      {restaurant === "All"
                        ? "All restaurants"
                        : restaurant}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-[#858b84]">
                Showing{" "}
                <span className="font-medium text-[#555b54]">
                  {filteredBookings.length}
                </span>{" "}
                bookings
              </p>

              {(search ||
                statusFilter !== "All" ||
                restaurantFilter !== "All") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                    setRestaurantFilter("All");
                  }}
                  className="text-xs font-medium text-[#68755f] hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#eceee9] bg-[#fafbf9] text-left">
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Booking
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Restaurant
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Date & time
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Guests
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-[#f0f1ed] last:border-0 hover:bg-[#fcfcfa]"
                  >
                    {/* Booking */}
                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-[#30362f]">
                        {booking.id}
                      </p>

                      <p className="mt-1 text-xs text-[#969b94]">
                        {booking.table}
                      </p>
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-[#30362f]">
                        {booking.customer}
                      </p>

                      <p className="mt-1 text-xs text-[#969b94]">
                        {booking.email}
                      </p>
                    </td>

                    {/* Restaurant */}
                    <td className="px-6 py-5">
                      <p className="max-w-[150px] text-sm text-[#555b54]">
                        {booking.restaurant}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">
                      <p className="text-sm text-[#555b54]">
                        {booking.date}
                      </p>

                      <p className="mt-1 text-xs text-[#969b94]">
                        {booking.time}
                      </p>
                    </td>

                    {/* Guests */}
                    <td className="px-6 py-5">
                      <span className="text-sm text-[#555b54]">
                        {booking.guests}{" "}
                        {booking.guests === 1 ? "guest" : "guests"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-medium ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="rounded-full border border-[#dfe2da] px-4 py-2 text-xs font-medium text-[#68755f] transition hover:border-[#68755f] hover:bg-[#f7f8f5]"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-[#eceee9] md:hidden">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#30362f]">
                      {booking.id}
                    </p>

                    <p className="mt-1 text-xs text-[#969b94]">
                      {booking.restaurant}
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

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#969b94]">Customer</p>
                    <p className="mt-1 text-sm text-[#555b54]">
                      {booking.customer}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#969b94]">Guests</p>
                    <p className="mt-1 text-sm text-[#555b54]">
                      {booking.guests}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#969b94]">Date</p>
                    <p className="mt-1 text-sm text-[#555b54]">
                      {booking.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#969b94]">Time</p>
                    <p className="mt-1 text-sm text-[#555b54]">
                      {booking.time}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedBooking(booking)}
                  className="mt-4 w-full rounded-full border border-[#dfe2da] py-2.5 text-xs font-medium text-[#68755f]"
                >
                  View booking
                </button>
              </div>
            ))}
          </div>

          {/* Empty */}
          {filteredBookings.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f3ed] text-xl text-[#68755f]">
                —
              </div>

              <h3 className="mt-4 font-serif text-xl text-[#30362f]">
                No bookings found
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#858b84]">
                Try changing your search or filter settings.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d211d]/35 px-5 py-6 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-[#e5e7e1] bg-white p-6 shadow-2xl sm:p-8">

            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#68755f]">
                  Booking details
                </p>

                <h2 className="mt-1 font-serif text-3xl text-[#20251f]">
                  {selectedBooking.id}
                </h2>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e1e4dd] text-[#777d76] hover:bg-[#f7f8f5]"
              >
                ×
              </button>
            </div>

            <div className="mt-7 space-y-4">

              <div className="rounded-2xl bg-[#fafbf9] p-4">
                <p className="text-xs text-[#969b94]">Customer</p>

                <p className="mt-1 text-sm font-medium text-[#30362f]">
                  {selectedBooking.customer}
                </p>

                <p className="mt-1 text-xs text-[#858b84]">
                  {selectedBooking.email}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#eceee9] p-4">
                  <p className="text-xs text-[#969b94]">Restaurant</p>
                  <p className="mt-1 text-sm text-[#555b54]">
                    {selectedBooking.restaurant}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#eceee9] p-4">
                  <p className="text-xs text-[#969b94]">Table</p>
                  <p className="mt-1 text-sm text-[#555b54]">
                    {selectedBooking.table}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#eceee9] p-4">
                  <p className="text-xs text-[#969b94]">Date</p>
                  <p className="mt-1 text-sm text-[#555b54]">
                    {selectedBooking.date}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#eceee9] p-4">
                  <p className="text-xs text-[#969b94]">Time</p>
                  <p className="mt-1 text-sm text-[#555b54]">
                    {selectedBooking.time}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#eceee9] p-4">
                  <p className="text-xs text-[#969b94]">Guests</p>
                  <p className="mt-1 text-sm text-[#555b54]">
                    {selectedBooking.guests}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#eceee9] p-4">
                  <p className="text-xs text-[#969b94]">Amount</p>
                  <p className="mt-1 text-sm font-medium text-[#30362f]">
                    {selectedBooking.amount}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-[#30362f]">
                  Booking status
                </p>

                <select
                  value={selectedBooking.status}
                  onChange={(e) => {
                    updateStatus(selectedBooking.id, e.target.value);

                    setSelectedBooking({
                      ...selectedBooking,
                      status: e.target.value,
                    });
                  }}
                  className="w-full rounded-xl border border-[#dfe2da] bg-white px-4 py-3 text-sm text-[#555b54] outline-none focus:border-[#68755f]"
                >
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setSelectedBooking(null)}
              className="mt-6 w-full rounded-full bg-[#68755f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#56634e]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminBookings;