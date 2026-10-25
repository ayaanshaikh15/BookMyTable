
import { useEffect, useMemo, useState } from "react";
import Loader from "../../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";

const AdminRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");
const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantLoading,setRestaurantLoading] = useState(false);
  const [changeStatusLoading,setChangeStatusLoading]= useState(false);
  const [newStatus, setNewStatus] = useState("");
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

  useEffect(()=>{
   fetchRestaurants();
  },[])
  
  const stats = {
  total: restaurants.length,
  active: restaurants.filter((r) => r.status === "approved").length,
  pending: restaurants.filter((r) => r.status === "pending").length,
  suspended: restaurants.filter((r) => r.status === "rejected").length,
};
  
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.owner?.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || restaurant.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [restaurants, search, statusFilter]);
   const refreshRestaurant = async()=>{
    await fetchRestaurants();
   }
   
    const handleStatusChange = async (
    restaurantId,
    newStatus
  ) => {
    try {
      
      setError("");
      setChangeStatusLoading(true)
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
            restaurant._id

          if (id === restaurantId) {
            return {
              ...restaurant,
              status: newStatus,
            };
          }

          return restaurant;
        })
      );
      if (selectedRestaurant?._id === restaurantId) {
  setSelectedRestaurant((prev) => ({
    ...prev,
    status: newStatus,
  }));
}
  setSelectedRestaurant(null)
  toast.success("Owner status updated")
  } catch (error) {
    toast.success("Owner status failed to update")
      console.error(
        "Status update error:",
        error
      );

      setError(error.message);
    } finally {
      setChangeStatusLoading(false)
    }
  };
  

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "border-[#dce8d8] bg-[#eef4eb] text-[#58704f]";

      case "pending":
        return "border-[#e7ded0] bg-[#f5f0e8] text-[#8a7050]";

      case "rejected":
        return "border-[#eadcdc] bg-[#f6eeee] text-[#8a5d5d]";

      default:
        return "border-[#e1e4dd] bg-[#f7f8f5] text-[#777d76]";
    }
  };

    if (restaurantLoading) {
    return (
      <div className="flex min-h-screen w-screen items-center justify-center bg-[#f7f8f5]">
        <Loader />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5]   text-[#1d211d] lg:px-8">
      <Navbar/>
      <div className="py-10">
      <div className="mx-auto max-w-7xl">
       
        {/* Header */}
        <div className="mb-8 flex flex-col mt-5 gap-5 sm:flex-row sm:items-end sm:justify-between">
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
              refreshRestaurant();
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
                <option value="approved">Active</option>
<option value="pending">Pending</option>
<option value="rejected">Suspended</option>
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
            {changeStatusLoading ?<>
            <div className="flex justify-center items-center w-full ">
            <Loader/>
            </div>
            </>:<>
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
                    key={restaurant._id}
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
                        {restaurant.owner?.name}
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
                          handleStatusChange(
                            restaurant._id,
                            e.target.value
                          )
                        }
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium outline-none ${getStatusStyle(
                          restaurant.status
                        )}`}
                      >
                        <option value="approved">Active</option>
<option value="pending">Pending</option>
<option value="rejected">Rejected</option>
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
            </>}
            
          </div>
         {changeStatusLoading ?<>
         <div className="flex justify-center items-center w-full ">
            <Loader/>
            </div>
         </>:<div className="divide-y divide-[#eceee9] md:hidden">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant._id} className="p-5">

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
                      {restaurant.owner?.name}
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
          </div>}
          {/* Mobile */}
          

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
        <section className="mt-6 grid gap-6 md:grid-cols-1">

    

        

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
                  {selectedRestaurant?.name
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
                  {selectedRestaurant.owner?.name}
                </p>
              </div>

              <div className="rounded-2xl bg-[#fafbf9] p-4">
                <p className="text-xs text-[#969b94]">
                  Restaurant ID
                </p>

                <p className="mt-1 text-sm font-medium text-[#30362f]">
                  {selectedRestaurant._id}
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
                  TotalSeats
                </p>

                <p className="mt-1 text-sm text-[#555b54]">
                  {selectedRestaurant.totalSeats}
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
                {selectedRestaurant?.owner?.email}
              </p>
            </div>

            {/* Status */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-[#30362f]">
                Restaurant status
              </p>

              <select
        value={newStatus || selectedRestaurant.status}
        onChange={(e) => setNewStatus(e.target.value)}
       className={`w-full rounded-xl border px-4 py-3 text-sm font-medium outline-none ${getStatusStyle(
    newStatus || selectedRestaurant.status
  )}`}
>
  <option value="approved">Active</option>
  <option value="pending">Pending</option>
  <option value="rejected">Suspended</option>
</select>
            </div>

            <button
  onClick={() => {
    handleStatusChange(
      selectedRestaurant._id,
      newStatus || selectedRestaurant.status
    );
    
  }}
  disabled={
    !newStatus ||
    newStatus === selectedRestaurant.status ||
    changeStatusLoading
  }
              className="mt-6 w-full rounded-full bg-[#68755f] px-5 py-3 text-sm font-medium text-white transition disabled:opacity-50 hover:bg-[#56634e]"
            >
              {changeStatusLoading ? "Updating..." : "Done"}
            </button>
          </div>
        </div>
      )}
      </div>
    </main>
  );
};

export default AdminRestaurants;