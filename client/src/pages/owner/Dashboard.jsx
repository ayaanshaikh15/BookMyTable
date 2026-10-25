
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Users,
  ArrowRight,
  Utensils,
  Settings,
  Clock,
  CheckCircle2,
  XCircle,
  ClipboardList,
  MapPin,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from '../../components/Navbar';
const API_URL = import.meta.env.VITE_API_URL;

const statusStyles = {
  confirmed: "bg-blue-50 text-blue-700",
  completed: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

export default function OwnerDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const userId = user?.id || user?._id;
useEffect(() => {
  if (!userId) return;

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [restaurantResponse, bookingsResponse] = await Promise.all([
        fetch(`${API_URL}/owner/restaurant/${userId}`, {
          credentials: "include",
        }),
        fetch(`${API_URL}/owner/bookings`, {
          credentials: "include",
        }),
      ]);

      const restaurantData = await restaurantResponse.json();
      const bookingsData = await bookingsResponse.json();

      if (!restaurantResponse.ok) {
        throw new Error(
          restaurantData.message || "Failed to load restaurant"
        );
      }

      if (!bookingsResponse.ok) {
        throw new Error(
          bookingsData.message || "Failed to load bookings"
        );
      }

      if (!restaurantData.hasRestaurant) {
        navigate("/owner/create-restaurant", { replace: true });
        return;
      }

      setRestaurant(restaurantData.restaurant);

      setBookings(
        Array.isArray(bookingsData)
          ? bookingsData
          : Array.isArray(bookingsData.bookings)
            ? bookingsData.bookings
            : bookingsData?._id
              ? [bookingsData]
              : []
      );
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {

      setLoading(false);
    }
  };

  fetchDashboard();
}, [userId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8f5] flex items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#dfe3d8] border-t-[#68755f]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f7f8f5] p-6">
        <div className="mx-auto max-w-5xl rounded-2xl border border-red-100 bg-white p-6">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-full bg-[#68755f] px-5 py-2 text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status === "completed"
  ).length;

  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.date) -
        new Date(a.createdAt || a.date)
    )
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f7f8f5] text-[#1d211d]">
      <Navbar/>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-[#777d76]">Owner workspace</p>
            <h1 className="mt-1 font-serif text-3xl sm:text-4xl">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-[#777d76]">
              Manage your restaurant and reservations.
            </p>
          </div>

          <Link
            to="/owner/restaurant"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#68755f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#56634e]"
          >
            <Settings size={17} />
            Manage restaurant
          </Link>
        </div>

        {restaurant && (
          <section className="mt-8 overflow-hidden rounded-3xl border border-[#e5e7e1] bg-white">
            <div className="grid md:grid-cols-[1fr_220px]">
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#edf1e9] px-3 py-1 text-xs font-medium text-[#56634e]">
                    Your restaurant
                  </span>
                  {restaurant.status && (
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs capitalize text-amber-700">
                      {restaurant.status}
                    </span>
                  )}
                </div>

                <h2 className="mt-4 font-serif text-3xl">
                  {restaurant.name}
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#777d76]">
                  {restaurant.description || "Manage your restaurant profile and bookings."}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-[#777d76]">
                  {restaurant.cuisine && (
                    <span className="flex items-center gap-2">
                      <Utensils size={16} />
                      {restaurant.cuisine}
                    </span>
                  )}
                  {restaurant.location && (
                    <span className="flex items-center gap-2">
                      <MapPin size={16} />
                      {restaurant.location}
                    </span>
                  )}
                </div>

                <Link
                  to="/owner/restaurant"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#68755f] hover:text-[#56634e]"
                >
                  View and edit details <ArrowRight size={16} />
                </Link>
              </div>

              <div className="hidden items-center justify-center bg-[#edf1e9] md:flex">
                <Utensils size={62} strokeWidth={1} className="text-[#68755f]" />
              </div>
            </div>
          </section>
        )}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total bookings"
            value={bookings.length}
            icon={<CalendarDays size={20} />}
          />
          <StatCard
            title="Confirmed"
            value={confirmedCount}
            icon={<Clock size={20} />}
          />
          <StatCard
            title="Completed"
            value={completedCount}
            icon={<CheckCircle2 size={20} />}
          />
        </section>

        <section className="mt-8 overflow-hidden rounded-3xl border border-[#e5e7e1] bg-white">
          <div className="flex flex-col justify-between gap-3 border-b border-[#edf0e9] p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <h2 className="font-serif text-2xl">Recent bookings</h2>
              <p className="mt-1 text-sm text-[#858b84]">
                Your five latest reservations
              </p>
            </div>

            <Link
              to="/owner/bookings"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#68755f] hover:text-[#56634e]"
            >
              View all bookings <ArrowRight size={16} />
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <CalendarDays
                size={34}
                className="mx-auto text-[#a5ada0]"
              />
              <h3 className="mt-4 font-serif text-xl">No bookings yet</h3>
              <p className="mt-2 text-sm text-[#858b84]">
                New reservations will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#edf0e9]">
              {recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:px-6"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#edf1e9] text-[#68755f]">
                      <Users size={19} />
                    </div>

                    <div>
                      <p className="font-medium">
                        {booking.username || booking.userId?.name || "Guest"}
                      </p>
                      <p className="mt-1 text-sm text-[#858b84]">
                        {booking.bookingId || booking._id}
                      </p>
                      <p className="mt-1 text-sm text-[#777d76]">
                        {booking.date
                          ? new Date(booking.date).toLocaleDateString()
                          : "Date unavailable"}{" "}
                        · {booking.time} · {booking.guests} guests
                      </p>
                    </div>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1.5 text-xs font-medium capitalize ${
                      statusStyles[booking.status] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-[#edf0e9] p-5 sm:px-6">
            <Link
              to="/owner/bookings"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#dfe3d8] py-3 text-sm font-medium text-[#56634e] hover:bg-[#f7f8f5]"
            >
              <ClipboardList size={17} />
              Manage all bookings
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#777d76]">{title}</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf1e9] text-[#68755f]">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-3xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}
