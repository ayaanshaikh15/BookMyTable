import React, { useState } from "react";
import axios from "axios";
import {
  MapPin,
  Utensils,
  ChefHat,
  IndianRupee,
  Clock,
  Users,
  ImagePlus,
  X,
  Plus,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const defaultSlots = [
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const cuisines = [
  "Indian",
  "Chinese",
  "Italian",
  "Mexican",
  "Thai",
  "Japanese",
  "Continental",
  "South Indian",
  "North Indian",
  "Multi-Cuisine",
];

const priceRanges = [
  { value: "₹", label: "Budget", description: "Under ₹500" },
  { value: "₹₹", label: "Moderate", description: "₹500 – ₹1,000" },
  { value: "₹₹₹", label: "Premium", description: "₹1,000 – ₹2,000" },
  { value: "₹₹₹₹", label: "Luxury", description: "Above ₹2,000" },
];

export default function CreateRestaurant() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cuisine: "",
    priceRange: "",
    location: "",
    address: "",
    chef: "",
    totalSeats: 20,
    tags: [],
    availableSlots: defaultSlots,
  });

  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setError("");
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
  };

  const addTag = () => {
    const tag = tagInput.trim();

    if (!tag) return;

    if (formData.tags.includes(tag)) {
      setTagInput("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));

    setTagInput("");
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const toggleSlot = (slot) => {
    setFormData((prev) => ({
      ...prev,
      availableSlots: prev.availableSlots.includes(slot)
        ? prev.availableSlots.filter((item) => item !== slot)
        : [...prev.availableSlots, slot].sort(),
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Restaurant name is required.";
    }

    if (!formData.description.trim()) {
      return "Restaurant description is required.";
    }

    if (!formData.cuisine) {
      return "Please select a cuisine.";
    }

    if (!formData.priceRange) {
      return "Please select a price range.";
    }

    if (!formData.location.trim()) {
      return "Location is required.";
    }

    if (!formData.address.trim()) {
      return "Address is required.";
    }

    if (!formData.chef.trim()) {
      return "Chef name is required.";
    }

    if (formData.tags.length === 0) {
      return "Please add at least one restaurant tag.";
    }

    if (formData.availableSlots.length === 0) {
      return "Please select at least one available slot.";
    }

    if (!formData.totalSeats || Number(formData.totalSeats) < 1) {
      return "Please enter a valid number of seats.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("cuisine", formData.cuisine);
      data.append("priceRange", formData.priceRange);
      data.append("location", formData.location);
      data.append("address", formData.address);
      data.append("chef", formData.chef);
      data.append("totalSeats", formData.totalSeats);

      data.append("tags", formData.tags.join(","));

      data.append(
        "availableSlots",
        formData.availableSlots.join(",")
      );

      if (image) {
        data.append("image", image);
      }

      const response = await axios.post(
        "/api/restaurants",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setSuccess(
        response.data?.message ||
          "Restaurant created successfully!"
      );

      setTimeout(() => {
        navigate("/owner/dashboard");
      }, 1200);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to create restaurant. Please try again."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              BookMyTable
            </h1>
            <p className="text-xs text-gray-500">
              Restaurant Partner
            </p>
          </div>

          <div className="w-16" />
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-600">
            Restaurant Partner
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Add your restaurant
          </h2>

          <p className="mt-2 max-w-2xl text-gray-500">
            Tell diners what makes your restaurant special and
            start accepting table reservations through BookMyTable.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            <CheckCircle2 size={18} />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Restaurant Image */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Restaurant photo
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Add a high-quality photo that represents your
                  restaurant.
                </p>
              </div>

              <div className="p-6">
                {preview ? (
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={preview}
                      alt="Restaurant preview"
                      className="h-72 w-full object-cover sm:h-96"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <label className="flex h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-orange-400 hover:bg-orange-50/30">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <ImagePlus size={26} />
                    </div>

                    <p className="font-semibold text-gray-800">
                      Upload restaurant photo
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      PNG, JPG or WEBP · Max 5MB
                    </p>

                    <span className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white">
                      Choose image
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </section>

            {/* Basic Information */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Basic information
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Give diners the essential details about your
                  restaurant.
                </p>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-2">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Restaurant name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. The Spice House"
                    className="input-style"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell diners about your restaurant, specialties and dining experience..."
                    className="input-style resize-none"
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    A good description helps diners decide where
                    to book.
                  </p>
                </div>

                {/* Cuisine */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Utensils size={16} />
                    Cuisine
                  </label>

                  <select
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleChange}
                    className="input-style"
                  >
                    <option value="">Select cuisine</option>

                    {cuisines.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Chef */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <ChefHat size={16} />
                    Chef
                  </label>

                  <input
                    type="text"
                    name="chef"
                    value={formData.chef}
                    onChange={handleChange}
                    placeholder="e.g. Chef Rahul Sharma"
                    className="input-style"
                  />
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Pricing
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Choose the average price category for your
                  restaurant.
                </p>
              </div>

              <div className="grid gap-3 p-6 sm:grid-cols-2 lg:grid-cols-4">
                {priceRanges.map((price) => {
                  const selected =
                    formData.priceRange === price.value;

                  return (
                    <button
                      key={price.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          priceRange: price.value,
                        }))
                      }
                      className={`rounded-xl border p-4 text-left transition ${
                        selected
                          ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">
                          {price.value}
                        </span>

                        {selected && (
                          <CheckCircle2
                            size={18}
                            className="text-orange-500"
                          />
                        )}
                      </div>

                      <p className="mt-2 text-sm font-medium text-gray-800">
                        {price.label}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {price.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Location */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Location
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Help diners find you easily.
                </p>
              </div>

              <div className="grid gap-6 p-6">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MapPin size={16} />
                    Location / Area
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Indiranagar, Bengaluru"
                    className="input-style"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter complete restaurant address"
                    className="input-style resize-none"
                  />
                </div>
              </div>
            </section>

            {/* Tags */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Restaurant tags
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Add tags that describe the experience.
                </p>
              </div>

              <div className="p-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="e.g. Romantic, Rooftop, Family Friendly"
                    className="input-style"
                  />

                  <button
                    type="button"
                    onClick={addTag}
                    className="flex shrink-0 items-center gap-2 rounded-xl bg-gray-900 px-5 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    <Plus size={17} />
                    Add
                  </button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700"
                      >
                        {tag}

                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="rounded-full hover:text-orange-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Seating */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Seating & availability
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Configure your table reservation capacity.
                </p>
              </div>

              <div className="space-y-7 p-6">
                {/* Total seats */}
                <div className="max-w-sm">
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Users size={16} />
                    Total seats
                  </label>

                  <input
                    type="number"
                    min="1"
                    name="totalSeats"
                    value={formData.totalSeats}
                    onChange={handleChange}
                    className="input-style"
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    Maximum number of guests your restaurant can
                    accommodate.
                  </p>
                </div>

                {/* Slots */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Clock size={17} className="text-gray-600" />

                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Reservation slots
                      </p>

                      <p className="text-xs text-gray-400">
                        Select the times when customers can book.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                    {defaultSlots.map((slot) => {
                      const selected =
                        formData.availableSlots.includes(slot);

                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => toggleSlot(slot)}
                          className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                            selected
                              ? "border-orange-500 bg-orange-500 text-white"
                              : "border-gray-200 bg-white text-gray-700 hover:border-orange-300"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* Submit */}
            <section className="rounded-2xl bg-gray-900 p-6 text-white shadow-sm sm:p-8">
              <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-semibold">
                    Ready to list your restaurant?
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Your restaurant will be reviewed before going
                    live.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {loading
                    ? "Creating restaurant..."
                    : "Create restaurant"}
                </button>
              </div>
            </section>
          </div>
        </form>
      </main>

      {/* Local utility classes */}
      <style>{`
        .input-style {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          background: white;
          padding: 0.75rem 0.875rem;
          font-size: 0.875rem;
          color: #111827;
          outline: none;
          transition: all 150ms ease;
        }

        .input-style::placeholder {
          color: #9ca3af;
        }

        .input-style:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
        }
      `}</style>
    </div>
  );
}