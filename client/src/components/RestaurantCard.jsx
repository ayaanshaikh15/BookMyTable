import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e5e7e1] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <Link to={`/restaurants/${restaurant._id}`}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />

          <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#252a24]">
            ★ {restaurant.rating}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <h3 className="font-serif text-2xl text-[#20251f]">
          {restaurant.name}
        </h3>

        <p className="mt-1 text-xs text-[#858b84]">
          {restaurant.location}
        </p>

        <p className="mt-4 text-xs text-[#687067]">
          {restaurant.cuisine}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-[#eceee9] pt-4">
          <span className="text-[10px] text-[#858b84]">
            {restaurant.reviews} reviews
          </span>

          <Link
            to={`/restaurants/${restaurant._id}`}
            className="rounded-full bg-[#68755f] px-4 py-2 text-[10px] font-semibold text-white transition hover:bg-[#56634e]"
          >
            View restaurant
          </Link>
        </div>
      </div>
    </article>
  );
};

export default RestaurantCard;