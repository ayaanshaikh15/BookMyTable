const BookingForm = ({
  date,
  setDate,
  time,
  setTime,
  guests,
  setGuests,
  tables,
  selectedTable,
  setSelectedTable,
  onBook,
}) => {
  return (
    <div className="rounded-3xl border border-[#e5e7e1] bg-[#fafbf9] p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#68755f]">
        Reserve a table
      </p>

      <h2 className="mt-3 font-serif text-3xl text-[#20251f]">
        Plan your visit
      </h2>

      <div className="mt-7 space-y-5">

        <div>
          <label className="mb-2 block text-xs font-medium text-[#555d53]">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-[#dfe2da] bg-white px-4 py-3 text-sm outline-none focus:border-[#68755f]"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#555d53]">
            Time
          </label>

          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-xl border border-[#dfe2da] bg-white px-4 py-3 text-sm outline-none"
          >
            <option value="">Select time</option>
            <option value="19:00">7:00 PM</option>
            <option value="19:30">7:30 PM</option>
            <option value="20:00">8:00 PM</option>
            <option value="20:30">8:30 PM</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#555d53]">
            Guests
          </label>

          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full rounded-xl border border-[#dfe2da] bg-white px-4 py-3 text-sm outline-none"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>

      </div>

      <div className="mt-7">
        <p className="text-xs font-medium text-[#555d53]">
          Available tables
        </p>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {tables.map((table) => (
            <button
              key={table._id}
              type="button"
              onClick={() => setSelectedTable(table._id)}
              className={`rounded-xl border p-4 text-left transition ${
                selectedTable === table._id
                  ? "border-[#68755f] bg-[#f3f5f0]"
                  : "border-[#dfe2da] bg-white hover:border-[#bfc6b9]"
              }`}
            >
              <p className="text-sm font-medium">
                Table {table.tableNumber}
              </p>

              <p className="mt-1 text-[10px] text-[#858b84]">
                Seats {table.capacity}
              </p>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onBook}
        className="mt-7 w-full rounded-full bg-[#68755f] py-3.5 text-sm font-semibold text-white transition hover:bg-[#56634e]"
      >
        Reserve table
      </button>
    </div>
  );
};

export default BookingForm;