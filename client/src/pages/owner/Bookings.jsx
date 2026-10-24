
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  CalendarDays,
  Users,
  RefreshCw,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const filters = ["all", "confirmed", "completed", "cancelled"];

const statusStyles = {
  confirmed: "bg-blue-50 text-blue-700",
  completed: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

export default function OwnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/owner/bookings`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch bookings");
      }

      setBookings(
        Array.isArray(data)
          ? data
          : Array.isArray(data.bookings)
            ? data.bookings
            : data._id
              ? [data]
              : []
      );
    } catch (err) {
      setError(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (bookingId, status) => {
    try {
      setUpdatingId(bookingId);
      setError("");

      const response = await fetch(
        `${API_URL}/owner/status/${bookingId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update booking");
      }

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: data.data?.status || status }
            : booking
        )
      );
    } catch (err) {
      setError(err.message || "Failed to update booking");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const query = search.trim().toLowerCase();

    const matchesSearch = [
      booking.bookingId,
      booking.username,
      booking.email,
      booking.phoneNo,
      booking.time,
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));

    const matchesStatus =
      activeFilter === "all" || booking.status === activeFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f7f8f5] text-[#1d211d]">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/owner"
          className="inline-flex items-center gap-2 text-sm text-[#68755f] hover:text-[#56634e]"
        >
          <ArrowLeft size={17} /> Dashboard
        </Link>

        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl">
              All bookings
            </h1>
            <p className="mt-2 text-sm text-[#777d76]">
              Search reservations and manage their status.
            </p>
          </div>

          <button
            onClick={fetchBookings}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dfe3d8] bg-white px-4 py-2.5 text-sm hover:bg-[#f0f2ec]"
          >
            <RefreshCw size={15} /> Refresh
          </button>
        </div>

        <div className="mt-7 rounded-2xl border border-[#e5e7e1] bg-white p-4 sm:p-5">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#858b84]"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by booking ID, guest, email or phone..."
              className="w-full rounded-xl border border-[#e5e7e1] bg-[#fafbf9] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#68755f]"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm capitalize transition ${
                  activeFilter === filter
                    ? "bg-[#68755f] text-white"
                    : "border border-[#e5e7e1] text-[#777d76] hover:bg-[#f7f8f5]"
                }`}
              >
                {filter}
                {filter === "all" && ` (${bookings.length})`}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="mt-6 overflow-hidden rounded-2xl border border-[#e5e7e1] bg-white">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#dfe3d8] border-t-[#68755f]" />
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <CalendarDays
                size={34}
                className="mx-auto text-[#a5ada0]"
              />
              <h2 className="mt-4 font-serif text-xl">No bookings found</h2>
              <p className="mt-2 text-sm text-[#858b84]">
                Try another search term or status filter.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#edf0e9]">
              {filteredBookings.map((booking) => (
                <article key={booking._id} className="p-5 sm:p-6">
                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                    <div className="flex gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf1e9] text-[#68755f]">
                        <Users size={19} />
                      </div>

                      <div>
                        <h3 className="font-medium">
                          {booking.username || booking.userId?.name || "Guest"}
                        </h3>
                        <p className="mt-1 text-xs text-[#858b84]">
                          ID: {booking.bookingId || booking._id}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#777d76]">
                          <span>
                            {booking.date
                              ? new Date(booking.date).toLocaleDateString()
                              : "Date unavailable"}
                          </span>
                          <span>{booking.time}</span>
                          <span>{booking.guests} guests</span>
                        </div>

                        {booking.email && (
                          <p className="mt-2 text-sm text-[#858b84]">
                            {booking.email}
                          </p>
                        )}

                        {booking.specialRequests && (
                          <p className="mt-2 text-sm text-[#777d76]">
                            Request: {booking.specialRequests}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize ${
                          statusStyles[booking.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {booking.status}
                      </span>

                      <select
                        value={booking.status}
                        disabled={updatingId === booking._id}
                        onChange={(event) =>
                          updateStatus(booking._id, event.target.value)
                        }
                        className="rounded-xl border border-[#dfe3d8] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#68755f] disabled:opacity-50"
                        aria-label={`Change status for ${booking.bookingId || "booking"}`}
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <p className="mt-4 text-sm text-[#858b84]">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </p>
      </main>
    </div>
  );
}
