
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const RestaurantDetails = () => {
  const { id } = useParams();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [selectedTable, setSelectedTable] = useState(null);

  /*
   * Temporary restaurant data.
   * Later replace this with an API request using `id`.
   */
const navigate = useNavigate();
  const restaurants = {
    1: {
      name: "The Olive Table",
      location: "Belagavi, Karnataka",
      cuisine: "Italian · Continental",
      rating: "4.8",
      reviews: "324 reviews",
      price: "₹₹",
      image:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=90",
      description:
        "The Olive Table brings together refined Italian and Continental cuisine in a warm and relaxed setting. Thoughtfully prepared dishes, fresh ingredients and an inviting atmosphere make it a perfect place for a memorable dining experience.",
      hours: "11:00 AM – 10:30 PM",
      address: "College Road, Belagavi, Karnataka",
      phone: "+91 98765 43210",
    },

    2: {
      name: "Koi House",
      location: "Belagavi, Karnataka",
      cuisine: "Japanese · Sushi",
      rating: "4.7",
      reviews: "286 reviews",
      price: "₹₹₹",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1800&q=90",
      description:
        "Koi House offers a contemporary Japanese dining experience featuring sushi, fresh ingredients and carefully crafted favourites in a calm atmosphere.",
      hours: "12:00 PM – 10:30 PM",
      address: "Tilakwadi, Belagavi, Karnataka",
      phone: "+91 98765 12345",
    },

    3: {
      name: "Maison 21",
      location: "Belagavi, Karnataka",
      cuisine: "French · European",
      rating: "4.9",
      reviews: "412 reviews",
      price: "₹₹₹",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=90",
      description:
        "Maison 21 combines elegant European flavours with a sophisticated dining environment designed for relaxed lunches, dinners and special occasions.",
      hours: "12:00 PM – 11:00 PM",
      address: "Camp, Belagavi, Karnataka",
      phone: "+91 98765 67890",
    },
  };

  const restaurant = restaurants[id] || restaurants[1];

  /*
   * Temporary tables.
   * These will eventually come from the backend
   * based on date, time and guest count.
   */

  const tables = [
    {
      id: "T1",
      number: "01",
      capacity: 2,
      position: "Window",
    },
    {
      id: "T2",
      number: "02",
      capacity: 2,
      position: "Indoor",
    },
    {
      id: "T3",
      number: "03",
      capacity: 4,
      position: "Window",
    },
    {
      id: "T4",
      number: "04",
      capacity: 4,
      position: "Indoor",
    },
    {
      id: "T5",
      number: "05",
      capacity: 6,
      position: "Private",
    },
    {
      id: "T6",
      number: "06",
      capacity: 8,
      position: "Private",
    },
  ];
  
  const suitableTables = tables.filter(
    (table) => table.capacity >= Number(guests)
  );

  const handleReservation = () => {
    if (!date || !time || !guests || !selectedTable) {
      alert("Please select date, time, guests and a table.");
      return;
    }
navigate("/confirm-reservation", {
  state: {
       id,
      name: restaurant.name,
      date,
      time,
      guests,
      table: selectedTable,
      location: restaurant.location,
      cuisine: restaurant.cuisine,
      image: restaurant.image,
  },
});
  }
   
  return (
    <main className="min-h-screen bg-white text-[#1d211d]">

     
      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-5 pb-20 pt-8 lg:px-10 ">

        {/* Breadcrumb */}

        <div className="mb-7 flex items-center gap-2 text-xs text-[#858b84]">

          <Link
            to="/restaurants"
            className="transition hover:text-[#68755f]"
          >
            Restaurants
          </Link>

          <span>→</span>

          <span>{restaurant.name}</span>

        </div>

        {/* =====================================================
            HERO IMAGE
        ===================================================== */}

        <div className="relative h-[320px] overflow-hidden rounded-3xl sm:h-[430px] lg:h-[500px]">

          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

          {/* Image Information */}

          <div className="absolute bottom-6 left-6 right-6 text-white sm:bottom-8 sm:left-8">

            <div className="flex flex-wrap items-center gap-2">

              <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-[#252a24]">
                ★ {restaurant.rating}
              </span>

              <span className="rounded-full bg-black/30 px-3 py-1.5 text-[10px] backdrop-blur-sm">
                {restaurant.reviews}
              </span>

              <span className="rounded-full bg-black/30 px-3 py-1.5 text-[10px] backdrop-blur-sm">
                {restaurant.price}
              </span>

            </div>

            <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl lg:text-6xl">
              {restaurant.name}
            </h1>

            <p className="mt-2 text-sm text-white/80">
              {restaurant.location}
            </p>

          </div>

        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_410px]">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <section>

            {/* Restaurant Info */}

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#68755f]">
                About the restaurant
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3">

                <h2 className="font-serif text-3xl text-[#20251f] sm:text-4xl">
                  {restaurant.cuisine}
                </h2>

              </div>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#777d76]">
                {restaurant.description}
              </p>

            </div>

            {/* Restaurant Details */}

            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-[#e5e7e1] bg-[#fafbf9] p-5">

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#68755f] ring-1 ring-[#e8e9e4]">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                        d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z"
                      />

                      <circle
                        cx="12"
                        cy="10"
                        r="2.2"
                        strokeWidth="1.7"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
                      Address
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#555d53]">
                      {restaurant.address}
                    </p>
                  </div>

                </div>

              </div>

              <div className="rounded-2xl border border-[#e5e7e1] bg-[#fafbf9] p-5">

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#68755f] ring-1 ring-[#e8e9e4]">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        strokeWidth="1.7"
                      />

                      <path
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        d="M12 7v5l3 2"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
                      Opening hours
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#555d53]">
                      {restaurant.hours}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Contact */}

            <div className="mt-6 rounded-2xl border border-[#e5e7e1] bg-white p-5">

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
                    Contact
                  </p>

                  <p className="mt-2 text-sm text-[#555d53]">
                    {restaurant.phone}
                  </p>

                </div>

                <button className="w-fit rounded-full border border-[#dfe2da] px-5 py-2.5 text-xs font-medium text-[#68755f] transition hover:bg-[#f7f8f5]">
                  Get directions
                </button>

              </div>

            </div>

          </section>

          {/* =================================================
              RIGHT SIDE — RESERVATION
          ================================================= */}

          <aside className="lg:sticky lg:top-6 lg:self-start">

  <div className="rounded-2xl border border-[#e5e7e1] bg-[#fafbf9] p-4 shadow-sm">

    <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#68755f]">
      Reserve a table
    </p>

    <h2 className="mt-2 font-serif text-2xl text-[#20251f]">
      Plan your visit
    </h2>

    <p className="mt-1 text-[11px] leading-4 text-[#858b84]">
      Choose your date, time and number of guests to see suitable tables.
    </p>

    {/* Date */}
    <div className="mt-5">
      <label className="mb-1.5 block text-[11px] font-medium text-[#555d53]">
        Date
      </label>

      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          setSelectedTable(null);
        }}
        min={new Date().toISOString().split("T")[0]}
        className="w-full rounded-lg border border-[#dfe2da] bg-white px-3 py-2 text-xs text-[#252a25] outline-none transition focus:border-[#68755f]"
      />
    </div>

    {/* Time */}
    <div className="mt-3">
      <label className="mb-1.5 block text-[11px] font-medium text-[#555d53]">
        Time
      </label>

      <select
        value={time}
        onChange={(e) => {
          setTime(e.target.value);
          setSelectedTable(null);
        }}
        className="w-full rounded-lg border border-[#dfe2da] bg-white px-3 py-2 text-xs text-[#252a25] outline-none transition focus:border-[#68755f]"
      >
        <option value="">Select time</option>
        <option value="19:00">7:00 PM</option>
        <option value="19:30">7:30 PM</option>
        <option value="20:00">8:00 PM</option>
        <option value="20:30">8:30 PM</option>
        <option value="21:00">9:00 PM</option>
      </select>
    </div>

    {/* Guests */}
    <div className="mt-3">
      <label className="mb-1.5 block text-[11px] font-medium text-[#555d53]">
        Guests
      </label>

      <select
        value={guests}
        onChange={(e) => {
          setGuests(e.target.value);
          setSelectedTable(null);
        }}
        className="w-full rounded-lg border border-[#dfe2da] bg-white px-3 py-2 text-xs text-[#252a25] outline-none transition focus:border-[#68755f]"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
          <option key={number} value={number}>
            {number} {number === 1 ? "Guest" : "Guests"}
          </option>
        ))}
      </select>
    </div>

    {/* Tables */}
    <div className="mt-5 border-t border-[#e5e7e1] pt-4">

      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-[#555d53]">
          Available tables
        </p>

        {date && time && (
          <span className="text-[9px] text-[#969b94]">
            {suitableTables.length} available
          </span>
        )}
      </div>

      {!date || !time ? (
        <div className="mt-3 rounded-lg border border-dashed border-[#dfe2da] bg-white px-3 py-4 text-center">
          <p className="text-[10px] text-[#858b84]">
            Select a date and time to see available tables.
          </p>
        </div>
      ) : suitableTables.length === 0 ? (
        <div className="mt-3 rounded-lg border border-dashed border-[#dfe2da] bg-white px-3 py-4 text-center">
          <p className="text-[10px] text-[#858b84]">
            No suitable tables are available for this number of guests.
          </p>
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-2 gap-2">

          {suitableTables.map((table) => {
            const isSelected = selectedTable === table.id;

            return (
              <button
                key={table.id}
                type="button"
                onClick={() => setSelectedTable(table.id)}
                className={`rounded-lg border p-3 text-left transition ${
                  isSelected
                    ? "border-[#68755f] bg-[#f3f5f0] shadow-sm"
                    : "border-[#dfe2da] bg-white hover:border-[#bfc6b9]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm text-[#20251f]">
                    Table {table.number}
                  </span>

                  {isSelected && (
                    <span className="text-[10px] text-[#68755f]">
                      ✓
                    </span>
                  )}
                </div>

                <p className="mt-1 text-[9px] text-[#858b84]">
                  {table.capacity} seats · {table.position}
                </p>
              </button>
            );
          })}

        </div>
      )}
    </div>

    {/* Summary */}
    {selectedTable && (
      <div className="mt-4 rounded-lg bg-white p-3 ring-1 ring-[#e8e9e4]">

        <p className="text-[9px] font-semibold uppercase tracking-wider text-[#969b94]">
          Reservation summary
        </p>

        <div className="mt-2 space-y-1.5">

          <div className="flex justify-between text-[10px]">
            <span className="text-[#858b84]">Date</span>
            <span className="font-medium text-[#30362f]">{date}</span>
          </div>

          <div className="flex justify-between text-[10px]">
            <span className="text-[#858b84]">Time</span>
            <span className="font-medium text-[#30362f]">{time}</span>
          </div>

          <div className="flex justify-between text-[10px]">
            <span className="text-[#858b84]">Guests</span>
            <span className="font-medium text-[#30362f]">{guests}</span>
          </div>

          <div className="flex justify-between text-[10px]">
            <span className="text-[#858b84]">Table</span>
            <span className="font-medium text-[#30362f]">
              {
                tables.find(
                  (table) => table.id === selectedTable
                )?.number
              }
            </span>
          </div>

        </div>
      </div>
    )}

    {/* Button */}
    <button
      type="button"
      onClick={handleReservation}
      className="mt-4 w-full rounded-full bg-[#68755f] py-2.5 text-xs font-semibold text-white transition hover:bg-[#56634e]"
    >
      Continue to booking
    </button>

    <p className="mt-2 text-center text-[9px] leading-3 text-[#969b94]">
      You will be able to review your reservation before confirming.
    </p>

  </div>
</aside>

        </div>

      </main>

      
    </main>
  );
};

export default RestaurantDetails;
