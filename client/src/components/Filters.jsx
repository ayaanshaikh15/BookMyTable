const Filters = ({ filters, setFilters }) => {
  return (
    <div className="mt-6 flex flex-wrap gap-3">

      <select
        value={filters.cuisine}
        onChange={(e) =>
          setFilters({
            ...filters,
            cuisine: e.target.value,
          })
        }
        className="rounded-full border border-[#dfe2da] bg-white px-4 py-2.5 text-xs text-[#555d53] outline-none"
      >
        <option value="">All cuisines</option>
        <option value="Italian">Italian</option>
        <option value="Japanese">Japanese</option>
        <option value="Indian">Indian</option>
        <option value="French">French</option>
        <option value="Mexican">Mexican</option>
        <option value="Vegetarian">Vegetarian</option>
      </select>

      <select
        value={filters.rating}
        onChange={(e) =>
          setFilters({
            ...filters,
            rating: e.target.value,
          })
        }
        className="rounded-full border border-[#dfe2da] bg-white px-4 py-2.5 text-xs text-[#555d53] outline-none"
      >
        <option value="">Any rating</option>
        <option value="4">4+ rating</option>
        <option value="4.5">4.5+ rating</option>
      </select>

      <button
        onClick={() =>
          setFilters({
            cuisine: "",
            rating: "",
          })
        }
        className="rounded-full border border-[#dfe2da] px-4 py-2.5 text-xs text-[#68755f] hover:bg-[#f7f8f5]"
      >
        Clear filters
      </button>

    </div>
  );
};

export default Filters;