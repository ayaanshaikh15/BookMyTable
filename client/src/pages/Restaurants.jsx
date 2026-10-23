
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Restaurants = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [search, setSearch] = useState({
    location: "",
    cuisine: "",
    guests: "2",
  });
  const [restaurants, setrestaurants] = useState([]);
  const [sortBy, setSortBy] = useState("recommended");

  const [filters, setFilters] = useState({
    cuisine: "",
    rating: "",
    price: "",
  });

 useEffect(() => {
  const fetchFeaturedRestaurants = async () => {
    try {
      const response = await fetch(`${API_URL}/restaurants`);
      const res = await response.json();

      if (!response.ok) {
        throw new Error(
          res.message || "Failed to fetch the featured restaurants"
        );
      }

      setrestaurants(res);
    } catch (e) {
      console.error("Failed to fetch featured restaurants:", e);
    }
  };

  fetchFeaturedRestaurants();
}, []);

  const cuisines = [
    "Italian",
    "Japanese",
    "French",
    "Indian",
    "Mexican",
    "Vegetarian",
  ];

  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants];

    if (search.location.trim()) {
      const location = search.location.toLowerCase();

      result = result.filter((restaurant) =>
        restaurant.location.toLowerCase().includes(location)
      );
    }

    if (search.cuisine) {
      result = result.filter((restaurant) =>
        restaurant.cuisine
          .toLowerCase()
          .includes(search.cuisine.toLowerCase())
      );
    }

    if (filters.cuisine) {
      result = result.filter((restaurant) =>
        restaurant.cuisine
          .toLowerCase()
          .includes(filters.cuisine.toLowerCase())
      );
    }

    if (filters.rating) {
      result = result.filter(
        (restaurant) => restaurant.rating >= Number(filters.rating)
      );
    }

    if (filters.priceRange) {
      result = result.filter(
        (restaurant) => restaurant.priceRange === filters.priceRange
      );
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "reviews") {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [search, filters, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();

    setFilters({
      cuisine: search.cuisine,
      rating: "",
      priceRange: "",
    });
  };

  const clearFilters = () => {
    setSearch({
      location: "",
      cuisine: "",
      guests: "2",
    });

    setFilters({
      cuisine: "",
      rating: "",
      priceRange: "",
    });

    setSortBy("recommended");
  };

  return (
    <main className="min-h-screen bg-white text-[#1d211d]">

   

      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 lg:px-10 ">

        {/* Page Heading */}

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#68755f]">
            Discover
          </p>

          <h1 className="mt-3 font-serif text-4xl tracking-tight text-[#20251f] sm:text-5xl">
            Find your next table
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#777d76]">
            Explore restaurants, discover new flavours and find
            the perfect place for your next dining experience.
          </p>
        </div>

        {/* =====================================================
            SEARCH
        ===================================================== */}

        <form
          onSubmit={handleSearch}
          className="mt-10 rounded-2xl border border-[#e5e7e1] bg-white p-2 shadow-sm sm:rounded-full"
        >
          <div className="grid items-center gap-1 sm:grid-cols-4">

            {/* Location */}

            <div className="flex items-center gap-3 px-5 py-3 text-left sm:border-r sm:border-[#e7e7e2]">

              <svg
                className="h-5 w-5 shrink-0 text-[#68755f]"
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

              <div className="min-w-0 flex-1">

                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8b9189]">
                  Location
                </p>

                <input
                  type="text"
                  value={search.location}
                  onChange={(e) =>
                    setSearch({
                      ...search,
                      location: e.target.value,
                    })
                  }
                  placeholder="Where?"
                  className="mt-0.5 w-full bg-transparent text-sm text-[#252a25] outline-none placeholder:text-[#a0a49f]"
                />

              </div>

            </div>

            {/* Cuisine */}

            <div className="flex items-center gap-3 px-5 py-3 text-left sm:border-r sm:border-[#e7e7e2]">

              <svg
                className="h-5 w-5 shrink-0 text-[#68755f]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                  d="M7 3v8M4.5 3v5a2.5 2.5 0 005 0V3M7 11v10M17 3v18M14.5 8.5c0-3 1.1-5.5 2.5-5.5s2.5 2.5 2.5 5.5-1.1 5.5-2.5 5.5"
                />
              </svg>

              <div className="min-w-0 flex-1">

                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8b9189]">
                  Cuisine
                </p>

                <select
                  value={search.cuisine}
                  onChange={(e) =>
                    setSearch({
                      ...search,
                      cuisine: e.target.value,
                    })
                  }
                  className="mt-0.5 w-full bg-transparent text-sm text-[#252a25] outline-none"
                >
                  <option value="">Any cuisine</option>

                  {cuisines.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>

              </div>

            </div>

            {/* Guests */}

            <div className="flex items-center gap-3 px-5 py-3 text-left sm:border-r sm:border-[#e7e7e2]">

              <svg
                className="h-5 w-5 shrink-0 text-[#68755f]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="9"
                  cy="8"
                  r="3"
                  strokeWidth="1.7"
                />

                <path
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  d="M3 20c.4-3.3 2.4-5 6-5s5.6 1.7 6 5"
                />

                <path
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  d="M15 5.5a3 3 0 010 5.5M17 15c2.4.4 3.7 2 4 5"
                />
              </svg>

              <div className="min-w-0 flex-1">

                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8b9189]">
                  Guests
                </p>

                <select
                  value={search.guests}
                  onChange={(e) =>
                    setSearch({
                      ...search,
                      guests: e.target.value,
                    })
                  }
                  className="mt-0.5 w-full bg-transparent text-sm text-[#252a25] outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                    <option key={number} value={number}>
                      {number}{" "}
                      {number === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>

              </div>

            </div>

            {/* Search Button */}

            <button
              type="submit"
              className="rounded-full bg-[#68755f] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#56634e]"
            >
              Search restaurants
            </button>

          </div>
        </form>

        {/* =====================================================
            FILTER BAR
        ===================================================== */}

        <div className="mt-8 flex flex-col justify-between gap-4 border-b border-[#e5e7e1] pb-6 sm:flex-row sm:items-center">

          <div className="flex flex-wrap gap-2">

            {/* Cuisine */}

            <select
              value={filters.cuisine}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  cuisine: e.target.value,
                })
              }
              className="rounded-full border border-[#dfe2da] bg-white px-4 py-2.5 text-xs text-[#555d53] outline-none transition hover:border-[#bfc6b9]"
            >
              <option value="">Cuisine</option>

              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>

            {/* Rating */}

            <select
              value={filters.rating}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  rating: e.target.value,
                })
              }
              className="rounded-full border border-[#dfe2da] bg-white px-4 py-2.5 text-xs text-[#555d53] outline-none transition hover:border-[#bfc6b9]"
            >
              <option value="">Rating</option>
              <option value="4">4+ rating</option>
              <option value="4.5">4.5+ rating</option>
              <option value="4.8">4.8+ rating</option>
            </select>

            {/* Price */}

            <select
              value={filters.price}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  price: e.target.value,
                })
              }
              className="rounded-full border border-[#dfe2da] bg-white px-4 py-2.5 text-xs text-[#555d53] outline-none transition hover:border-[#bfc6b9]"
            >
              <option value="">Price</option>
              <option value="₹₹">₹₹</option>
              <option value="₹₹₹">₹₹₹</option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full border border-[#dfe2da] px-4 py-2.5 text-xs text-[#68755f] transition hover:bg-[#f7f8f5]"
            >
              Clear filters
            </button>

          </div>

          {/* Sort */}

          <div className="flex items-center gap-2">

            <span className="text-[10px] uppercase tracking-wider text-[#969b94]">
              Sort
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-[#dfe2da] bg-white px-4 py-2.5 text-xs text-[#555d53] outline-none"
            >
              <option value="recommended">
                Recommended
              </option>

              <option value="rating">
                Highest rated
              </option>

              <option value="reviews">
                Most reviewed
              </option>
            </select>

          </div>

        </div>

        {/* =====================================================
            RESULTS HEADER
        ===================================================== */}

        <div className="mt-10 flex items-end justify-between">

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#68755f]">
              Restaurants
            </p>

            <h2 className="mt-2 font-serif text-3xl text-[#20251f] sm:text-4xl">
              Places to discover
            </h2>
          </div>

          <p className="hidden text-xs text-[#858b84] sm:block">
            {filteredRestaurants.length}{" "}
            {filteredRestaurants.length === 1
              ? "restaurant"
              : "restaurants"}
          </p>

        </div>

        {/* =====================================================
            RESTAURANT GRID
        ===================================================== */}

        {filteredRestaurants.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {filteredRestaurants.map((restaurant) => (
              <article
                key={restaurant._id}
                className="group overflow-hidden rounded-2xl border border-[#e5e7e1] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Image */}

                <Link to={`/restaurants/${restaurant._id}`}>
                  <div className="relative h-64 overflow-hidden">

                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#252a24]">
                      ★ {restaurant.rating}
                    </div>

                    <div className="absolute right-4 top-4 rounded-full bg-black/35 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm">
                      {restaurant.price}
                    </div>

                  </div>
                </Link>

                {/* Content */}

                <div className="p-5">

                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                      <h3 className="font-serif text-2xl text-[#20251f]">
                        {restaurant.name}
                      </h3>

                      <p className="mt-1 text-xs text-[#858b84]">
                        {restaurant.location}
                      </p>

                    </div>

                    <span className="whitespace-nowrap text-[10px] text-[#858b84]">
                      {restaurant.reviewCount} reviews
                    </span>

                  </div>

                  <p className="mt-4 text-xs font-medium text-[#687067]">
                    {restaurant.cuisine}
                  </p>

                  <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#858b84]">
                    {restaurant.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#eceee9] pt-4">

                    <span className="text-[10px] text-[#969b94]">
                      Tables available
                    </span>

                    <Link
                      to={`/restaurants/${restaurant._id}`}
                      className="rounded-full bg-[#68755f] px-4 py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#56634e]"
                    >
                      Reserve table
                    </Link>

                  </div>

                </div>

              </article>
            ))}

          </div>
        ) : (
          /* =====================================================
             EMPTY STATE
          ===================================================== */

          <div className="mt-10 rounded-3xl border border-dashed border-[#dfe2da] bg-[#fafbf9] px-6 py-20 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl shadow-sm ring-1 ring-[#e8e9e4]">
              ◌
            </div>

            <h3 className="mt-5 font-serif text-2xl text-[#20251f]">
              No restaurants found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#858b84]">
              Try changing your search or removing some filters
              to discover more restaurants.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-full bg-[#68755f] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#56634e]"
            >
              Clear all filters
            </button>

          </div>
        )}

      </section>

    

    </main>
  );
};

export default Restaurants;

