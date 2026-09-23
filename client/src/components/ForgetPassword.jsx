
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      // Add your forgot-password API call here
      // await forgotPassword(email);

      setMessage("If an account exists with this email, you will receive a password reset link.");
    } catch (err) {
      setError(err.message || "Unable to send reset link");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8f5] px-4 py-8 text-[#1d211d]">

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-sm items-center justify-center">

        <div className=" w-full overflow-hidden rounded-2xl border border-[#e5e7e1] bg-white shadow-sm">

          {/* Image */}
         

          {/* Form */}
          <div className="flex items-center px-6 py-8 sm:px-9 justify-center">

            <div >

              {/* Logo */}
              <Link
                to="/"
                className="font-serif text-2xl tracking-tight text-[#1d211d]"
              >
                BookMy<span className="text-[#68755f]">Table</span>
              </Link>

              <div className="mt-7">

                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#68755f]">
                  Account recovery
                </span>

                <h2 className="mt-2 font-serif text-3xl text-[#20251f]">
                  Forgot password?
                </h2>

                <p className="mt-2 text-xs leading-relaxed text-[#777d76]">
                  Enter your email address and we'll send you a link to reset
                  your password.
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

                {/* Success */}
                {message && (
                  <div className="rounded-xl border border-[#dce3d8] bg-[#f3f6f1] p-2.5 text-xs text-[#68755f]">
                    {message}
                  </div>
                )}

                {/* Email */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                  className="w-full rounded-xl border border-[#e5e7e1] bg-[#fafbf9] px-3.5 py-3 text-xs text-[#1d211d] outline-none transition placeholder:text-[#9a9e98] focus:border-[#68755f] focus:bg-white"
                />

                {/* Button */}
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#68755f] py-3 text-xs font-semibold text-white transition hover:bg-[#56634e]"
                >
                  Send Reset Link
                </button>

              </form>

              {/* Back to Login */}
              <p className="mt-5 text-center text-xs text-[#777d76]">
                Remember your password?{" "}
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
};

export default ForgotPassword;

