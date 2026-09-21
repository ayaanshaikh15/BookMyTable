import { useMemo, useState } from "react";

const OwnerTables = () => {
  const [tables, setTables] = useState([
    {
      id: 1,
      name: "Table 01",
      capacity: 2,
      location: "Indoor",
      status: "Available",
    },
    {
      id: 2,
      name: "Table 02",
      capacity: 2,
      location: "Indoor",
      status: "Available",
    },
    {
      id: 3,
      name: "Table 03",
      capacity: 4,
      location: "Indoor",
      status: "Booked",
    },
    {
      id: 4,
      name: "Table 04",
      capacity: 4,
      location: "Indoor",
      status: "Available",
    },
    {
      id: 5,
      name: "Table 05",
      capacity: 6,
      location: "Indoor",
      status: "Booked",
    },
    {
      id: 6,
      name: "Table 06",
      capacity: 6,
      location: "Outdoor",
      status: "Available",
    },
    {
      id: 7,
      name: "Table 07",
      capacity: 8,
      location: "Outdoor",
      status: "Available",
    },
    {
      id: 8,
      name: "Table 08",
      capacity: 4,
      location: "Outdoor",
      status: "Maintenance",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [filter, setFilter] = useState("All");

  const [form, setForm] = useState({
    name: "",
    capacity: "2",
    location: "Indoor",
    status: "Available",
  });

  const filteredTables = useMemo(() => {
    if (filter === "All") return tables;
    return tables.filter((table) => table.status === filter);
  }, [tables, filter]);

  const stats = {
    total: tables.length,
    available: tables.filter((table) => table.status === "Available").length,
    booked: tables.filter((table) => table.status === "Booked").length,
    maintenance: tables.filter((table) => table.status === "Maintenance")
      .length,
  };

  const resetForm = () => {
    setForm({
      name: "",
      capacity: "2",
      location: "Indoor",
      status: "Available",
    });
    setEditingTable(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (table) => {
    setForm({
      name: table.name,
      capacity: String(table.capacity),
      location: table.location,
      status: table.status,
    });
    setEditingTable(table);
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTable) {
      setTables((prev) =>
        prev.map((table) =>
          table.id === editingTable.id
            ? {
                ...table,
                name: form.name,
                capacity: Number(form.capacity),
                location: form.location,
                status: form.status,
              }
            : table
        )
      );
    } else {
      const newTable = {
        id: Date.now(),
        name: form.name || `Table ${String(tables.length + 1).padStart(2, "0")}`,
        capacity: Number(form.capacity),
        location: form.location,
        status: form.status,
      };

      setTables((prev) => [...prev, newTable]);
    }

    setShowAddModal(false);
    resetForm();
  };

  const deleteTable = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this table?"
    );

    if (!confirmed) return;

    setTables((prev) => prev.filter((table) => table.id !== id));
  };

  const changeStatus = (id, status) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === id ? { ...table, status } : table
      )
    );
  };

  const getStatusStyle = (status) => {
    if (status === "Available") {
      return "bg-[#eef4eb] text-[#58704f] border-[#dce8d8]";
    }

    if (status === "Booked") {
      return "bg-[#f4f0e9] text-[#8a7050] border-[#e7ded0]";
    }

    return "bg-[#f5eeee] text-[#8a5d5d] border-[#eadcdc]";
  };

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-5 py-8 text-[#1d211d] lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium tracking-wide text-[#68755f]">
              Restaurant management
            </p>

            <h1 className="font-serif text-4xl tracking-tight text-[#20251f] sm:text-5xl">
              Tables
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#858b84]">
              Manage your restaurant tables, seating capacity, locations, and
              availability.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#68755f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#56634e]"
          >
            <span className="text-lg leading-none">+</span>
            Add table
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">Total tables</p>
            <p className="mt-2 font-serif text-3xl text-[#20251f]">
              {stats.total}
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">Available</p>
            <p className="mt-2 font-serif text-3xl text-[#58704f]">
              {stats.available}
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">Booked</p>
            <p className="mt-2 font-serif text-3xl text-[#8a7050]">
              {stats.booked}
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">Maintenance</p>
            <p className="mt-2 font-serif text-3xl text-[#8a5d5d]">
              {stats.maintenance}
            </p>
          </div>
        </div>

        {/* Table Management */}
        <section className="overflow-hidden rounded-2xl border border-[#e5e7e1] bg-white">

          {/* Section Header */}
          <div className="flex flex-col gap-4 border-b border-[#eceee9] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-2xl text-[#20251f]">
                Restaurant tables
              </h2>

              <p className="mt-1 text-sm text-[#858b84]">
                {filteredTables.length} table
                {filteredTables.length !== 1 ? "s" : ""} shown
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["All", "Available", "Booked", "Maintenance"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                    filter === item
                      ? "border-[#68755f] bg-[#68755f] text-white"
                      : "border-[#e1e4dd] bg-white text-[#777d76] hover:border-[#cbd0c7]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#eceee9] bg-[#fafbf9] text-left">
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Table
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Capacity
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Location
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredTables.map((table) => (
                  <tr
                    key={table.id}
                    className="border-b border-[#f0f1ed] last:border-0 hover:bg-[#fcfcfa]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1f3ed] font-serif text-sm text-[#68755f]">
                          {table.name.replace("Table ", "")}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-[#30362f]">
                            {table.name}
                          </p>

                          <p className="mt-0.5 text-xs text-[#969b94]">
                            Seating table
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="text-sm text-[#555b54]">
                        {table.capacity}{" "}
                        {table.capacity === 1 ? "guest" : "guests"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span className="text-sm text-[#555b54]">
                        {table.location}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <select
                        value={table.status}
                        onChange={(e) =>
                          changeStatus(table.id, e.target.value)
                        }
                        className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium outline-none ${getStatusStyle(
                          table.status
                        )}`}
                      >
                        <option>Available</option>
                        <option>Booked</option>
                        <option>Maintenance</option>
                      </select>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(table)}
                          className="rounded-full border border-[#e1e4dd] px-4 py-2 text-xs font-medium text-[#68755f] transition hover:border-[#68755f] hover:bg-[#f7f8f5]"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteTable(table.id)}
                          className="rounded-full border border-[#eadcdc] px-4 py-2 text-xs font-medium text-[#8a5d5d] transition hover:bg-[#faf3f3]"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-[#eceee9] md:hidden">
            {filteredTables.map((table) => (
              <div key={table.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f1f3ed] font-serif text-sm text-[#68755f]">
                      {table.name.replace("Table ", "")}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-[#30362f]">
                        {table.name}
                      </p>

                      <p className="mt-1 text-xs text-[#969b94]">
                        {table.capacity} guests · {table.location}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-medium ${getStatusStyle(
                      table.status
                    )}`}
                  >
                    {table.status}
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => openEditModal(table)}
                    className="flex-1 rounded-full border border-[#e1e4dd] py-2.5 text-xs font-medium text-[#68755f]"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTable(table.id)}
                    className="flex-1 rounded-full border border-[#eadcdc] py-2.5 text-xs font-medium text-[#8a5d5d]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTables.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f3ed] text-2xl text-[#68755f]">
                —
              </div>

              <h3 className="mt-4 font-serif text-xl text-[#30362f]">
                No tables found
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#858b84]">
                There are no tables matching the selected status.
              </p>
            </div>
          )}
        </section>

        {/* Seating Overview */}
        <section className="mt-6 rounded-2xl border border-[#e5e7e1] bg-white p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#68755f]">
                Seating overview
              </p>

              <h2 className="mt-1 font-serif text-2xl text-[#20251f]">
                Capacity at a glance
              </h2>
            </div>

            <p className="text-sm text-[#858b84]">
              {tables.reduce((sum, table) => sum + table.capacity, 0)} total
              seats
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[2, 4, 6].map((capacity) => {
              const count = tables.filter(
                (table) => table.capacity === capacity
              ).length;

              return (
                <div
                  key={capacity}
                  className="rounded-xl border border-[#eceee9] bg-[#fafbf9] p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#777d76]">
                      {capacity}-person tables
                    </span>

                    <span className="font-serif text-xl text-[#30362f]">
                      {count}
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e8ebe4]">
                    <div
                      className="h-full rounded-full bg-[#68755f]"
                      style={{
                        width: `${
                          tables.length
                            ? Math.min((count / tables.length) * 100, 100)
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d211d]/35 px-5 py-6 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-[#e5e7e1] bg-white p-6 shadow-2xl sm:p-8">

            <div className="mb-6 flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#68755f]">
                  {editingTable ? "Update table" : "New table"}
                </p>

                <h2 className="mt-1 font-serif text-3xl text-[#20251f]">
                  {editingTable ? "Edit table" : "Add a table"}
                </h2>

                <p className="mt-2 text-sm text-[#858b84]">
                  Set the seating details for this table.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e1e4dd] text-[#777d76] transition hover:bg-[#f7f8f5]"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#30362f]">
                  Table name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="e.g. Table 09"
                  className="w-full rounded-xl border border-[#dfe2da] bg-white px-4 py-3 text-sm text-[#30362f] outline-none transition placeholder:text-[#a1a59f] focus:border-[#68755f] focus:ring-2 focus:ring-[#68755f]/10"
                />
              </div>

              {/* Capacity */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#30362f]">
                  Seating capacity
                </label>

                <select
                  value={form.capacity}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      capacity: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-[#dfe2da] bg-white px-4 py-3 text-sm text-[#30362f] outline-none focus:border-[#68755f] focus:ring-2 focus:ring-[#68755f]/10"
                >
                  <option value="2">2 guests</option>
                  <option value="4">4 guests</option>
                  <option value="6">6 guests</option>
                  <option value="8">8 guests</option>
                  <option value="10">10 guests</option>
                  <option value="12">12 guests</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#30362f]">
                  Location
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {["Indoor", "Outdoor"].map((location) => (
                    <button
                      type="button"
                      key={location}
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          location,
                        }))
                      }
                      className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                        form.location === location
                          ? "border-[#68755f] bg-[#f1f3ed] text-[#68755f]"
                          : "border-[#dfe2da] text-[#777d76] hover:bg-[#fafbf9]"
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#30362f]">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-[#dfe2da] bg-white px-4 py-3 text-sm text-[#30362f] outline-none focus:border-[#68755f] focus:ring-2 focus:ring-[#68755f]/10"
                >
                  <option>Available</option>
                  <option>Booked</option>
                  <option>Maintenance</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="flex-1 rounded-full border border-[#dfe2da] px-5 py-3 text-sm font-medium text-[#68755f] transition hover:bg-[#f7f8f5]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-full bg-[#68755f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#56634e]"
                >
                  {editingTable ? "Save changes" : "Add table"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default OwnerTables;