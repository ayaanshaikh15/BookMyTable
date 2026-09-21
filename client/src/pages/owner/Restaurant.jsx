
import { useState } from "react";

const OwnerRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    name: "The Olive Table",
    description:
      "A warm and elegant dining destination serving Italian and Continental cuisine with a focus on fresh ingredients and memorable experiences.",
    location: "Belagavi, Karnataka",
    address: "College Road, Belagavi, Karnataka",
    cuisine: "Italian · Continental",
    phone: "+91 98765 43210",
    email: "hello@theolivetable.com",
    priceRange: "₹₹",
    openingTime: "11:00",
    closingTime: "23:00",
    status: true,
  });

  const [saved, setSaved] = useState(false);

  const [hours, setHours] = useState([
    {
      day: "Monday",
      open: true,
      opening: "11:00",
      closing: "23:00",
    },
    {
      day: "Tuesday",
      open: true,
      opening: "11:00",
      closing: "23:00",
    },
    {
      day: "Wednesday",
      open: true,
      opening: "11:00",
      closing: "23:00",
    },
    {
      day: "Thursday",
      open: true,
      opening: "11:00",
      closing: "23:00",
    },
    {
      day: "Friday",
      open: true,
      opening: "11:00",
      closing: "23:30",
    },
    {
      day: "Saturday",
      open: true,
      opening: "11:00",
      closing: "23:30",
    },
    {
      day: "Sunday",
      open: true,
      opening: "11:00",
      closing: "22:30",
    },
  ]);

  const [images, setImages] = useState([
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85",
  ]);

  const handleChange = (field, value) => {
    setRestaurant((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log("Restaurant updated:", restaurant);
    console.log("Opening hours:", hours);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleHourChange = (index, field, value) => {
    setHours((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );

    setSaved(false);
  };

  const handleImageRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  };

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-5 py-8 text-[#1d211d] lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#68755f]">
              Restaurant management
            </p>

            <h1 className="mt-2 font-serif text-4xl tracking-tight text-[#20251f] sm:text-5xl">
              My restaurant
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#777d76]">
              Manage your restaurant profile, information, opening
              hours and dining experience.
            </p>

          </div>

          <div className="flex items-center gap-3">

            {saved && (
              <span className="rounded-full bg-[#f3f5f0] px-4 py-2.5 text-[10px] font-medium text-[#68755f]">
                Changes saved
              </span>
            )}

            <button
              type="submit"
              form="restaurant-form"
              className="rounded-full bg-[#68755f] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#56634e]"
            >
              Save changes
            </button>

          </div>

        </div>

        {/* =====================================================
            RESTAURANT PREVIEW
        ===================================================== */}

        <section className="mt-8 overflow-hidden rounded-2xl border border-[#e5e7e1] bg-white">

          <div className="relative h-64 sm:h-80">

            <img
              src={images[0]}
              alt={restaurant.name}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div className="text-white">

                <div className="flex items-center gap-2">

                  <span className="rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-semibold text-[#68755f]">
                    ★ 4.8
                  </span>

                  <span className="rounded-full bg-black/30 px-3 py-1.5 text-[9px] font-medium text-white backdrop-blur-sm">
                    324 reviews
                  </span>

                </div>

                <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                  {restaurant.name}
                </h2>

                <p className="mt-1 text-xs text-white/75">
                  {restaurant.cuisine} · {restaurant.location}
                </p>

              </div>

              <div>

                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-medium backdrop-blur-sm ${
                    restaurant.status
                      ? "bg-white/95 text-[#68755f]"
                      : "bg-black/50 text-white"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      restaurant.status
                        ? "bg-[#68755f]"
                        : "bg-white"
                    }`}
                  />

                  {restaurant.status
                    ? "Currently open"
                    : "Currently closed"}
                </span>

              </div>

            </div>

          </div>

          {/* Image thumbnails */}

          <div className="grid grid-cols-3 gap-2 border-t border-[#e5e7e1] bg-[#fafbf9] p-2">

            {images.map((image, index) => (

              <div
                key={image}
                className="group relative h-24 overflow-hidden rounded-xl sm:h-32"
              >

                <img
                  src={image}
                  alt={`Restaurant ${index + 1}`}
                  className="h-full w-full object-cover"
                />

                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute right-2 top-2 rounded-full bg-black/60 px-2.5 py-1.5 text-[9px] text-white opacity-0 transition group-hover:opacity-100"
                  >
                    Remove
                  </button>
                )}

              </div>

            ))}

          </div>

        </section>

        {/* =====================================================
            MAIN FORM
        ===================================================== */}

        <form
          id="restaurant-form"
          onSubmit={handleSave}
          className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]"
        >

          {/* =================================================
              BASIC INFORMATION
          ================================================= */}

          <section className="rounded-2xl border border-[#e5e7e1] bg-white p-5 sm:p-6">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#68755f]">
                Profile
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#20251f]">
                Basic information
              </h2>

              <p className="mt-2 text-xs leading-5 text-[#858b84]">
                This information will be visible to customers on
                your restaurant page.
              </p>

            </div>

            <div className="mt-7 space-y-5">

              {/* Restaurant Name */}

              <div>

                <label className="text-[10px] font-semibold uppercase tracking-wider text-[#777d76]">
                  Restaurant name
                </label>

                <input
                  type="text"
                  value={restaurant.name}
                  onChange={(e) =>
                    handleChange("name", e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-[#dfe2da] bg-[#fafbf9] px-4 py-3 text-sm text-[#30362f] outline-none transition focus:border-[#68755f]"
                />

              </div>

              {/* Description */}

              <div>

                <label className="text-[10px] font-semibold uppercase tracking-wider text-[#777d76]">
                  Description
                </label>

                <textarea
                  rows="4"
                  value={restaurant.description}
                  onChange={(e) =>
                    handleChange(
                      "description",
                      e.target.value
                    )
                  }
                  className="mt-2 w-full resize-none rounded-xl border border-[#dfe2da] bg-[#fafbf9] px-4 py-3 text-sm leading-6 text-[#30362f] outline-none transition focus:border-[#68755f]"
                />

                <p className="mt-1.5 text-[9px] text-[#a0a49f]">
                  Keep your description short and informative.
                </p>

              </div>

              {/* Cuisine + Price */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#777d76]">
                    Cuisine
                  </label>

                  <select
                    value={restaurant.cuisine}
                    onChange={(e) =>
                      handleChange(
                        "cuisine",
                        e.target.value
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-[#dfe2da] bg-[#fafbf9] px-4 py-3 text-sm text-[#30362f] outline-none focus:border-[#68755f]"
                  >
                    <option>Italian · Continental</option>
                    <option>Indian</option>
                    <option>Japanese · Sushi</option>
                    <option>French · European</option>
                    <option>Mexican</option>
                    <option>Chinese</option>
                    <option>Multi-cuisine</option>
                  </select>

                </div>

                <div>

                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#777d76]">
                    Price range
                  </label>

                  <select
                    value={restaurant.priceRange}
                    onChange={(e) =>
                      handleChange(
                        "priceRange",
                        e.target.value
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-[#dfe2da] bg-[#fafbf9] px-4 py-3 text-sm text-[#30362f] outline-none focus:border-[#68755f]"
                  >
                    <option value="₹">₹ · Budget</option>
                    <option value="₹₹">₹₹ · Moderate</option>
                    <option value="₹₹₹">₹₹₹ · Premium</option>
                    <option value="₹₹₹₹">₹₹₹₹ · Luxury</option>
                  </select>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              RESTAURANT STATUS
          ================================================= */}

          <section className="rounded-2xl border border-[#e5e7e1] bg-white p-5 sm:p-6">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#68755f]">
                Visibility
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#20251f]">
                Restaurant status
              </h2>

            </div>

            <div className="mt-7 rounded-2xl bg-[#f7f8f5] p-5">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <p className="text-sm font-medium text-[#30362f]">
                    Accept reservations
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-[#858b84]">
                    Customers can discover your restaurant
                    and make bookings.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleChange(
                      "status",
                      !restaurant.status
                    )
                  }
                  className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                    restaurant.status
                      ? "bg-[#68755f]"
                      : "bg-[#cfd3cb]"
                  }`}
                >

                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                      restaurant.status
                        ? "left-6"
                        : "left-1"
                    }`}
                  />

                </button>

              </div>

            </div>

            <div className="mt-5 rounded-2xl border border-[#e5e7e1] p-5">

              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
                Public rating
              </p>

              <div className="mt-3 flex items-end gap-3">

                <p className="font-serif text-4xl text-[#20251f]">
                  4.8
                </p>

                <p className="mb-1 text-[10px] text-[#858b84]">
                  from 324 reviews
                </p>

              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#eef0eb]">

                <div
                  className="h-full w-[96%] rounded-full bg-[#68755f]"
                />

              </div>

            </div>

          </section>

          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <section className="rounded-2xl border border-[#e5e7e1] bg-white p-5 sm:p-6">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#68755f]">
                Contact
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#20251f]">
                Contact information
              </h2>

            </div>

            <div className="mt-7 space-y-5">

              <div>

                <label className="text-[10px] font-semibold uppercase tracking-wider text-[#777d76]">
                  Phone number
                </label>

                <input
                  type="tel"
                  value={restaurant.phone}
                  onChange={(e) =>
                    handleChange("phone", e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-[#dfe2da] bg-[#fafbf9] px-4 py-3 text-sm text-[#30362f] outline-none focus:border-[#68755f]"
                />

              </div>

              <div>

                <label className="text-[10px] font-semibold uppercase tracking-wider text-[#777d76]">
                  Email address
                </label>

                <input
                  type="email"
                  value={restaurant.email}
                  onChange={(e) =>
                    handleChange("email", e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-[#dfe2da] bg-[#fafbf9] px-4 py-3 text-sm text-[#30362f] outline-none focus:border-[#68755f]"
                />

              </div>

            </div>

          </section>

          {/* =================================================
              LOCATION
          ================================================= */}

          <section className="rounded-2xl border border-[#e5e7e1] bg-white p-5 sm:p-6">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#68755f]">
                Location
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#20251f]">
                Restaurant address
              </h2>

            </div>

            <div className="mt-7 space-y-5">

              <div>

                <label className="text-[10px] font-semibold uppercase tracking-wider text-[#777d76]">
                  City
                </label>

                <input
                  type="text"
                  value={restaurant.location}
                  onChange={(e) =>
                    handleChange(
                      "location",
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-[#dfe2da] bg-[#fafbf9] px-4 py-3 text-sm text-[#30362f] outline-none focus:border-[#68755f]"
                />

              </div>

              <div>

                <label className="text-[10px] font-semibold uppercase tracking-wider text-[#777d76]">
                  Full address
                </label>

                <textarea
                  rows="3"
                  value={restaurant.address}
                  onChange={(e) =>
                    handleChange(
                      "address",
                      e.target.value
                    )
                  }
                  className="mt-2 w-full resize-none rounded-xl border border-[#dfe2da] bg-[#fafbf9] px-4 py-3 text-sm leading-6 text-[#30362f] outline-none focus:border-[#68755f]"
                />

              </div>

              <button
                type="button"
                className="rounded-full border border-[#dfe2da] px-5 py-2.5 text-[10px] font-medium text-[#68755f] transition hover:bg-[#f7f8f5]"
              >
                Update map location
              </button>

            </div>

          </section>

          {/* =================================================
              OPENING HOURS
          ================================================= */}

          <section className="xl:col-span-2 rounded-2xl border border-[#e5e7e1] bg-white p-5 sm:p-6">

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#68755f]">
                  Schedule
                </p>

                <h2 className="mt-2 font-serif text-2xl text-[#20251f]">
                  Opening hours
                </h2>

                <p className="mt-2 text-xs text-[#858b84]">
                  Set when customers can make reservations.
                </p>

              </div>

              <span className="rounded-full bg-[#f3f5f0] px-4 py-2 text-[10px] font-medium text-[#68755f]">
                Weekly schedule
              </span>

            </div>

            <div className="mt-7 overflow-hidden rounded-xl border border-[#e5e7e1]">

              {hours.map((item, index) => (

                <div
                  key={item.day}
                  className="grid gap-4 border-b border-[#eceee9] px-4 py-4 last:border-b-0 sm:grid-cols-[1.2fr_0.7fr_1fr_1fr] sm:items-center"
                >

                  <p className="text-xs font-medium text-[#30362f]">
                    {item.day}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleHourChange(
                        index,
                        "open",
                        !item.open
                      )
                    }
                    className={`w-fit rounded-full px-3 py-1.5 text-[9px] font-medium ${
                      item.open
                        ? "bg-[#f3f5f0] text-[#68755f]"
                        : "bg-[#f3f3f1] text-[#969b94]"
                    }`}
                  >
                    {item.open ? "Open" : "Closed"}
                  </button>

                  {item.open ? (
                    <>
                      <div>

                        <label className="mb-1 block text-[9px] uppercase tracking-wider text-[#969b94] sm:hidden">
                          Opening
                        </label>

                        <input
                          type="time"
                          value={item.opening}
                          onChange={(e) =>
                            handleHourChange(
                              index,
                              "opening",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border border-[#dfe2da] bg-[#fafbf9] px-3 py-2 text-xs text-[#555d53] outline-none focus:border-[#68755f]"
                        />

                      </div>

                      <div>

                        <label className="mb-1 block text-[9px] uppercase tracking-wider text-[#969b94] sm:hidden">
                          Closing
                        </label>

                        <input
                          type="time"
                          value={item.closing}
                          onChange={(e) =>
                            handleHourChange(
                              index,
                              "closing",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border border-[#dfe2da] bg-[#fafbf9] px-3 py-2 text-xs text-[#555d53] outline-none focus:border-[#68755f]"
                        />

                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-[#969b94] sm:col-span-2">
                      Restaurant closed
                    </p>
                  )}

                </div>

              ))}

            </div>

          </section>

          {/* =================================================
              PHOTOS
          ================================================= */}

          <section className="xl:col-span-2 rounded-2xl border border-[#e5e7e1] bg-white p-5 sm:p-6">

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#68755f]">
                  Gallery
                </p>

                <h2 className="mt-2 font-serif text-2xl text-[#20251f]">
                  Restaurant photos
                </h2>

                <p className="mt-2 text-xs text-[#858b84]">
                  Add high-quality photos to help customers
                  discover your restaurant.
                </p>

              </div>

              <button
                type="button"
                className="w-fit rounded-full border border-[#dfe2da] px-5 py-2.5 text-[10px] font-medium text-[#68755f] transition hover:bg-[#f7f8f5]"
              >
                Add photo
              </button>

            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">

              {images.map((image, index) => (

                <div
                  key={image}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl"
                >

                  <img
                    src={image}
                    alt={`Restaurant photo ${index + 1}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">

                    <div className="flex items-center justify-between">

                      <span className="text-[9px] font-medium text-white">
                        {index === 0
                          ? "Cover photo"
                          : `Photo ${index + 1}`}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleImageRemove(index)
                        }
                        className="rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-medium text-[#555d53]"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </section>

          {/* =================================================
              SAVE SECTION
          ================================================= */}

          <section className="xl:col-span-2 flex flex-col justify-between gap-4 rounded-2xl border border-[#dfe2da] bg-[#fafbf9] p-5 sm:flex-row sm:items-center sm:p-6">

            <div>

              <h3 className="text-sm font-medium text-[#30362f]">
                Ready to update your restaurant?
              </h3>

              <p className="mt-1 text-[10px] text-[#858b84]">
                Your changes will be reflected on the customer-facing
                restaurant page.
              </p>

            </div>

            <button
              type="submit"
              className="rounded-full bg-[#68755f] px-7 py-3 text-xs font-semibold text-white transition hover:bg-[#56634e]"
            >
              Save changes
            </button>

          </section>

        </form>

      </div>

    </main>
  );
};

export default OwnerRestaurant;
