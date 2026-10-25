
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [loading, setLoading] = useState(false)
  const [restaurant, setrestaurant] = useState({})
  const API_URL = import.meta.env.VITE_API_URL
  const [upcomming, setupcomming] = useState([])
  const [cancelled, setcancelled] = useState([])
  const [completed, setcomplted] = useState([])
  const navigate = useNavigate();
  // Temporary booking data
  // Replace this later with API data from your backend.

  
 useEffect(() => {
    const fetchMybookings = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/bookings/`, {
  method: "GET",
  credentials: "include",
});
        const res = await response.json();
  
        if (!response.ok) {
          throw new Error(
            res.message || "Failed to fetch the my bookings"
          );
        }
  
        setrestaurant(res);
        setupcomming(res.filter((e) => e.status === "confirmed"));
        setcancelled(res.filter((e) => e.status === "cancelled"));
        setcomplted(res.filter((e) => e.status === "completed"));
      } catch (e) {
        console.error("Failed to fetch  my bookings:", e);
      }finally{
        setLoading(false)
      }
    };
  
    fetchMybookings();
  }, []);

  let bookings=[];
  if(activeTab === "upcoming")
    bookings=upcomming;
  else if(activeTab === "completed")
    bookings=completed;
  else
    bookings = cancelled;
 

  const handleCancel = async(bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );

    if (!confirmed) return;

    try{
     setLoading(true)
       const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
  method: "DELETE",
  credentials: "include",
});
        const res = await response.json();
  
        if (!response.ok) {
          throw new Error(
            res.message || "Failed to cancel bookings"
          );
        }
       alert("Booking cancelled")
       navigate(0)
    }catch(e){
       console.error("Failed to cancel booking", e);
    }finally{
    setLoading(false)
    }

   
  };
  
    if (loading) {
    return (
      <div className="flex min-h-screen w-screen items-center justify-center bg-[#f7f8f5]">
        <Loader />
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-white text-[#1d211d]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

    
      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="mx-auto max-w-5xl px-5 pb-24 pt-14 lg:px-10">

        {/* Page Heading */}

        <div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#68755f]">
            Your reservations
          </p>

          <h1 className="mt-3 font-serif text-4xl tracking-tight text-[#20251f] sm:text-5xl">
            My Bookings
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-6 text-[#777d76]">
            Keep track of your upcoming dining plans and
            revisit your previous experiences.
          </p>

        </div>

        {/* =====================================================
            TABS
        ===================================================== */}

        <div className="mt-10 border-b border-[#e5e7e1]">

          <div className="flex gap-8">

            <button
              type="button"
              onClick={() => setActiveTab("upcoming")}
              className={`relative pb-4 text-xs font-medium transition ${
                activeTab === "upcoming"
                  ? "text-[#68755f]"
                  : "text-[#858b84] hover:text-[#555d53]"
              }`}
            >
              Upcoming

              {activeTab === "upcoming" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#68755f]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("completed")}
              className={`relative pb-4 text-xs font-medium transition ${
                activeTab === "completed"
                  ? "text-[#68755f]"
                  : "text-[#858b84] hover:text-[#555d53]"
              }`}
            >
              Completed

              {activeTab === "completed" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#68755f]" />
              )}
            </button>
              <button
              type="button"
              onClick={() => setActiveTab("cancelled")}
              className={`relative pb-4 text-xs font-medium transition ${
                activeTab === "cancelled"
                  ? "text-[#68755f]"
                  : "text-[#858b84] hover:text-[#555d53]"
              }`}
            >
              Cancelled

              {activeTab === "cancelled" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#68755f]" />
              )}
            </button>
          </div>

        </div>

        {/* =====================================================
            BOOKING COUNT
        ===================================================== */}

        <div className="mt-8 flex items-center justify-between">

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#969b94]">
              {{
                upcoming:"Upcomming reservation",
                completed:"Dining History",
                cancelled:"Cancelled History"
              }[activeTab]}
             
            </p>

          </div>

          <span className="text-xs text-[#858b84]">
            {bookings.length}{" "}
            {bookings.length === 1
              ? "booking"
              : "bookings"}
          </span>

        </div>

        {/* =====================================================
            BOOKINGS
        ===================================================== */}

        {bookings.length > 0 ? (

          <div className="mt-5 space-y-5">

            {bookings.map((booking) => (

              <article
                key={booking.bookingId}
                className="overflow-hidden rounded-2xl border border-[#e5e7e1] bg-white transition duration-300 hover:shadow-md"
              >

                <div className="grid lg:grid-cols-[230px_1fr]">

                  {/* Image */}

                  <div className="h-52 overflow-hidden lg:h-full">

                    <img
                      src={booking.restaurantId.image}
                      alt={booking.restaurant}
                      className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />

                  </div>

                  {/* Content */}

                  <div className="p-5 sm:p-6">

                    {/* Top */}

                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                      <div>

                        <div className="flex flex-wrap items-center gap-2">

                          <span
                            className={`rounded-full px-3 py-1.5 text-[10px] font-medium ${
                              booking.status === "Confirmed"
                                ? "bg-[#f3f5f0] text-[#68755f]"
                                : "bg-[#f5f5f3] text-[#777d76]"
                            }`}
                          >
                            {booking.status}
                          </span>

                          <span className="text-[10px] text-[#a0a49f]">
                            #{booking.bookingId}
                          </span>

                        </div>

                        <h2 className="mt-3 font-serif text-2xl text-[#20251f] sm:text-3xl">
                          {booking.restaurantId.name}
                        </h2>

                        <p className="mt-1 text-xs text-[#858b84]">
                        
                          {booking.restaurantId.address}
                        </p>

                       

                      </div>

                      {/* Restaurant Link */}

                      <Link
                        to={`/restaurants/${booking.restaurantId._id}`}
                        className="w-fit text-xs font-medium text-[#68755f] hover:underline"
                      >
                        View restaurant →
                      </Link>

                    </div>

                    {/* Booking Information */}

                    <div className="mt-6 grid gap-4 border-t border-[#eceee9] pt-5 sm:grid-cols-3">

                      {/* Date */}

                      <div>

                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
                          Date
                        </p>

                        <p className="mt-2 text-sm font-medium text-[#30362f]">
                          {booking.date.toString().substring(0,10)}
                        </p>

                      </div>

                      {/* Time */}

                      <div>

                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
                          Time
                        </p>

                        <p className="mt-2 text-sm font-medium text-[#30362f]">
                          {booking.time}
                        </p>

                      </div>

                      {/* Guests */}

                      <div>

                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
                          Guests
                        </p>

                        <p className="mt-2 text-sm font-medium text-[#30362f]">
                          {booking.guests}{" "}
                          {booking.guests === 1
                            ? "Guest"
                            : "Guests"}
                        </p>

                      </div>

                    </div>

                    {/* Bottom */}

                    <div className="mt-5 flex flex-col justify-between gap-4 border-t border-[#eceee9] pt-5 sm:flex-row sm:items-center">

                      <div>

                        <p className="text-[10px] text-[#969b94]">
                          Reserved table
                        </p>

                        <p className="mt-1 text-xs font-medium text-[#555d53]">
                          {booking.table}
                        </p>

                      </div>

                      {/* Actions */}

                      <div className="flex items-center gap-2">

                        {activeTab === "upcoming" ? (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                handleCancel(booking._id)
                              }
                              className="rounded-full border border-[#dfe2da] px-4 py-2.5 text-[10px] font-medium text-[#777d76] transition hover:border-red-200 hover:text-red-500"
                            >
                              Cancel booking
                            </button>

                            <Link
                              to={`/restaurants/${booking.restaurantId._id}`}
                              className="rounded-full bg-[#68755f] px-5 py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#56634e]"
                            >
                              View details
                            </Link>
                          </>
                        ) : (
                          <Link
                            to={`/restaurants/${booking.restaurantId._id}`}
                            className="rounded-full border border-[#dfe2da] px-5 py-2.5 text-[10px] font-medium text-[#68755f] transition hover:bg-[#f7f8f5]"
                          >
                            Book again
                          </Link>
                        )}

                      </div>

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

        ) : (

          /* =====================================================
              EMPTY STATE
          ===================================================== */

          <div className="mt-8 rounded-3xl border border-dashed border-[#dfe2da] bg-[#fafbf9] px-6 py-20 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#68755f] shadow-sm ring-1 ring-[#e8e9e4]">
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
  {{
    upcoming: "No upcoming bookings",
    completed: "No completed bookings",
    cancelled: "No cancelled bookings",
  }[activeTab]}
</h2>

<p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#858b84]">
  {{
    upcoming:
      "You don't have any upcoming reservations. Discover a restaurant and reserve your next table.",
    completed:
      "Your completed dining experiences will appear here.",
    cancelled:
      "Your cancelled bookings will appear here.",
  }[activeTab]}
</p>

            {activeTab === "upcoming" && (
              <Link
                to="/restaurants"
                className="mt-6 inline-block rounded-full bg-[#68755f] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#56634e]"
              >
                Discover restaurants
              </Link>
            )}

          </div>

        )}

      </section>

     

    </main>
  );
};

export default MyBookings;
