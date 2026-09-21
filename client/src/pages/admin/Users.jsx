import { useMemo, useState } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([
    {
      id: "USR-1001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "+91 98765 12001",
      role: "Customer",
      bookings: 12,
      joined: "12 Jan 2026",
      status: "Active",
    },
    {
      id: "USR-1002",
      name: "Aarav Mehta",
      email: "aarav@theolivetable.com",
      phone: "+91 98765 12002",
      role: "Restaurant Owner",
      restaurant: "The Olive Table",
      bookings: 428,
      joined: "15 Jan 2026",
      status: "Active",
    },
    {
      id: "USR-1003",
      name: "Priya Patil",
      email: "priya@gmail.com",
      phone: "+91 98765 12003",
      role: "Customer",
      bookings: 8,
      joined: "20 Feb 2026",
      status: "Active",
    },
    {
      id: "USR-1004",
      name: "Rohan Patil",
      email: "rohan@urbanfork.com",
      phone: "+91 98765 12004",
      role: "Restaurant Owner",
      restaurant: "Urban Fork",
      bookings: 391,
      joined: "22 Feb 2026",
      status: "Active",
    },
    {
      id: "USR-1005",
      name: "Aditya Kulkarni",
      email: "aditya@gmail.com",
      phone: "+91 98765 12005",
      role: "Customer",
      bookings: 15,
      joined: "04 Mar 2026",
      status: "Active",
    },
    {
      id: "USR-1006",
      name: "Meera Joshi",
      email: "meera@casaverde.com",
      phone: "+91 98765 12006",
      role: "Restaurant Owner",
      restaurant: "Casa Verde",
      bookings: 347,
      joined: "06 Mar 2026",
      status: "Active",
    },
    {
      id: "USR-1007",
      name: "Sneha Joshi",
      email: "sneha@gmail.com",
      phone: "+91 98765 12007",
      role: "Customer",
      bookings: 5,
      joined: "17 Apr 2026",
      status: "Active",
    },
    {
      id: "USR-1008",
      name: "Karan Desai",
      email: "karan@spiceroute.com",
      phone: "+91 98765 12008",
      role: "Restaurant Owner",
      restaurant: "Spice Route",
      bookings: 164,
      joined: "11 May 2026",
      status: "Suspended",
    },
    {
      id: "USR-1009",
      name: "Neha Kulkarni",
      email: "neha@gmail.com",
      phone: "+91 98765 12009",
      role: "Customer",
      bookings: 9,
      joined: "23 Jun 2026",
      status: "Active",
    },
    {
      id: "USR-1010",
      name: "Vikram Rao",
      email: "vikram@saffronhouse.com",
      phone: "+91 98765 12010",
      role: "Restaurant Owner",
      restaurant: "Saffron House",
      bookings: 312,
      joined: "24 Mar 2026",
      status: "Active",
    },
    {
      id: "USR-1011",
      name: "Ananya Kulkarni",
      email: "ananya@gmail.com",
      phone: "+91 98765 12011",
      role: "Customer",
      bookings: 3,
      joined: "08 Jul 2026",
      status: "Inactive",
    },
    {
      id: "USR-1012",
      name: "Arjun Shetty",
      email: "arjun@gmail.com",
      phone: "+91 98765 12012",
      role: "Customer",
      bookings: 7,
      joined: "18 Aug 2026",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);

  const stats = {
    total: users.length,
    customers: users.filter((user) => user.role === "Customer").length,
    owners: users.filter(
      (user) => user.role === "Restaurant Owner"
    ).length,
    active: users.filter((user) => user.status === "Active").length,
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.id.toLowerCase().includes(searchValue) ||
        (user.restaurant &&
          user.restaurant.toLowerCase().includes(searchValue));

      const matchesRole =
        roleFilter === "All" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const updateStatus = (id, status) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status } : user
      )
    );

    if (selectedUser?.id === id) {
      setSelectedUser((prev) => ({
        ...prev,
        status,
      }));
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "border-[#dce8d8] bg-[#eef4eb] text-[#58704f]";

      case "Inactive":
        return "border-[#e1e4dd] bg-[#f3f4f0] text-[#777d76]";

      case "Suspended":
        return "border-[#eadcdc] bg-[#f6eeee] text-[#8a5d5d]";

      default:
        return "border-[#e1e4dd] bg-[#f7f8f5] text-[#777d76]";
    }
  };

  const getRoleStyle = (role) => {
    if (role === "Restaurant Owner") {
      return "border-[#e7ded0] bg-[#f5f0e8] text-[#8a7050]";
    }

    return "border-[#dfe2da] bg-[#f3f4f0] text-[#68755f]";
  };

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-5 py-8 text-[#1d211d] lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium tracking-wide text-[#68755f]">
            Platform management
          </p>

          <h1 className="font-serif text-4xl tracking-tight text-[#20251f] sm:text-5xl">
            Users
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#858b84]">
            Manage customers and restaurant owners registered on Tablely.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">
              Total users
            </p>

            <p className="mt-2 font-serif text-3xl text-[#20251f]">
              {stats.total}
            </p>

            <p className="mt-4 text-xs text-[#68755f]">
              Registered accounts
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">
              Customers
            </p>

            <p className="mt-2 font-serif text-3xl text-[#20251f]">
              {stats.customers}
            </p>

            <p className="mt-4 text-xs text-[#68755f]">
              People booking tables
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">
              Restaurant owners
            </p>

            <p className="mt-2 font-serif text-3xl text-[#20251f]">
              {stats.owners}
            </p>

            <p className="mt-4 text-xs text-[#8a7050]">
              Restaurant accounts
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7e1] bg-white p-5">
            <p className="text-sm text-[#858b84]">
              Active users
            </p>

            <p className="mt-2 font-serif text-3xl text-[#58704f]">
              {stats.active}
            </p>

            <p className="mt-4 text-xs text-[#68755f]">
              Currently active
            </p>
          </div>
        </div>

        {/* Users Section */}
        <section className="overflow-hidden rounded-2xl border border-[#e5e7e1] bg-white">

          {/* Toolbar */}
          <div className="border-b border-[#eceee9] p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

              {/* Search */}
              <div className="relative w-full xl:max-w-md">
                <svg
                  className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#969b94]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users, email or restaurant..."
                  className="w-full rounded-full border border-[#dfe2da] bg-[#fafbf9] py-3 pl-11 pr-4 text-sm text-[#30362f] outline-none transition placeholder:text-[#a1a59f] focus:border-[#68755f] focus:bg-white"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col gap-2 sm:flex-row">

                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="rounded-full border border-[#dfe2da] bg-white px-5 py-2.5 text-sm text-[#555b54] outline-none focus:border-[#68755f]"
                >
                  <option value="All">All roles</option>
                  <option value="Customer">Customers</option>
                  <option value="Restaurant Owner">
                    Restaurant owners
                  </option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-full border border-[#dfe2da] bg-white px-5 py-2.5 text-sm text-[#555b54] outline-none focus:border-[#68755f]"
                >
                  <option value="All">All statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-[#858b84]">
                Showing{" "}
                <span className="font-medium text-[#555b54]">
                  {filteredUsers.length}
                </span>{" "}
                users
              </p>

              {(search ||
                roleFilter !== "All" ||
                statusFilter !== "All") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setRoleFilter("All");
                    setStatusFilter("All");
                  }}
                  className="text-xs font-medium text-[#68755f] hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#eceee9] bg-[#fafbf9] text-left">
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    User
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Role
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Restaurant
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Activity
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#969b94]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[#f0f1ed] last:border-0 hover:bg-[#fcfcfa]"
                  >
                    {/* User */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1f3ed] font-serif text-sm text-[#68755f]">
                          {user.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-[#30362f]">
                            {user.name}
                          </p>

                          <p className="mt-1 text-xs text-[#969b94]">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-medium ${getRoleStyle(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Restaurant */}
                    <td className="px-6 py-5">
                      {user.restaurant ? (
                        <p className="text-sm text-[#555b54]">
                          {user.restaurant}
                        </p>
                      ) : (
                        <span className="text-sm text-[#b0b4ae]">
                          —
                        </span>
                      )}
                    </td>

                    {/* Activity */}
                    <td className="px-6 py-5">
                      <p className="text-sm text-[#555b54]">
                        {user.bookings}
                      </p>

                      <p className="mt-1 text-xs text-[#969b94]">
                        {user.role === "Customer"
                          ? "bookings"
                          : "restaurant bookings"}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <select
                        value={user.status}
                        onChange={(e) =>
                          updateStatus(
                            user.id,
                            e.target.value
                          )
                        }
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium outline-none ${getStatusStyle(
                          user.status
                        )}`}
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Suspended</option>
                      </select>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="rounded-full border border-[#dfe2da] px-4 py-2 text-xs font-medium text-[#68755f] transition hover:border-[#68755f] hover:bg-[#f7f8f5]"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-[#eceee9] md:hidden">
            {filteredUsers.map((user) => (
              <div key={user.id} className="p-5">

                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1f3ed] font-serif text-sm text-[#68755f]">
                      {user.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#30362f]">
                        {user.name}
                      </p>

                      <p className="mt-1 truncate text-xs text-[#969b94]">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-medium ${getStatusStyle(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-medium ${getRoleStyle(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>

                  {user.restaurant && (
                    <span className="rounded-full border border-[#e1e4dd] bg-[#fafbf9] px-3 py-1.5 text-[11px] text-[#777d76]">
                      {user.restaurant}
                    </span>
                  )}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#969b94]">
                      Activity
                    </p>

                    <p className="mt-1 text-sm text-[#555b54]">
                      {user.bookings} bookings
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#969b94]">
                      Joined
                    </p>

                    <p className="mt-1 text-sm text-[#555b54]">
                      {user.joined}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedUser(user)}
                  className="mt-5 w-full rounded-full border border-[#dfe2da] py-2.5 text-xs font-medium text-[#68755f]"
                >
                  View user
                </button>
              </div>
            ))}
          </div>

          {/* Empty */}
          {filteredUsers.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f3ed] text-xl text-[#68755f]">
                —
              </div>

              <h3 className="mt-4 font-serif text-xl text-[#30362f]">
                No users found
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#858b84]">
                Try changing your search or filter settings.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d211d]/35 px-5 py-6 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-[#e5e7e1] bg-white p-6 shadow-2xl sm:p-8">

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f3ed] font-serif text-lg text-[#68755f]">
                  {selectedUser.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#68755f]">
                    User profile
                  </p>

                  <h2 className="mt-1 font-serif text-2xl text-[#20251f]">
                    {selectedUser.name}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e1e4dd] text-[#777d76] transition hover:bg-[#f7f8f5]"
              >
                ×
              </button>
            </div>

            {/* Details */}
            <div className="mt-7 space-y-3">

              <div className="rounded-2xl bg-[#fafbf9] p-4">
                <p className="text-xs text-[#969b94]">
                  User ID
                </p>

                <p className="mt-1 text-sm font-medium text-[#30362f]">
                  {selectedUser.id}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#eceee9] p-4">
                  <p className="text-xs text-[#969b94]">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm text-[#555b54]">
                    {selectedUser.email}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#eceee9] p-4">
                  <p className="text-xs text-[#969b94]">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-[#555b54]">
                    {selectedUser.phone}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#eceee9] p-4">
                  <p className="text-xs text-[#969b94]">
                    Role
                  </p>

                  <p className="mt-1 text-sm text-[#555b54]">
                    {selectedUser.role}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#eceee9] p-4">
                  <p className="text-xs text-[#969b94]">
                    Joined
                  </p>

                  <p className="mt-1 text-sm text-[#555b54]">
                    {selectedUser.joined}
                  </p>
                </div>
              </div>

              {selectedUser.restaurant && (
                <div className="rounded-2xl border border-[#eceee9] p-4">
                  <p className="text-xs text-[#969b94]">
                    Restaurant
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#30362f]">
                    {selectedUser.restaurant}
                  </p>
                </div>
              )}

              <div className="rounded-2xl border border-[#eceee9] p-4">
                <p className="text-xs text-[#969b94]">
                  Booking activity
                </p>

                <p className="mt-1 font-serif text-2xl text-[#20251f]">
                  {selectedUser.bookings}
                </p>

                <p className="mt-1 text-xs text-[#858b84]">
                  {selectedUser.role === "Customer"
                    ? "Reservations made by this customer"
                    : "Reservations received by this restaurant"}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-[#30362f]">
                Account status
              </p>

              <select
                value={selectedUser.status}
                onChange={(e) =>
                  updateStatus(
                    selectedUser.id,
                    e.target.value
                  )
                }
                className={`w-full rounded-xl border px-4 py-3 text-sm font-medium outline-none ${getStatusStyle(
                  selectedUser.status
                )}`}
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Suspended</option>
              </select>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-6 w-full rounded-full bg-[#68755f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#56634e]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminUsers;