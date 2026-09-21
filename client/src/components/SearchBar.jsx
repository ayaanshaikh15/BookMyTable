const SearchBar = ({ searchData, setSearchData, onSearch }) => {
  return (
    <form
      onSubmit={onSearch}
      className="mt-10 rounded-2xl border border-[#e5e7e1] bg-white p-2 shadow-sm sm:rounded-full"
    >
      <div className="grid gap-1 sm:grid-cols-4">

        <input
          type="text"
          placeholder="Where?"
          value={searchData.location}
          onChange={(e) =>
            setSearchData({
              ...searchData,
              location: e.target.value,
            })
          }
          className="rounded-full px-5 py-3 text-sm outline-none placeholder:text-[#9da29b]"
        />

        <input
          type="date"
          value={searchData.date}
          onChange={(e) =>
            setSearchData({
              ...searchData,
              date: e.target.value,
            })
          }
          className="rounded-full px-5 py-3 text-sm outline-none"
        />

        <select
          value={searchData.guests}
          onChange={(e) =>
            setSearchData({
              ...searchData,
              guests: e.target.value,
            })
          }
          className="rounded-full px-5 py-3 text-sm outline-none"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
            <option key={number} value={number}>
              {number} {number === 1 ? "Guest" : "Guests"}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="rounded-full bg-[#68755f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#56634e]"
        >
          Search
        </button>

      </div>
    </form>
  );
};

export default SearchBar;