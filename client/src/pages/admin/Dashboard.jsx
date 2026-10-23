import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [stats, setStats] = useState({
    restaurants: {
      total: 0,
    },
    bookings: {
      latest: 0,
      total: 0,
    },
    users: {
      customers: 0,
      owners: 0,
      total: 0,
    },
  });

  const [restaurants, setRestaurants] = useState([]);

  const [loading, setLoading] = useState(true);
  const [restaurantLoading, setRestaurantLoading] = useState(false);

  const [updatingId, setUpdatingId] = useState(null);

  const [error, setError] = useState("");

  // --------------------------------------------------
  // Fetch dashboard stats
  // --------------------------------------------------

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `${API_URL}/admin/restaurants/stats`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch dashboard statistics"
        );
      }

      setStats({
        restaurants: {
          total: data?.restaurants?.total ?? 0,
        },
        bookings: {
          latest: data?.bookings?.latest ?? 0,
          total: data?.bookings?.total ?? 0,
        },
        users: {
          customers: data?.users?.customers ?? 0,
          owners: data?.users?.owners ?? 0,
          total: data?.users?.total ?? 0,
        },
      });
    } catch (error) {
      console.error("Stats error:", error);
      setError(error.message);
    }
  };

  // --------------------------------------------------
  // Fetch all restaurants
  // --------------------------------------------------

  const fetchRestaurants = async () => {
    try {
      setRestaurantLoading(true);

      const response = await fetch(
        `${API_URL}/admin/restaurants`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch restaurants"
        );
      }

      /*
        Supports either:

        [
          {...},
          {...}
        ]

        OR

        {
          restaurants: [...]
        }

        OR

        {
          data: [...]
        }
      */

      const restaurantData = Array.isArray(data)
        ? data
        : data?.restaurants ||
          data?.data ||
          [];

      setRestaurants(restaurantData);
    } catch (error) {
      console.error("Restaurants error:", error);
      setError(error.message);
    } finally {
      setRestaurantLoading(false);
    }
  };

  // --------------------------------------------------
  // Initial loading
  // --------------------------------------------------

  useEffect(() => {
    const loadDashboard = async () => {
      try{
      setLoading(true);

      await Promise.all([
        fetchStats(),
        fetchRestaurants(),
      ]);

    }catch(e){
     console.error("Failed to fetch stats and Restaurants",e);
    }finally{
       setLoading(false);
    }
  }

    loadDashboard();
  }, []);

  // --------------------------------------------------
  // Change restaurant status
  // --------------------------------------------------

  const handleStatusChange = async (
    restaurantId,
    newStatus
  ) => {
    try {
      setUpdatingId(restaurantId);
      setError("");

      const response = await fetch(
        `${API_URL}/admin/restaurants/${restaurantId}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update restaurant status"
        );
      }

      // Update UI immediately
      setRestaurants((previousRestaurants) =>
        previousRestaurants.map((restaurant) => {
          const id =
            restaurant._id ||
            restaurant.id;

          if (id === restaurantId) {
            return {
              ...restaurant,
              status: newStatus,
            };
          }

          return restaurant;
        })
      );

      // Refresh stats because restaurant count may change
      await fetchStats();
    } catch (error) {
      console.error(
        "Status update error:",
        error
      );

      setError(error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------

  const getRestaurantId = (restaurant) => {
    return restaurant?._id || restaurant?.id;
  };

  const getRestaurantName = (restaurant) => {
    return (
      restaurant?.name ||
      restaurant?.restaurantName ||
      "Unnamed restaurant"
    );
  };

  const getOwnerName = (restaurant) => {
    if (typeof restaurant?.owner === "string") {
      return restaurant.owner;
    }

    if (restaurant?.owner?.name) {
      return restaurant.owner.name;
    }

    if (restaurant?.owner?.username) {
      return restaurant.owner.username;
    }

    if (restaurant?.owner?.email) {
      return restaurant.owner.email;
    }

    return "—";
  };

  const getLocation = (restaurant) => {
    if (typeof restaurant?.location === "string") {
      return restaurant.location;
    }

    if (restaurant?.address) {
      return restaurant.address;
    }

    if (restaurant?.city) {
      return restaurant.city;
    }

    return "—";
  };

  const normalizeStatus = (status) => {
    return String(status || "pending").toLowerCase();
  };

  const getStatusStyle = (status) => {
    switch (normalizeStatus(status)) {
      case "approved":
      case "approve":
        return "border-[#dce8d8] bg-[#eef4eb] text-[#58704f]";

      case "rejected":
      case "reject":
        return "border-[#eadcdc] bg-[#f6eeee] text-[#8a5d5d]";

      case "pending":
      default:
        return "border-[#e7ded0] bg-[#f5f0e8] text-[#8a7050]";
    }
  };

  const getStatusLabel = (status) => {
    switch (normalizeStatus(status)) {
      case "approved":
      case "approve":
        return "Approved";

      case "rejected":
      case "reject":
        return "Rejected";

      case "pending":
      default:
        return "Pending";
    }
  };

  // --------------------------------------------------
  // Loading screen
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-screen w-screen items-center justify-center bg-[#f7f8f5]">
        <Loader />
      </div>
    );
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-[#f7f8f5]  text-[#1d211d] lg:px-8">
      <Navbar />
      <div className="py-10">
      <div className="mx-auto max-w-7xl py-5">
        

        {/* -------------------------------------------
            HEADER
        -------------------------------------------- */}

        <div className="mb-8 mt-4">
          <p className="mb-2 text-sm font-medium tracking-wide text-[#68755f]">
            Platform overview
          </p>

          <h1 className="font-serif text-4xl tracking-tight text-[#20251f] sm:text-5xl">
            Admin dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#858b84]">
            Manage restaurants, monitor bookings, and keep
            track of registered users.
          </p>
        </div>

        {/* -------------------------------------------
            ERROR
        -------------------------------------------- */}

        {error && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-[#eadcdc] bg-[#f6eeee] px-5 py-4 text-sm text-[#8a5d5d]">
            <span>{error}</span>

            <button
              onClick={() => setError("")}
              className="ml-4 text-xs font-medium hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* -------------------------------------------
            THREE STAT CARDS
        -------------------------------------------- */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Restaurants */}

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#858b84]">
                  Restaurants
                </p>

                <p className="mt-2 font-serif text-4xl text-[#20251f]">
                  {stats.restaurants.total}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f1f3ed] text-[#68755f]">
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
              Registered restaurants
            </p>
          </div>

          {/* Bookings */}

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#858b84]">
                  Bookings
                </p>

                <p className="mt-2 font-serif text-4xl text-[#20251f]">
                  {stats.bookings.total}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f1f3ed] text-[#68755f]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect
                    x="4"
                    y="5"
                    width="16"
                    height="15"
                    rx="2"
                  />
                  <path d="M8 3v4M16 3v4M4 10h16" />
                </svg>
              </div>
            </div>

            <p className="mt-4 text-xs text-[#68755f]">
              {stats.bookings.latest} latest bookings
            </p>
          </div>

          {/* Users */}

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#858b84]">
                  Users
                </p>

                <p className="mt-2 font-serif text-4xl text-[#20251f]">
                  {stats.users.total}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f1f3ed] text-[#68755f]">
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
              {stats.users.customers} customers ·{" "}
              {stats.users.owners} owners
            </p>
          </div>
        </div>

        {/* -------------------------------------------
            RESTAURANT MANAGEMENT
        -------------------------------------------- */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-[#e5e7e1] bg-white">
          {/* Section header */}

          <div className="flex flex-col gap-3 border-b border-[#eceee9] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#68755f]">
                Administration
              </p>

              <h2 className="mt-1 font-serif text-2xl text-[#20251f]">
                Restaurant management
              </h2>

              <p className="mt-1 text-sm text-[#969b94]">
                Review and manage restaurant registration
                requests.
              </p>
            </div>

            <Link
              to="/admin/restaurants"
              className="text-xs font-medium text-[#68755f]"
            >
              View all restaurants →
            </Link>
          </div>

          {/* Restaurant loading */}

          {restaurantLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader />
            </div>
          ) : restaurants.length === 0 ? (
            /* Empty state */

            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f3ed] text-[#68755f]">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M4 10h16" />
                  <path d="M5 10v9h14v-9" />
                  <path d="M3 10 5 4h14l2 6" />
                </svg>
              </div>

              <h3 className="mt-4 font-serif text-xl text-[#20251f]">
                No restaurants found
              </h3>

              <p className="mt-2 max-w-md text-sm text-[#969b94]">
                There are currently no restaurants registered
                on the platform.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#eceee9] text-left">
                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                        Restaurant
                      </th>

                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                        Owner
                      </th>

                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                        Location
                      </th>

                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                        Status
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#969b94]">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#eceee9]">
                    {restaurants.map((restaurant) => {
                      const restaurantId =
                        getRestaurantId(restaurant);

                      const status =
                        normalizeStatus(
                          restaurant.status
                        );

                      const isUpdating =
                        updatingId === restaurantId;

                      return (
                        <tr
                          key={restaurantId}
                          className="transition hover:bg-[#fcfcfa]"
                        >
                          {/* Restaurant */}

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f1f3ed] font-serif text-sm text-[#68755f]">
                                {getRestaurantName(
                                  restaurant
                                )
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>
                                <p className="text-sm font-medium text-[#30362f]">
                                  {getRestaurantName(
                                    restaurant
                                  )}
                                </p>

                                {restaurant?.email && (
                                  <p className="mt-1 text-xs text-[#969b94]">
                                    {restaurant.email}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Owner */}

                          <td className="px-6 py-5">
                            <p className="text-sm text-[#555b54]">
                              {getOwnerName(restaurant)}
                            </p>
                          </td>

                          {/* Location */}

                          <td className="px-6 py-5">
                            <p className="max-w-[180px] truncate text-sm text-[#777d76]">
                              {getLocation(restaurant)}
                            </p>
                          </td>

                          {/* Status */}

                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex rounded-full border px-3 py-1.5 text-[11px] font-medium ${getStatusStyle(
                                status
                              )}`}
                            >
                              {getStatusLabel(status)}
                            </span>
                          </td>

                          {/* Actions */}

                          <td className="px-6 py-5">
                            <div className="flex justify-end">
                              {status === "pending" ? (
                                <div className="flex gap-2">
                                  <button
                                    disabled={isUpdating}
                                    onClick={() =>
                                      handleStatusChange(
                                        restaurantId,
                                        "approved"
                                      )
                                    }
                                    className="rounded-full bg-[#68755f] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#56634e] disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    {isUpdating
                                      ? "Updating..."
                                      : "Approve"}
                                  </button>

                                  <button
                                    disabled={isUpdating}
                                    onClick={() =>
                                      handleStatusChange(
                                        restaurantId,
                                        "rejected"
                                      )
                                    }
                                    className="rounded-full border border-[#eadcdc] bg-[#f6eeee] px-4 py-2 text-xs font-medium text-[#8a5d5d] transition hover:bg-[#f2e5e5] disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    Reject
                                  </button>
                                </div>
                              ) : (
                                <span className="text-xs text-[#969b94]">
                                  No action required
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}

              <div className="divide-y divide-[#eceee9] md:hidden">
                {restaurants.map((restaurant) => {
                  const restaurantId =
                    getRestaurantId(restaurant);

                  const status =
                    normalizeStatus(
                      restaurant.status
                    );

                  const isUpdating =
                    updatingId === restaurantId;

                  return (
                    <div
                      key={restaurantId}
                      className="p-5"
                    >
                      {/* Top */}

                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f1f3ed] font-serif text-sm text-[#68755f]">
                            {getRestaurantName(
                              restaurant
                            )
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="text-sm font-medium text-[#30362f]">
                              {getRestaurantName(
                                restaurant
                              )}
                            </p>

                            <p className="mt-1 text-xs text-[#969b94]">
                              {getOwnerName(restaurant)}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-medium ${getStatusStyle(
                            status
                          )}`}
                        >
                          {getStatusLabel(status)}
                        </span>
                      </div>

                      {/* Details */}

                      <div className="mt-4 rounded-xl bg-[#fafbf9] p-4">
                        <p className="text-[11px] uppercase tracking-wider text-[#969b94]">
                          Location
                        </p>

                        <p className="mt-1 text-sm text-[#555b54]">
                          {getLocation(restaurant)}
                        </p>
                      </div>

                      {/* Actions */}

                      {status === "pending" && (
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              handleStatusChange(
                                restaurantId,
                                "approved"
                              )
                            }
                            className="rounded-full bg-[#68755f] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#56634e] disabled:opacity-50"
                          >
                            {isUpdating
                              ? "Updating..."
                              : "Approve"}
                          </button>

                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              handleStatusChange(
                                restaurantId,
                                "rejected"
                              )
                            }
                            className="rounded-full border border-[#eadcdc] bg-[#f6eeee] px-4 py-2.5 text-xs font-medium text-[#8a5d5d] transition hover:bg-[#f2e5e5] disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>

        {/* -------------------------------------------
            FOOTER SUMMARY
        -------------------------------------------- */}

        <div className="mb-8 mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-xs text-[#969b94]">
              Customers
            </p>

            <p className="mt-1 font-serif text-2xl text-[#20251f]">
              {stats.users.customers}
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-xs text-[#969b94]">
              Restaurant owners
            </p>

            <p className="mt-1 font-serif text-2xl text-[#20251f]">
              {stats.users.owners}
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-xs text-[#969b94]">
              Latest bookings
            </p>

            <p className="mt-1 font-serif text-2xl text-[#20251f]">
              {stats.bookings.latest}
            </p>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
};

export default AdminDashboard;