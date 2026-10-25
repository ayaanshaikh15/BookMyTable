import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Pizza,
  Fish,
  Croissant,
  Soup,
  Utensils,
  Salad,

} from "lucide-react";
import RestaurantCard from "../components/RestaurantCard";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Discover = () => {
  const [searchData, setSearchData] = useState({
  location: "",
  cuisine: "",
  guests: "2",
});
  const [loading, setloading] = useState(false);
  const [restaurants, setrestaurants] = useState([])
  const [email, setEmail] = useState("");
   const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
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



  useEffect(() => {
  const fetchFeaturedRestaurants = async () => {

    try {
      setloading(true)
      const response = await fetch(`${API_URL}/restaurants/featured`);
      const res = await response.json();

      if (!response.ok) {
        throw new Error(
          res.message || "Failed to fetch the featured restaurants"
        );
      }

      setrestaurants(res);
    } catch (e) {
      console.error("Failed to fetch featured restaurants:", e);
    }finally{
      setloading(false)
    }
  };

  fetchFeaturedRestaurants();
}, []);

  const handleSearch = (e) => {
    e.preventDefault();
     
    navigate("/restaurants", {
  state: searchData,
});
  };

const handleCategory=(categoryName)=>{
  const updateSearchData = {
    ...searchData,
    cuisine:categoryName
  }
  navigate("/restaurants", {
  state:updateSearchData,
});
}
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
  className="mx-auto mt-6 w-full max-w-2xl rounded-2xl bg-white p-1 shadow-xl"
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

    {/* Cuisine */}
    <div className="flex-1 px-4 py-2 sm:border-r sm:border-[#e7e7e2]">
      <p className="text-[9px] font-semibold uppercase tracking-wide text-[#8b9189]">
        Cuisine
      </p>

      <select
        value={searchData.cuisine}
        onChange={(e) =>
          setSearchData({
            ...searchData,
            cuisine: e.target.value,
          })
        }
        className="mt-0.5 w-full bg-transparent text-xs leading-none text-[#252a25] outline-none"
      >
        <option value="">All cuisines</option>

        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
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
        {[1, 2, 3, 4, 5, 6, 7, 8].map((guest) => (
          <option key={guest} value={String(guest)}>
            {guest} {guest === 1 ? "Guest" : "Guests"}
          </option>
        ))}
      </select>
    </div>

    {/* Submit Button */}
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
                className="group flex min-h-[150px] flex-col items-center justify-center rounded-2xl
                 border border-[#e7e8e3] bg-[#fafbf9] 
                 px-4 transition duration-300 hover:-translate-y-1 
                 hover:border-[#cbd1c5] hover:bg-[#f3f5f0] hover:shadow-sm"
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
             <div
                key={category.name}
                onClick={()=>handleCategory(category.name)}
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
  </div>
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


          {loading ? <>
          <div className="relative h-64 mt-30 overflow-hidden">
            <Loader/>
          </div>
          
          </>:
          
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}

          </div>
}

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
      A little more to savour
    </p>

    <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#20251f] sm:text-4xl">
      Good food. Great places. Unforgettable moments.
    </h2>

    <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#777d76]">
      Discover hidden gems, explore exceptional restaurants, and find your next favourite table. Your next memorable dining experience starts here.
    </p>
  </div>
</section>

      {/* =====================================================
          SECTION 5 — FOOTER
      ===================================================== */}

     

    </main>
  );
};

export default Discover;