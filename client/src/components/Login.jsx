import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await login(email, password);

      if (user.role === "owner") {
        navigate("/owner/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8f5] px-5 py-10">
  <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
    <div className="w-full rounded-3xl border border-[#e5e7e1] bg-white p-8 shadow-sm">

      <div className="text-center">
        <Link
          to="/"
          className="font-serif text-3xl text-[#20251f]"
        >
          Table<span className="text-[#68755f]">ly</span>
        </Link>

        <h1 className="mt-8 font-serif text-4xl">
          Welcome back
        </h1>

        <p className="mt-3 text-sm text-[#777d76]">
          Sign in to manage your reservations.
        </p>
      </div>

      {/* form */}

    </div>
  </div>
</div>
  );
};

export default Login;