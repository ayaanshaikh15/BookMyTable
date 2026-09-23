
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
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
      const user = await login(form);

      if (user.role === "owner") {
        navigate("/owner/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8f5] px-4 py-8 text-[#1d211d]">

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-2xl border border-[#e5e7e1] bg-white shadow-sm lg:grid-cols-2">

          {/* Image */}
          <div className="relative hidden min-h-[500px] lg:block">

            <img
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=85"
              alt="Restaurant dining"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/35" />

            <div className="absolute bottom-8 left-8 right-8 text-white">

              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/80">
                Welcome back
              </span>

              <h1 className="mt-3 font-serif text-3xl leading-tight">
                Your next
                <br />
                table awaits.
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
                  Welcome back
                </span>

                <h2 className="mt-2 font-serif text-3xl text-[#20251f]">
                  Sign in
                </h2>

                <p className="mt-2 text-xs leading-relaxed text-[#777d76]">
                  Sign in to manage your reservations and discover new places.
                </p>

              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-3"
              >

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-600">
                    {error}
                  </div>
                )}

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

                {/* Forgot password */}
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-[11px] font-medium text-[#68755f] hover:text-[#56634e]"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#68755f] py-3 text-xs font-semibold text-white transition hover:bg-[#56634e]"
                >
                  Sign In
                </button>

              </form>

              <p className="mt-5 text-center text-xs text-[#777d76]">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-[#68755f] hover:text-[#56634e]"
                >
                  Create account
                </Link>
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;

