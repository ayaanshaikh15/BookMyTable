import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await signup(form);

      if (user.role === "owner") {
        navigate("/owner/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Unable to create account");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0907] px-6 py-12 text-[#f1e3d2]">

      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-3xl border border-[#49372a] bg-[#130d0a] lg:grid-cols-2">

          {/* Image */}
          <div className="relative hidden min-h-[650px] lg:block">

            <img
              src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=85"
              alt="Dining"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/60" />

            <div className="absolute bottom-12 left-12 right-12">
              <span className="text-xs uppercase tracking-[0.3em] text-[#dda060]">
                Discover more
              </span>

              <h1 className="mt-4 font-serif text-5xl leading-tight">
                Make every table
                <br />
                worth remembering.
              </h1>
            </div>

          </div>

          {/* Form */}
          <div className="flex items-center px-7 py-12 sm:px-12">

            <div className="w-full">

              <Link
                to="/"
                className="font-serif text-3xl"
              >
                Table<span className="text-[#d99552]">ly</span>
              </Link>

              <div className="mt-12">
                <span className="text-xs uppercase tracking-[0.25em] text-[#c58a54]">
                  Join us
                </span>

                <h2 className="mt-3 font-serif text-4xl">
                  Create account
                </h2>

                <p className="mt-3 text-sm text-[#8f7c6c]">
                  Find restaurants and reserve your perfect table.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-4"
              >
                {error && (
                  <div className="rounded-xl border border-red-900/50 bg-red-950/30 p-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Full name"
                  className="w-full rounded-xl border border-[#49372a] bg-[#1a100c] px-4 py-3.5 text-sm outline-none focus:border-[#c88950]"
                />

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Email address"
                  className="w-full rounded-xl border border-[#49372a] bg-[#1a100c] px-4 py-3.5 text-sm outline-none focus:border-[#c88950]"
                />

                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full rounded-xl border border-[#49372a] bg-[#1a100c] px-4 py-3.5 text-sm outline-none focus:border-[#c88950]"
                />

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#49372a] bg-[#1a100c] px-4 py-3.5 text-sm text-[#d9c8b6] outline-none focus:border-[#c88950]"
                >
                  <option value="customer">Customer</option>
                  <option value="owner">Restaurant Owner</option>
                </select>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#e2a05d] py-3.5 text-sm font-semibold text-[#1c110b] transition hover:bg-[#f0b673]"
                >
                  Create Account
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-[#827061]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#d99a5a]"
                >
                  Sign in
                </Link>
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;