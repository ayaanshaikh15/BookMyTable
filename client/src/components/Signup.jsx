
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

const Signup = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { setUser,loading,setLoading } = useContext(AuthContext);
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
    setLoading(true);
    const data = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      }),
    });

    const result = await data.json();

    if (!data.ok) {
      throw new Error(result.message || "Signup failed");
    }

    if (result.user) {
      setUser(result.user);

      if (result.user.role === "owner") {
        navigate("/owner/dashboard");
      } else if (result.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } else {
      setLoading(false);
      setError(result.message || "Signup failed");
    }
    setLoading(false);
  } catch (err) {
    setLoading(false);
    setError(err.message || "Signup failed");
  }finally{
    setLoading(false);
  }
};

if(loading){
  return (
    <Loader/>
  )
}
else{
  return (
    <div className="min-h-screen bg-[#f7f8f5] px-4 py-8 text-[#1d211d]">

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-2xl border border-[#e5e7e1] bg-white shadow-sm lg:grid-cols-2">

          {/* Image */}
          <div className="relative hidden min-h-[500px] lg:block">

            <img
              src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=85"
              alt="Dining"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/35" />

            <div className="absolute bottom-8 left-8 right-8 text-white">

              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/80">
                Discover more
              </span>

              <h1 className="mt-3 font-serif text-3xl leading-tight">
                Make every table
                <br />
                worth remembering.
              </h1>

            </div>
          </div>

          {/* Form */}
          <div className="flex items-center px-6 py-8 sm:px-9">

            <div className="w-full">

              {/* Logo */}
              <Link
                to="/"
                className="font-serif text-2xl tracking-tight text-[#1d211d]"
              >
                BookMy<span className="text-[#68755f]">Table</span>
              </Link>

              <div className="mt-7">

                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#68755f]">
                  Join us
                </span>

                <h2 className="mt-2 font-serif text-3xl text-[#20251f]">
                  Create account
                </h2>

                <p className="mt-2 text-xs leading-relaxed text-[#777d76]">
                  Find restaurants and reserve your perfect table.
                </p>

              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-3"
              >

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-600">
                    {error}
                  </div>
                )}

                {/* Name */}
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Full name"
                  className="w-full rounded-xl border border-[#e5e7e1] bg-[#fafbf9] px-3.5 py-3 text-xs text-[#1d211d] outline-none transition placeholder:text-[#9a9e98] focus:border-[#68755f] focus:bg-white"
                />

                {/* Email */}
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Email address"
                  className="w-full rounded-xl border border-[#e5e7e1] bg-[#fafbf9] px-3.5 py-3 text-xs text-[#1d211d] outline-none transition placeholder:text-[#9a9e98] focus:border-[#68755f] focus:bg-white"
                />

                {/* Password */}
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full rounded-xl border border-[#e5e7e1] bg-[#fafbf9] px-3.5 py-3 text-xs text-[#1d211d] outline-none transition placeholder:text-[#9a9e98] focus:border-[#68755f] focus:bg-white"
                />

                {/* Role */}
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#e5e7e1] bg-[#fafbf9] px-3.5 py-3 text-xs text-[#555b54] outline-none transition focus:border-[#68755f] focus:bg-white"
                >
                  <option value="customer">Customer</option>
                  <option value="owner">Restaurant Owner</option>
                </select>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#68755f] py-3 text-xs font-semibold text-white transition hover:bg-[#56634e]"
                >
                  Create Account
                </button>

              </form>

              <p className="mt-5 text-center text-xs text-[#777d76]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#68755f] hover:text-[#56634e]"
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
}
};

export default Signup;

