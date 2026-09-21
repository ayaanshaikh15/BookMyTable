import { useMemo, useState } from "react";

const AdminRestaurants = () => {
  const [restaurants, setRestaurants] = useState([
    {
      id: "RES-001",
      name: "The Olive Table",
      owner: "Aarav Mehta",
      email: "aarav@theolivetable.com",
      location: "Belagavi, Karnataka",
      cuisine: "Italian · Continental",
      rating: 4.8,
      bookings: 428,
      tables: 18,
      status: "Active",
      joined: "12 Jan 2026",
    },
    {
      id: "RES-002",
      name: "Urban Fork",
      owner: "Rohan Patil",
      email: "rohan@urbanfork.com",
      location: "Bengaluru, Karnataka",
      cuisine: "Modern Indian",
      rating: 4.7,
      bookings: 391,
      tables: 24,
      status: "Active",
      joined: "18 Feb 2026",
    },
    {
      id: "RES-003",
      name: "Casa Verde",
      owner: "Meera Joshi",
      email: "meera@casaverde.com",
      location: "Mysuru, Karnataka",
      cuisine: "Italian",
      rating: 4.6,
      bookings: 347,
      tables: 20,
      status: "Active",
      joined: "03 Mar 2026",
    },
    {
      id: "RES-004",
      name: "Saffron House",
      owner: "Vikram Rao",
      email: "vikram@saffronhouse.com",
      location: "Hubballi, Karnataka",
      cuisine: "North Indian",
      rating: 4.5,
      bookings: 312,
      tables: 16,
      status: "Active",
      joined: "22 Mar 2026",
    },
    {
      id: "RES-005",
      name: "The Garden Room",
      owner: "Ananya Kulkarni",
      email: "ananya@gardenroom.com",
      location: "Bengaluru, Karnataka",
      cuisine: "European",
      rating: 4.4,
      bookings: 186,
      tables: 14,
      status: "Pending",
      joined: "14 Sep 2026",
    },
    {
      id: "RES-006",
      name: "Spice Route",
      owner: "Karan Desai",
      email: "karan@spiceroute.com",
      location: "Mangaluru, Karnataka",
      cuisine: "Indian · Asian",
      rating: 4.3,
      bookings: 164,
      tables: 12,
      status: "Suspended",
      joined: "09 May 2026",
    },
    {
      id: "RES-007",
      name: "Basil & Stone",
      owner: "Neha Shetty",
      email: "neha@basilstone.com",
      location: "Udupi, Karnataka",
      cuisine: "Mediterranean",
      rating: 4.7,
      bookings: 152,
      tables: 10,
      status: "Active",
      joined: "27 Jun 2026",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const stats = {
    total: restaurants.length,
    active: restaurants.filter((r) => r.status === "Active").length,
    pending: restaurants.filter((r) => r.status === "Pending").length,
    suspended: restaurants.filter((r) => r.status === "Suspended").length,
  };

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.owner.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || restaurant.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [restaurants, search, statusFilter]);

  const updateStatus = (id, status) => {
    setRestaurants((prev) =>
      prev.map((restaurant) =>
        restaurant.id === id
          ? { ...restaurant, status }
          : restaurant
      )
    );

    if (selectedRestaurant?.id === id) {
      setSelectedRestaurant((prev) => ({
        ...prev,
        status,
      }));
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "border-[#dce8d8] bg-[#eef4eb] text-[#58704f]";

      case "Pending":
        return "border-[#e7ded0] bg-[#f5f0e8] text-[#8a7050]";

      case "Suspended":
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
              Platform management
            </p>

            <h1 className="font-serif text-4xl tracking-tight text-[#20251f] sm:text-5xl">
              Restaurants
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#858b84]">
              Manage restaurants, owners, approvals, and restaurant activity
              across Tablely.
            </p>
          </div>

          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
            }}
            className="rounded-full border border-[#dfe2da] bg-white px-5 py-2.5 text-sm font-medium text-[#68755f] transition hover:border-[#68755f] hover:bg-[#fafbf9]"
          >
            Refresh list
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">Total restaurants</p>

            <p className="mt-2 font-serif text-3xl text-[#20251f]">
              {stats.total}
            </p>

            <p className="mt-4 text-xs text-[#68755f]">
              Registered on Tablely
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">Active</p>

            <p className="mt-2 font-serif text-3xl text-[#58704f]">
              {stats.active}
            </p>

            <p className="mt-4 text-xs text-[#68755f]">
              Accepting reservations
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">Pending approval</p>

            <p className="mt-2 font-serif text-3xl text-[#8a7050]">
              {stats.pending}
            </p>

            <p className="mt-4 text-xs text-[#8a7050]">
              Requires review
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">Suspended</p>

            <p className="mt-2 font-serif text-3xl text-[#8a5d5d]">
              {stats.suspended}
            </p>

            <p className="mt-4 text-xs text-[#8a5d5d]">
              Not accepting bookings
            </p>
          </div>
        </div>

        {/* Restaurant List */}
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search restaurants, owners or locations..."
                  className="w-full rounded-full border border-[#dfe2da] bg-[#fafbf9] py-3 pl-11 pr-4 text-sm text-[#30362f] outline-none transition placeholder:text-[#a1a59f] focus:border-[#68755f] focus:bg-white"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-full border border-[#dfe2da] bg-white px-5 py-2.5 text-sm text-[#555b54] outline-none focus:border-[#68755f]"
              >
                <option value="All">All restaurants</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-[#858b84]">
                Showing{" "}
                <span className="font-medium text-[#555b54]">
                  {filteredRestaurants.length}
                </span>{" "}
                restaurants
              </p>

              {(search || statusFilter !== "All") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
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
                    Restaurant
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Owner
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Location
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Performance
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
                {filteredRestaurants.map((restaurant) => (
                  <tr
                    key={restaurant.id}
                    className="border-b border-[#f0f1ed] last:border-0 hover:bg-[#fcfcfa]"
                  >
                    {/* Restaurant */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1f3ed] font-serif text-sm text-[#68755f]">
                          {restaurant.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-[#30362f]">
                            {restaurant.name}
                          </p>

                          <p className="mt-1 text-xs text-[#969b94]">
                            {restaurant.cuisine}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Owner */}
                    <td className="px-6 py-5">
                      <p className="text-sm text-[#555b54]">
                        {restaurant.owner}
                      </p>

                      <p className="mt-1 text-xs text-[#969b94]">
                        {restaurant.email}
                      </p>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-5">
                      <span className="text-sm text-[#555b54]">
                        {restaurant.location}
                      </span>
                    </td>

                    {/* Performance */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm text-[#555b54]">
                            {restaurant.bookings}
                          </p>

                          <p className="mt-1 text-xs text-[#969b94]">
                            bookings
                          </p>
                        </div>

                        <div className="h-8 w-px bg-[#eceee9]" />

                        <div>
                          <p className="text-sm text-[#555b54]">
                            ★ {restaurant.rating}
                          </p>

                          <p className="mt-1 text-xs text-[#969b94]">
                            rating
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <select
                        value={restaurant.status}
                        onChange={(e) =>
                          updateStatus(
                            restaurant.id,
                            e.target.value
                          )
                        }
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium outline-none ${getStatusStyle(
                          restaurant.status
                        )}`}
                      >
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Suspended</option>
                      </select>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() =>
                          setSelectedRestaurant(restaurant)
                        }
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

          {/* Mobile */}
          <div className="divide-y divide-[#eceee9] md:hidden">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="p-5">

                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1f3ed] font-serif text-sm text-[#68755f]">
                      {restaurant.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#30362f]">
                        {restaurant.name}
                      </p>

                      <p className="mt-1 truncate text-xs text-[#969b94]">
                        {restaurant.cuisine}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-medium ${getStatusStyle(
                      restaurant.status
                    )}`}
                  >
                    {restaurant.status}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#969b94]">
                      Owner
                    </p>

                    <p className="mt-1 text-sm text-[#555b54]">
                      {restaurant.owner}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#969b94]">
                      Location
                    </p>

                    <p className="mt-1 text-sm text-[#555b54]">
                      {restaurant.location}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#969b94]">
                      Bookings
                    </p>

                    <p className="mt-1 text-sm text-[#555b54]">
                      {restaurant.bookings}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#969b94]">
                      Rating
                    </p>

                    <p className="mt-1 text-sm text-[#555b54]">
                      ★ {restaurant.rating}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSelectedRestaurant(restaurant)
                  }
                  className="mt-5 w-full rounded-full border border-[#dfe2da] py-2.5 text-xs font-medium text-[#68755f]"
                >
                  View restaurant
                </button>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredRestaurants.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f3ed] text-xl text-[#68755f]">
                —
              </div>

              <h3 className="mt-4 font-serif text-xl text-[#30362f]">
                No restaurants found
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#858b84]">
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </section>

        {/* Platform Summary */}
        <section className="mt-6 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-[#68755f]">
              Total tables
            </p>

            <p className="mt-2 font-serif text-3xl text-[#20251f]">
              {restaurants.reduce(
                (sum, restaurant) => sum + restaurant.tables,
                0
              )}
            </p>

            <p className="mt-2 text-sm text-[#858b84]">
              Seating tables across all restaurants
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-[#68755f]">
              Total bookings
            </p>

            <p className="mt-2 font-serif text-3xl text-[#20251f]">
              {restaurants
                .reduce(
                  (sum, restaurant) => sum + restaurant.bookings,
                  0
                )
                .toLocaleString()}
            </p>

            <p className="mt-2 text-sm text-[#858b84]">
              Reservations generated by restaurants
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-[#68755f]">
              Average rating
            </p>

            <p className="mt-2 font-serif text-3xl text-[#20251f]">
              {(
                restaurants.reduce(
                  (sum, restaurant) => sum + restaurant.rating,
                  0
                ) / restaurants.length
              ).toFixed(1)}
            </p>

            <p className="mt-2 text-sm text-[#858b84]">
              Based on restaurant ratings
            </p>
          </div>
        </section>
      </div>

      {/* Details Modal */}
      {selectedRestaurant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d211d]/35 px-5 py-6 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-[#e5e7e1] bg-white p-6 shadow-2xl sm:p-8">

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f3ed] font-serif text-lg text-[#68755f]">
                  {selectedRestaurant.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#68755f]">
                    Restaurant
                  </p>

                  <h2 className="mt-1 font-serif text-2xl text-[#20251f]">
                    {selectedRestaurant.name}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setSelectedRestaurant(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e1e4dd] text-[#777d76] transition hover:bg-[#f7f8f5]"
              >
                ×
              </button>
            </div>

            {/* Details */}
            <div className="mt-7 grid grid-cols-2 gap-3">

              <div className="rounded-2xl bg-[#fafbf9] p-4">
                <p className="text-xs text-[#969b94]">
                  Owner
                </p>

                <p className="mt-1 text-sm font-medium text-[#30362f]">
                  {selectedRestaurant.owner}
                </p>
              </div>

              <div className="rounded-2xl bg-[#fafbf9] p-4">
                <p className="text-xs text-[#969b94]">
                  Restaurant ID
                </p>

                <p className="mt-1 text-sm font-medium text-[#30362f]">
                  {selectedRestaurant.id}
                </p>
              </div>

              <div className="rounded-2xl border border-[#eceee9] p-4">
                <p className="text-xs text-[#969b94]">
                  Cuisine
                </p>

                <p className="mt-1 text-sm text-[#555b54]">
                  {selectedRestaurant.cuisine}
                </p>
              </div>

              <div className="rounded-2xl border border-[#eceee9] p-4">
                <p className="text-xs text-[#969b94]">
                  Location
                </p>

                <p className="mt-1 text-sm text-[#555b54]">
                  {selectedRestaurant.location}
                </p>
              </div>

              <div className="rounded-2xl border border-[#eceee9] p-4">
                <p className="text-xs text-[#969b94]">
                  Tables
                </p>

                <p className="mt-1 text-sm text-[#555b54]">
                  {selectedRestaurant.tables}
                </p>
              </div>

              <div className="rounded-2xl border border-[#eceee9] p-4">
                <p className="text-xs text-[#969b94]">
                  Bookings
                </p>

                <p className="mt-1 text-sm text-[#555b54]">
                  {selectedRestaurant.bookings}
                </p>
              </div>

              <div className="rounded-2xl border border-[#eceee9] p-4">
                <p className="text-xs text-[#969b94]">
                  Rating
                </p>

                <p className="mt-1 text-sm text-[#555b54]">
                  ★ {selectedRestaurant.rating}
                </p>
              </div>

              <div className="rounded-2xl border border-[#eceee9] p-4">
                <p className="text-xs text-[#969b94]">
                  Joined
                </p>

                <p className="mt-1 text-sm text-[#555b54]">
                  {selectedRestaurant.joined}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="mt-3 rounded-2xl border border-[#eceee9] p-4">
              <p className="text-xs text-[#969b94]">
                Owner email
              </p>

              <p className="mt-1 text-sm text-[#555b54]">
                {selectedRestaurant.email}
              </p>
            </div>

            {/* Status */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-[#30362f]">
                Restaurant status
              </p>

              <select
                value={selectedRestaurant.status}
                onChange={(e) =>
                  updateStatus(
                    selectedRestaurant.id,
                    e.target.value
                  )
                }
                className={`w-full rounded-xl border px-4 py-3 text-sm font-medium outline-none ${getStatusStyle(
                  selectedRestaurant.status
                )}`}
              >
                <option>Active</option>
                <option>Pending</option>
                <option>Suspended</option>
              </select>
            </div>

            <button
              onClick={() => setSelectedRestaurant(null)}
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

export default AdminRestaurants;