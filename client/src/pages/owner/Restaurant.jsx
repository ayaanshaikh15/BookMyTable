
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, Upload, MapPin, Utensils } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from '../../components/Navbar';
const API_URL = import.meta.env.VITE_API_URL;

const initialForm = {
  name: "",
  description: "",
  cuisine: "",
  priceRange: "",
  location: "",
  address: "",
  chef: "",
  tags: "",
  availableSlots: "",
  totalSeats: 20,
};

export default function OwnerRestaurant() {
  const { user } = useContext(AuthContext);

  const [restaurant, setRestaurant] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
const userId = user?.id || user?._id;

  useEffect(() => {
    if (!userId) return;

    const fetchRestaurant = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/owner/restaurant/${userId}`,
          { credentials: "include" }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load restaurant");
        }

        if (!data.hasRestaurant || !data.restaurant) {
          setError("You haven't created a restaurant yet.");
          return;
        }

        const item = data.restaurant;
        setRestaurant(item);

        setForm({
          name: item.name || "",
          description: item.description || "",
          cuisine: item.cuisine || "",
          priceRange: item.priceRange || "",
          location: item.location || "",
          address: item.address || "",
          chef: item.chef || "",
          tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "",
          availableSlots: Array.isArray(item.availableSlots)
            ? item.availableSlots.join(", ")
            : item.availableSlots || "",
          totalSeats: item.totalSeats ?? 20,
        });
      } catch (err) {
        setError(err.message || "Failed to load restaurant");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!restaurant?._id) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(
        `${API_URL}/owner/${restaurant._id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update restaurant");
      }

      setRestaurant(data.data || restaurant);
      setSuccess(data.message || "Restaurant updated successfully.");
    } catch (err) {
      setError(err.message || "Failed to update restaurant");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8f5]">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#dfe3d8] border-t-[#68755f]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8f5] text-[#1d211d]">
      <Navbar/>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <Link
          to="/owner/dashboard"
          className="inline-flex items-center gap-2 text-sm text-[#68755f] hover:text-[#56634e]"
        >
          <ArrowLeft size={17} /> Dashboard
        </Link>

        <div className="mt-6">
          <p className="text-sm text-[#777d76]">Restaurant management</p>
          <h1 className="mt-1 font-serif text-3xl sm:text-4xl">
            Restaurant details
          </h1>
          <p className="mt-2 text-sm text-[#777d76]">
            Keep your restaurant information up to date.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-4 text-sm text-green-700">
            {success}
          </div>
        )}

        {restaurant && (
          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-7 rounded-3xl border border-[#e5e7e1] bg-white p-5 sm:p-8"
          >
            {restaurant.image && (
              <div className="overflow-hidden rounded-2xl bg-[#edf1e9]">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="h-56 w-full object-cover"
                />
              </div>
            )}

            <div>
              <h2 className="font-serif text-xl">Basic information</h2>
              <p className="mt-1 text-sm text-[#858b84]">
                Restaurant name, cuisine, and description.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Restaurant name" name="name" value={form.name} onChange={handleChange} required />
              <Field label="Cuisine" name="cuisine" value={form.cuisine} onChange={handleChange} required />
              <Field label="Price range" name="priceRange" value={form.priceRange} onChange={handleChange} required />
              <Field label="Chef" name="chef" value={form.chef} onChange={handleChange} required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                required
                className="w-full rounded-xl border border-[#e5e7e1] px-4 py-3 text-sm outline-none focus:border-[#68755f]"
              />
            </div>

            <div className="border-t border-[#edf0e9] pt-6">
              <h2 className="flex items-center gap-2 font-serif text-xl">
                <MapPin size={19} /> Location
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="City / location" name="location" value={form.location} onChange={handleChange} required />
                <Field label="Full address" name="address" value={form.address} onChange={handleChange} required />
              </div>
            </div>

            <div className="border-t border-[#edf0e9] pt-6">
              <h2 className="flex items-center gap-2 font-serif text-xl">
                <Utensils size={19} /> Seating and tags
              </h2>

              <div className="mt-5 space-y-5">
                <Field
                  label="Tags (comma separated)"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="Romantic, Family dining, Fine dining"
                />

                <Field
                  label="Available slots (comma separated)"
                  name="availableSlots"
                  value={form.availableSlots}
                  onChange={handleChange}
                  placeholder="17:00, 18:00, 19:00"
                />

                <Field
                  label="Total seats"
                  name="totalSeats"
                  type="number"
                  value={form.totalSeats}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="border-t border-[#edf0e9] pt-6">
              <label className="mb-3 block text-sm font-medium">
                Update restaurant image
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#cdd4c7] bg-[#fafbf9] p-5 hover:bg-[#f4f6f1]">
                <Upload size={20} className="text-[#68755f]" />
                <div>
                  <p className="text-sm font-medium">
                    {image ? image.name : "Choose a new image"}
                  </p>
                  <p className="mt-1 text-xs text-[#858b84]">
                    Leave empty to keep the current image.
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) =>
                    setImage(event.target.files?.[0] || null)
                  }
                />
              </label>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-[#edf0e9] pt-6 sm:flex-row sm:justify-end">
              <Link
                to="/owner/dashboard"
                className="rounded-full border border-[#dfe3d8] px-6 py-3 text-center text-sm font-medium hover:bg-[#f7f8f5]"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#68755f] px-6 py-3 text-sm font-medium text-white hover:bg-[#56634e] disabled:opacity-60"
              >
                <Save size={16} />
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={type === "number" ? 1 : undefined}
        className="w-full rounded-xl border border-[#e5e7e1] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#68755f]"
      />
    </div>
  );
}
