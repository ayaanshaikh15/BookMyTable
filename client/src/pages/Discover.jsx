import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Pizza,
  Fish,
  Croissant,
  Soup,
  Utensils,
  Salad,
} from "lucide-react";
const Discover = () => {
  const [searchData, setSearchData] = useState({
    location: "",
    date: "",
    guests: "2",
  });

  const [email, setEmail] = useState("");

 const categories = [
  {
    name: "Italian",
    icon: Pizza,
  },
  {
    name: "Sushi",
    icon: Fish,
  },
  {
    name: "French",
    icon: Croissant,
  },
  {
    name: "Indian",
    icon: Soup,
  },
  {
    name: "Mexican",
    icon: Utensils,
  },
  {
    name: "Vegetarian",
    icon: Salad,
  },
];

  const restaurants = [
    {
      id: "1",
      name: "The Olive Table",
      location: "Belagavi, Karnataka",
      cuisine: "Italian · Continental",
      rating: "4.8",
      reviews: "324 reviews",
      image:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "2",
      name: "Koi House",
      location: "Belagavi, Karnataka",
      cuisine: "Japanese · Sushi",
      rating: "4.7",
      reviews: "286 reviews",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "3",
      name: "Maison 21",
      location: "Belagavi, Karnataka",
      cuisine: "French · European",
      rating: "4.9",
      reviews: "412 reviews",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    console.log("Search:", searchData);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) return;

    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <main className="bg-white text-[#1d211d]">

      {/* =====================================================
          SECTION 1 — HERO
      ===================================================== */}

      <section className="relative min-h-screen overflow-hidden">

        {/* Background Image */}
        <img
          src="/assets/hero.jpg"
          alt="Restaurant interior"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45" />

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-screen items-center justify-center px-5 pt-20">

          <div className="w-full max-w-5xl text-center text-white">

            {/* Small heading */}
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-white/85 sm:text-sm">
              Discover · Reserve · Dine
            </p>

            {/* Main heading */}
            <h1 className="mx-auto max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-[#f7ead9] sm:text-5xl md:text-7xl"> Find your perfect
              <br />
              table.
            </h1>

           

            {/* Reservation Search */}
            <form
  onSubmit={handleSearch}
  className="mx-auto mt-6 w-full max-w-2xl rounded-2xl bg-white p-1 shadow-xl "
>
  <div className="flex flex-col sm:flex-row sm:items-center">

    {/* Location */}
    <div className="flex-1 px-4 py-2 sm:border-r sm:border-[#e7e7e2]">
      <p className="text-[9px] font-semibold uppercase tracking-wide text-[#8b9189]">
        Location
      </p>

      <input
        type="text"
        value={searchData.location}
        onChange={(e) =>
          setSearchData({
            ...searchData,
            location: e.target.value,
          })
        }
        placeholder="Where?"
        className="mt-0.5 w-full bg-transparent text-xs leading-none text-[#252a25] outline-none placeholder:text-[#a0a49f]"
      />
    </div>

    {/* Date */}
    <div className="flex-1 px-4 py-2 sm:border-r sm:border-[#e7e7e2]">
      <p className="text-[9px] font-semibold uppercase tracking-wide text-[#8b9189]">
        Date
      </p>

      <input
        type="date"
        value={searchData.date}
        onChange={(e) =>
          setSearchData({
            ...searchData,
            date: e.target.value,
          })
        }
        className="mt-0.5 w-full bg-transparent text-xs leading-none text-[#252a25] outline-none"
      />
    </div>

    {/* Guests */}
    <div className="flex-1 px-4 py-2 sm:border-r sm:border-[#e7e7e2]">
      <p className="text-[9px] font-semibold uppercase tracking-wide text-[#8b9189]">
        Guests
      </p>

      <select
        value={searchData.guests}
        onChange={(e) =>
          setSearchData({
            ...searchData,
            guests: e.target.value,
          })
        }
        className="mt-0.5 w-full bg-transparent text-xs leading-none text-[#252a25] outline-none"
      >
        <option value="1">1 Guest</option>
        <option value="2">2 Guests</option>
        <option value="3">3 Guests</option>
        <option value="4">4 Guests</option>
        <option value="5">5 Guests</option>
        <option value="6">6 Guests</option>
        <option value="7">7 Guests</option>
        <option value="8">8 Guests</option>
      </select>
    </div>

    {/* Button */}
    <button
      type="submit"
      className="m-1 shrink-0 rounded-full bg-[#68755f] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#56634e]"
    >
      Find a table
    </button>

  </div>
</form>

          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 2 — CATEGORIES
      ===================================================== */}

      <section className="px-5 py-20 sm:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#68755f]">
              Explore cuisines
            </p>

            <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#20251f] sm:text-4xl"> Something for every taste
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#777d76]">
              Explore restaurants by cuisine and discover
              your next favourite place.
            </p>

          </div>

          {/* Category Cards */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

            {/* {categories.map((category) => (
              <Link
                key={category.name}
                to="/restaurants"
                className="group flex min-h-[150px] flex-col items-center justify-center rounded-2xl border border-[#e7e8e3] bg-[#fafbf9] px-4 transition duration-300 hover:-translate-y-1 hover:border-[#cbd1c5] hover:bg-[#f3f5f0] hover:shadow-sm"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm ring-1 ring-[#e8e9e4] transition group-hover:scale-105">
                  {category.icon}
                </div>

                <h3 className="mt-5 text-sm font-medium text-[#292e28]">
                  {category.name}
                </h3>

                <span className="mt-1 text-[10px] text-[#92978f]">
                  Explore →
                </span>

              </Link>
            ))} */}
          {categories.map((category) => (
             <Link
                key={category.name}
                to="/restaurants"
                className="group flex min-h-[150px] flex-col items-center justify-center rounded-2xl border border-[#e7e8e3] bg-[#fafbf9] px-4 transition duration-300 hover:-translate-y-1 hover:border-[#cbd1c5] hover:bg-[#f3f5f0] hover:shadow-sm"
              >
  <div
    key={category.name}
    className="flex flex-col items-center gap-3"
  >
    <category.icon
      size={28}
      strokeWidth={1.5}
      className="text-[#b8bcb5]"
    />

    <span className="text-sm text-[#555b54]">
      {category.name}
    </span>
  </div>
  </Link>
))}
          </div>

        </div>
      </section>

      {/* =====================================================
          SECTION 3 — TRENDING RESTAURANTS
      ===================================================== */}

      <section className="bg-[#f7f8f5] px-5 py-20 sm:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="flex items-end justify-between gap-5">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#68755f]">
                Trending now
              </p>

              <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#20251f] sm:text-4xl"> Tables worth discovering
              </h2>
            </div>

            <Link
              to="/restaurants"
              className="hidden text-xs font-medium text-[#68755f] hover:underline sm:block"
            >
              View all restaurants →
            </Link>

          </div>

          {/* Exactly 3 restaurants */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {restaurants.map((restaurant) => (
              <article
                key={restaurant.id}
                className="group overflow-hidden rounded-2xl border border-[#e5e7e1] bg-white"
              >

                {/* Image */}
                <div className="relative h-64 overflow-hidden">

                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />

                  {/* Rating */}
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#252a24]">
                    ★ {restaurant.rating}
                  </div>

                </div>

                {/* Content */}
                <div className="p-5">

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <h3 className="font-serif text-2xl text-[#20251f]">
                        {restaurant.name}
                      </h3>

                      <p className="mt-1 text-xs text-[#858b84]">
                        {restaurant.location}
                      </p>
                    </div>

                    <span className="whitespace-nowrap text-[10px] text-[#858b84]">
                      {restaurant.reviews}
                    </span>

                  </div>

                  <p className="mt-4 text-xs text-[#687067]">
                    {restaurant.cuisine}
                  </p>

                  {/* Reservation */}
                  <div className="mt-5 border-t border-[#eceee9] pt-4">

                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-[#9a9f98]">
                      Quick reservation
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {[
                        "7:00 PM",
                        "7:30 PM",
                        "8:00 PM",
                        "8:30 PM",
                      ].map((time) => (
                        <Link
                          key={time}
                          to={`/restaurants/${restaurant.id}`}
                          className="rounded-full border border-[#dfe2da] px-3 py-2 text-[10px] text-[#555d53] transition hover:border-[#68755f] hover:bg-[#68755f] hover:text-white"
                        >
                          {time}
                        </Link>
                      ))}

                    </div>

                  </div>

                </div>

              </article>
            ))}

          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/restaurants"
              className="text-xs font-medium text-[#68755f]"
            >
              View all restaurants →
            </Link>
          </div>

        </div>
      </section>

      {/* =====================================================
          SECTION 4 — SUBSCRIPTION
      ===================================================== */}

      <section className="px-5 py-20 sm:py-24">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#68755f]">
            Stay in the know
          </p>

         <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#20251f] sm:text-4xl"> Get the latest from Tablely
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#777d76]">
            New restaurants, special dining experiences
            and more, delivered to your inbox.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-2 rounded-full border border-[#dfe2da] bg-[#fafbf9] p-1.5 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-3 text-sm text-[#252a24] outline-none placeholder:text-[#9da29b]"
            />

            <button
              type="submit"
              className="rounded-full bg-[#68755f] px-7 py-3 text-xs font-semibold text-white transition hover:bg-[#56634e]"
            >
              Subscribe
            </button>
          </form>

        </div>

      </section>

      {/* =====================================================
          SECTION 5 — FOOTER
      ===================================================== */}

     

    </main>
  );
};

export default Discover;